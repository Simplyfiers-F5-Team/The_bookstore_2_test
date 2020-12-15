var express = require('express');
var exphbs  = require('express-handlebars');
 
var app = express();

const books = require('./data/books.json');
let user = require('./data/user.json');

app.engine('handlebars', exphbs({ partialsDir: __dirname + '/views/partials/' }));
app.set('view engine', 'handlebars');
 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/bookList', function (req, res) {
    res.render('home', {book: books, user: user.userName});
});

app.get('/', function (req, res) {
    res.render('login', {layout: 'login'});
});

app.post('/login', function (req, res) {
    user.userName = req.body.userName;
    res.redirect('/bookList');
});

app.post('/bookList', function(req, res) {
	searchText = req.body.search;
	foundBooks = books.filter(book => book.title.toLowerCase().includes(searchText.toLowerCase()));
	res.render('home', {book: foundBooks, user: user.userName});
});

app.use(express.static('public'));

app.listen(3001);