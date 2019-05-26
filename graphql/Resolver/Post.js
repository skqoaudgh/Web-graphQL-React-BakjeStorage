const Post = require('../../models/Post');
const User = require('../../models/User');
const { transformPost } = require('./merge');

module.exports = {
    posts: async (args, req) => {
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
    createPost: async (args, req) => {
        if(!req.isAuth) {
            throw new Error('Unauthorization!');
        }       

        const post = new Post({
            ...args.postInput,
            Author: req.UserId
        });

        let createdPost;
        try {
            const result = await post.save();
            createdPost = transformPost(result);
            const Author = await User.findById(req.UserId);

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