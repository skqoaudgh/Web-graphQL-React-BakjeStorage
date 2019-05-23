const express = require('express');
const graphQlHttp = require('express-graphql');

const graphQlSchema = require('./graphql/Schema/index');
const graphQlResolver = require('./graphql/Resolver/Merge');

const app = express();

app.use('/api', graphQlHttp({
    Schema: graphQlSchema,
    graphiql: true
}));

app.listen(8000, () =>{
    console.log('NodeJs server is opened on port 8000.');
});