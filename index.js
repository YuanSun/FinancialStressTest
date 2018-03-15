var express = require('express');
var app = require('./app');

var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log('Ready on port ' + port);
});