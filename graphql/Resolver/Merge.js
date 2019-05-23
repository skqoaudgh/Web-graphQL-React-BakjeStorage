const DataLoader = require('dataloader');

const User = require('../../models/User');
const Post = require('../../models/Post');

const postLoader = new DataLoader((postIds) => {
    return posts(postIds);
});

const userLoader = new DataLoader((userIds) => {
    return User.find({_id: {$in: userIds}});
});

const posts = async postIds => {
    try {
        const posts = await Post.find({ _id: { $in: postIds } });
        posts.sort((a,b) => {
            return (
                postIds.indexOf(a._id.toString()) - postIds.indexOf(b._id.toString())
            );
        });
        return posts.map(post => {
            return transformPost(post);
        });
    }
    catch(err) {
        throw err;
    }
};

const user = async userId => {
    try {
        const user = await userLoader.load(userId.toString());
        return { 
            ...user._doc, 
            _id: user.id,
            UploadPost: () => postLoader.loadMany(user._doc.UploadPost),
        };
    }
    catch(err) {
        throw err;
    }
};

const transformPost = post => {
    return { 
        ...post._doc,
        _id: post.id,
        Author: user.bind(this, post.Author)
    };
};

exports.transformPost = transformPost;