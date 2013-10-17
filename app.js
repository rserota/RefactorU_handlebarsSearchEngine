
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs')

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


var dummy
fs.readFile('search-data.json', function(error, data){
    dummy = JSON.parse(data)
})


app.get('/', function(request, response){
    response.render('index', {title : 'Search-O-Rama'})
})

app.get('/search', function(request, response){
    console.log(request.query)
    if (dummy['programming'][request.query['query']]){
        response.send({results : dummy['programming'][request.query['query']]['desc']})
    }
    else if (dummy['search engines'][request.query['query']]){
        response.send({results : dummy['search engines'][request.query['query']]['desc']})
    }
    else{
        response.send({results : 'No matching results found =/'})
    }
})



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
