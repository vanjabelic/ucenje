var express = require('express');
var hbs = require('hbs');
var app = express();
var path        = require('path');
var exphbs      = require('express3-handlebars');
var http = require('http');


hbs = exphbs.create({
  defaultLayout: 'index',
  extname: '.hbs'
});

app.configure(function () {
    app.set('port', process.env.PORT || 80);
    app.use(express.static(path.join(__dirname, 'views/layouts')));
    app.set('views', path.join(__dirname, 'views/layouts'));
    app.engine('hbs', hbs.engine);
  app.set('view engine', 'hbs');
  app.use(express.bodyParser());
  app.use(app.router);
});

var books=[
  {'title':'harry potter','genre':'fantasy','author':'jk'},
  {'title':'game of thrones','genre':'fantasy','author':'jrrr'},
  {'title':'soul music','genre':'fantasy','author':'terry'}
];

app.get('/vax', function(req, res) {
    res.render('index.hbs', {books:books});
});

app.post('/insert', function(req, res) {
	console.log("req"+JSON.stringify(req.body));
	var titles = req.body.titles;
	var genre = req.body.genre;
	var author = req.body.author;
	var newbook = {'titles':titles, 'genre':genre, 'author':author};
	books.push(newbook);
	res.render('index.hbs', {books:books});
});

var server = http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});