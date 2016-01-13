var tokens=require('./env.js');

var Client = require('coinbase').Client;

var client = new Client({
  'apiKey':tokens.apiKey,
  'apiSecret':tokens.apiSecret
});

var address = null;

// addr.getAddresses(null,function(err,addrs){
//   addrs[0].address;
// });

//
// client.getAccount('primary', function(err, account) {
//   if (err) {
//     res.send(err);
//   }
//   addr.getAddresses(null,function(err,addrs){
//     var addressArray = [];
//     for (var addr in addrs) {
//       addressArray.push(addrs[addr].address);
//     }
//     res.send(addressArray);
//   });
// });

client.getAccount('primary', function(err, account) {
  account.getAddresses(null,function(err,addrs){
    console.log(addrs[0].address);
  });
});

// client.getAccount('primary', function(err, account) {
//   if (err) {
//     res.send(err);
//   }
//   addr.getTransactions(null,function(err,addrs){
//     var addressArray = [];
//     for (var addr in addrs) {
//       addressArray.push(addrs[addr].address);
//     }
//     res.send(addressArray);
//   });
// });
