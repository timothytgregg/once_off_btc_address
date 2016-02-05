var http = require('http');
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient
var format = require('util').format;
var Client = require('coinbase').Client;

var tokens=require('./env.js');
var client = new Client({
  'apiKey':tokens.apiKey,
  'apiSecret':tokens.apiSecret
});

var app = express();

app.set('view engine', 'jade');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function (req, res) {
  //container variable for most recent bitcoin address
  var address=null;

  //gets primary coinbase wallet
  client.getAccount('primary', function(err, account) {
    if (err) throw err;

    //gets array of most recent addresses
    account.getAddresses(null,function(err,addrs){
      //sets address variable to most recently created address
      address=addrs[0].address;

      //connects to mongodb
      MongoClient.connect('mongodb://127.0.0.1:27017/once_off_btc_address',
      function(err,db){

        if(err) throw err;

        //grabs array of all addresses from db,
        //if most recently generated address
        //matches any addresses in the database
        //(i.e., has received a transaction)
        //then, creates a new address
        //and renders index with that one,
        //else, reders index with most recently generated one
        //which should not have received any transactions yet
        var collection=db.collection('addresses');
        collection.find().toArray(function(err, results) {
          for (var entry in results) {
            if (address==results[entry].data.resource.address || ) {
              account.createAddress(null,function(err,newAddress){
                if(err) throw err;
                res.render('index',{address:newAddress.address});
              });
            }
          }
          res.render('index',{address:address});
        });

      });
    });
  });
});

//listening for post requests from coinbase,
//sent whenever a transaction is broadcast to any of my addresses
app.post('/callback',function(req,res){

  res.status(200).send({status:'OK'});

  MongoClient.connect('mongodb://127.0.0.1:27017/once_off_btc_address', function(err, db) {

    if(err) throw err;

    //inserts received address into 'addresses' collection
    var collection = db.collection('addresses');
    collection.insert(req.body.data.resource, function(err, docs) {
      console.log(docs);
    });

  });

  console.log(req.body);

});

app.listen(3000, function () {
  console.log('app listening on port 3000!');
});
