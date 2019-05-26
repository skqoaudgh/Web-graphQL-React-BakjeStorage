const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

module.exports = {
    signUp: async args => {
        const isExisting = await User.findOne({UserID:args.userInput.UserID});
        if(isExisting) {
            throw new Error('User already exist.');
        }

        if(args.userInput.Authcode !== process.env.AUTH_CODE) {
            throw new Error('Auth Code incorrect!');
        } 

        const hashedPassword = await bcrypt.hash(args.userInput.Password, 12);
        const user = new User({
            UserID: args.userInput.UserID,
            Password: hashedPassword,
            Nickname: args.userInput.Nickname
        });
        const result = await user.save();
        return {
            ...result._doc,
            _id: result.id,
            Password: null
        }
    },
    login: async ({ UserID, Password }) => {
        const existingUser = await User.findOne({UserID: UserID});
        if(!existingUser) {
            throw new Error('User not exist.');
        }

        const isPasswordEqual = await bcrypt.compare(Password, existingUser.Password);
        if(!isPasswordEqual) {
            throw new Error('Password incorrect');
        }

        const token = jwt.sign({id: existingUser.id, UserID: existingUser.UserID, Nickname: existingUser.Nickname}, 'bakjestoragesecretkeybaby', {
            expiresIn: '1h'
        });
        return {
            token: token,
            tokenExpiration: 1,
            UserId: existingUser.id
        }
    }
};