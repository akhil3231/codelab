const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
app.use(bodyParser.urlencoded({ extended : true }));

MongoClient.connect(db.url, (err, database)=> {
    if(err) return console.log(err);

    DB = database.db('nodeapp');
    require('./app/routes')(app, DB);

    app.listen('8000', () => {
        console.log('app listening to 8000');
    });
});

