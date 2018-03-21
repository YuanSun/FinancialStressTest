var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var hbs = exphbs.create({/* config */
    
    helpers: {
        foo: function() {return 'FOO!';},
        bar: function() {return 'BAR!';}
    }
});
var routes = require('./routes/index');
var users = require('./routes/users');
var incomeTaxCalculator = require('./model/incomeTax');
var app = express();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);
var incomes = [50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000, 130000, 140000, 150000, 160000, 170000, 180000, 190000, 200000];

var incomeTax = [];
var incomeAfterTax = [];
incomes.forEach(function(income) {
    incomeTax.push(incomeTaxCalculator(income));
    incomeAfterTax.push(income - incomeTaxCalculator(income));
});

app.get('/', (req, res, next) => {
    res.render('home', {
        showTitle:  true,

        helpers: {
            foo: function() {return 'foo.';}
        },

        data: {
            param:  function() {return 1;},
            income: {
                incomes:    JSON.stringify(incomes),
                incomeTax:  JSON.stringify(incomeTax),
                incomeAfterTax: JSON.stringify(incomeAfterTax)
            }
            
        }
    });
});

// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = app;