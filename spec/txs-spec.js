var request=require('request');

describe('14EMiLq3qPJJqX5obZz9ed3ZWRKgwXv9zZ', function() {
  it('has no txs',function(done){
    request('https://btc.blockr.io/api/v1/address/info/14EMiLq3qPJJqX5obZz9ed3ZWRKgwXv9zZ',function(err,res,body){
      expect(JSON.parse(body).data.nb_txs).toEqual(0);
      done();
    });
  });
});

describe('1As3JjghNNPq5X3AvaJjyF11JNEW5JizSx', function() {
  it('has txs',function(done){
    request('https://btc.blockr.io/api/v1/address/info/1As3JjghNNPq5X3AvaJjyF11JNEW5JizSx',function(err,res,body){
      expect(JSON.parse(body).data.nb_txs).toBeGreaterThan(0);
      done();
    });
  });
});
