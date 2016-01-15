var http = require('http');
var request = require('request');
var express = require('express');
var tokens=require('./env.js');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient
var format = require('util').format;
var Client = require('coinbase').Client;

var app = express();

app.set('view engine', 'jade');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//blockr api url
//tack on btc address for address json info
var blockrUrl = 'https://btc.blockr.io/api/v1/address/info/'

var client = new Client({
  'apiKey':tokens.apiKey,
  'apiSecret':tokens.apiSecret
});

app.get('/', function (req, res) {

  var address=null;

  client.getAccount('primary', function(err, account) {

    if (err) {
      res.write(err);
      res.end();
    }

    account.getAddresses(null,function(err,addrs){
      address=addrs[0].address;

      MongoClient.connect('mongodb://127.0.0.1:27017/once_off_btc_address',
      function(err,db){

        if(err) throw err;

        var collection=db.collection('addresses');

        collection.find().toArray(function(err, results) {
          console.dir(results);
        });
      })

    });

  });
  res.render('index')
});

app.post('/callback',function(req,res){
  res.status(200).send({status:'OK'});

  MongoClient.connect('mongodb://127.0.0.1:27017/once_off_btc_address', function(err, db) {

    if(err) throw err;

    var collection = db.collection('addresses');
    collection.insert(req.body, function(err, docs) {
      console.log(docs);
    });

  });

  console.log(req.body);
});

app.get('/callback',function(req,res){
  console.log(req.body);
  res.status(200).send({status:'OK'});
});

app.listen(3000, function () {
  console.log('app listening on port 3000!');
});
