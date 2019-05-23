const express = require('express');
const graphQlHttp = require('express-graphql');
const mongoose = require('mongoose');
const multer = require("multer");

const graphQlSchema = require('./graphql/Schema/index');
const graphQlResolver = require('./graphql/Resolver/Merge');

const app = express();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits:{fileSize: 50*1024*1024},
 }).single('Image');

app.use('/api', graphQlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolver,
    graphiql: true
}));

app.post('/upload',function(req, res) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } 
        else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)
    })
});

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