var express = require('express');
var exphbs  = require('express-handlebars');
 
var app = express();

const libros = require ('./data/libros.json');

app.engine('handlebars', exphbs({ partialsDir: __dirname + '/views/partials/' }));
app.set('view engine', 'handlebars');
 
app.get('/listaLibros', function (req, res) {
    res.render('home',{libro: libros});
});

app.listen(3000);