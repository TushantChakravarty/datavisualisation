const express = require('express')
const app = express()
const port = 5000
const dat=require('./jsondata.json')
var MongoClient = require('mongodb').MongoClient;
var fs = require("fs");
console.log(dat);
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.get('/data', function (req, res) {
   res.send(dat)
})

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/visualdata", function (err, db) {
   
     if(err) throw err;

    console.log('connected to db')
                
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})