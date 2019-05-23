const PostResolver = require('./Post');
const UserResolver = require('./User');

module.exports = {
    ...PostResolver,
    ...UserResolver
}