request(blockrUrl+address,function(err,response,data){
  if(JSON.parse(data).data.nb_txs){
    account.createAddress(null,function(err,newAddress){
      res.render('index',{address:newAddress.address});
    });
  }
  else {
    res.render('index',{address:address});
  }
});
