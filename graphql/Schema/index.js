const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    scalar Upload

    type Post {
        _id: ID!
        Title: String!
        Comment: String!
        Tag: [String!]
        path: String!
        filename: String!
        mimetype: String!
        encoding: String!
    }

    input PostInput {
        Title: String!
        Comment: String!
        Tag: [String!]
        File: Upload!
    }

    type User {
        _id: ID!
        Nickname: String!
        Password: String
        Name: String!
    }

    type AuthData {
        UserId: ID!
        token: String!
        tokenExpiration: String!
    }

    input UserInput {
        Nickname: String!
        Password: String!
        Name: String!
    }

    type RootQuery {
        posts: [Post!]!
        login(Nickname: String!, Password: String!): AuthData!
    }

    type RootMutation {
        createPost(postInput: PostInput): Post!
        signUp(userInput: UserInput): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);