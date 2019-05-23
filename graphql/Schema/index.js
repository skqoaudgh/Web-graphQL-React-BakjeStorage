const { BuildSchema } = require('graphql');

module.exports = BuildSchema(`
    type Post {
        _id: ID!
        Title: String!
        Comment: String!
        Path: String!
        Tag: [String!]
    }

    input PostInput {
        Title: String!
        Comment: String!
        Path: String!
        Tag: [String!]
    }

    type RootQuery {
        posts: [Post!]!
    }

    type RootMutation {
        createPost(postInput: PostInput): Post!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);