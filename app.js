var express = require('express');
var exphbs  = require('express-handlebars');
 
var app = express();

const books = require('./data/books.json');
let user = require('./data/user.json');
let description = require('./data/description.json');

app.engine('handlebars', exphbs({ partialsDir: __dirname + '/views/partials/' }));
app.set('view engine', 'handlebars');
 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/bookList', function (req, res) {
    res.render('home', {book: books, user: user.userName, desc: description});
});

app.get('/', function (req, res) {
    res.render('login', {layout: 'login'});
});

app.post('/login', function (req, res) {
    user.userName = req.body.userName;
    res.redirect('/bookList');
});

app.use(express.static('public'));

app.listen(3001);