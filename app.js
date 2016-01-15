var http = require('http');
var request = require('request');
var express = require('express');
var app = express();
var tokens=require('./env.js');
var bodyParser = require('body-parser');

var Client = require('coinbase').Client;

app.set('view engine', 'jade');

app.use(express.static('public'));
app.use(bodyParser.json())

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

    });

  });
  res.render('index')
});

app.post('/callback',function(req,res){
  console.log(req.body);

  res.status(200).send({status:'OK'});
});

app.get('/callback',function(req,res){
  console.log(req.body);
  res.status(200).send({status:'OK'});
});

app.listen(3000, function () {
  console.log('app listening on port 3000!');
});
