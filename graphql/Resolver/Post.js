const Post = require('../../models/Post');

module.exports = {
    posts: async () => {
        try {
            const posts = await Post.find();
            return posts.map(post => {
                return {
                    ...post._doc,
                    _id: post._id
                }
            });
        }
        catch(err) {
            throw err;
        }
    },
    createPost: async args => {
        try {
            const post = new Post({
                Title: args.postInput.Title,
                Comment: args.postInput.Comment,
                Path: args.postInput.Path,
                Tag: args.postInput.Tag
            });

            const result = await post.save();
            return {
                ...result._doc,
                _id: result.id
            }
        }
        catch(err) {
            throw err;
        }
    }

    //createPost(postInput: PostInput): Post!
}