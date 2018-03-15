var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'jade');

app.listen(port, function(){
    console.log('Ready on port ' + port);
});