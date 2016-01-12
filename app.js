var express = require('express');
var app = express();
var tokens=require('./env.js');

var Client = require('coinbase').Client;

var client = new Client({
  'apiKey':tokens.apiKey,
  'apiSecret':tokens.apiSecret
});

var address = null;

app.get('/', function (req, res) {

  client.getAccount('primary', function(err, account) {
    if (err) {
      res.send(err);
    }
    account.getAddresses(null,function(err,addrs){
      var addressArray = [];
      for (var addr in addrs) {
        addressArray.push(addrs[addr].address);
      }
      res.send(addressArray);
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
