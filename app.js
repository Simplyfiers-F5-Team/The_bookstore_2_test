var express = require('express');
var exphbs  = require('express-handlebars');
 
var app = express();

const libros = require('./data/libros.json');
let user = require('./data/user.json');

app.engine('handlebars', exphbs({ partialsDir: __dirname + '/views/partials/' }));
app.set('view engine', 'handlebars');
 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/listaLibros', function (req, res) {
    res.render('home', {libro: libros, user: user.userName});
});

app.get('/', function (req, res) {
    res.render('login', {layout: 'login'});
});

app.post('/login', function (req, res) {
    user.userName = req.body.userName;
    res.redirect('/listaLibros');
});

app.use(express.static('public'));

app.listen(3001);