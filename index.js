const express = require('express');
const graphQlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/Schema/index');

const app = express();

app.use('/api', graphQlHttp({
    Schema: graphQlSchema,
    graphiql: true
}));

mongoose.connect('mongodb+srv://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASSWORD + '@node-rest-shop-zqnku.mongodb.net/' + process.env.MONGO_DB + '?retryWrites=true', 
{ useNewUrlParser: true})
.then(() => {
    app.listen(8000, () => {
        console.log('Node.js server opened on port 8000.');
    });
})
.catch(err => {
    console.log(err);
});