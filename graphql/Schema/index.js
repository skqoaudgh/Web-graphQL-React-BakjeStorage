const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Post {
        _id: ID!
        Title: String!
        Comment: String!
        Tag: [String!]
        Filepath: String!
        Filename: String!
        Filetype: String!
        Filesize: Int!
        Author: User!
        createdAt: String!
        updatedAt: String!
    }

    input Upload {
        Title: String!
        Comment: String!
        Tag: [String!]
        Filename: String!
        Filetype: String!
        Filesize: Int!
        Filepath: String!
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
        createPost(postInput: Upload): Post
        signUp(userInput: UserInput): User!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);