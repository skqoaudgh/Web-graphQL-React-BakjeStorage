const { GraphQLUpload } = require('apollo-upload-server');

const Post = require('../../models/Post');
const User = require('../../models/User');
const { transformPost } = require('./merge');

module.exports = {
    Upload: GraphQLUpload,
    posts: async (req) => {
        if(!req.isAuth) {
            throw new Error('Unauthorization!');
        }
        try {
            const posts = await Post.find();
            return posts.map(post => {
                return transformPost(post);
            });
        }
        catch(err) {
            throw err;
        }
    },
    createPost: async (args, {file}, req) => {
        if(!req.isAuth) {
            throw new Error('Unauthorization!');
        }       
        console.log(args);
        console.log(file);

        const post = new Post({
            ...args.postInput,
            Author: "5ce66962d34ed4105481b4c7"
        });
        let createdPost;
        try {
            const result = await post.save();
            createdPost = transformPost(result);
            const Author = await User.findById("5ce66962d34ed4105481b4c7");

            if(!Author) {
                throw new Error('User not found');
            }
            Author.UploadPost.push(post);
            await Author.save();

            return createdPost;
        }
        catch(err) {
            throw err;
        }
        
    }
}