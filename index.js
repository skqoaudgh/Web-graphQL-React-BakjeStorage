const express = require('express');
const graphQlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/Schema/index');
const graphQlResolver = require('./graphql/Resolver/index');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
    if(req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(isAuth);

app.use('/api', graphQlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolver,
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