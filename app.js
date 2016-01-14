var http = require('http');
var request = require('request');
var express = require('express');
var app = express();
var tokens=require('./env.js');

app.use(express.static('public'));
app.set('view engine', 'jade');

//blockr api url
//tack on btc address for oddress json info
var blockrUrl = 'https://btc.blockr.io/api/v1/address/info/'

var Client = require('coinbase').Client;

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
      address=addrs[0].address
      request(blockrUrl+address,function(err,response,data){
        if(JSON.parse(data).data.nb_txs){
          account.createAddress(null,function(err,newAddress){
            res.render('index',{address:newAddress})
          });
        }
        else {
          res.render('index',{address:address})
        }
      });
      // res.send('most recent btc address:'+address);
    });

  });

});

app.listen(3000, function () {
  console.log('app listening on port 3000!');
});


// var date='2013-11-01';
//
// for (var i = 1; i <= 15; i++) {
//   if (i<10) {
//     date=date.slice(0,8)+'0'+i;
//     console.log('if:'+date);
//   }
//   else {
//     date=date.slice(0,8)+''+i;
//     console.log('if:'+date);
//   }
//   client.getSpotPrice({'currency': 'USD','date':date}, function(err, price) {
//     if (err) {
//       console.log(err);
//     }
//     console.log(price.data.amount);
//     console.log('callback:'+date);
//   });
// }
