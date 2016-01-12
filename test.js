var tokens=require('./env.js');

var Client = require('coinbase').Client;

var client = new Client({
  'apiKey':tokens.apiKey,
  'apiSecret':tokens.apiSecret
});

var address = null;

client.getAccount('primary', function(err, account) {
  if (err) {
    res.send(err);
  }
  account.createAddress(null,function(err, addr) {
    if (err) {
      res.send(err);
    }
    address = addr.address;
    res.send(addr.address);
  });
});
