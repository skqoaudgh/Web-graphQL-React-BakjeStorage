const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Post {
        _id: ID!
        Title: String!
        Comment: String!
        Filedata: String!
        Author: User!
        createdAt: String!
        updatedAt: String!
    }

    input PostInput {
        Title: String!
        Comment: String!
        Filedata: String!
    }

    type User {
        _id: ID!
        UserID: String!
        Password: String
        Nickname: String!
    }

    type AuthData {
        UserId: ID!
        token: String!
        tokenExpiration: String!
    }

    input UserInput {
        UserID: String!
        Password: String!
        Nickname: String!
        Authcode: String!
    }

    type RootQuery {
        posts: [Post!]!
        login(UserID: String!, Password: String!): AuthData!
    }

    type RootMutation {
        createPost(postInput: PostInput): Post
        signUp(userInput: UserInput): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);