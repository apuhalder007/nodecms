const express = require('express');
const app = express();
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(expressValidator());
app.use(cookieParser());
app.use(session({ secret: 'apu', saveUninitialized: false, resave: false }));
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.set('views', __dirname+"/views/");
app.set('view engine', "ejs");
app.use(express.static('public'));
const routes = require('./routes/frontend/routes');
app.use('/', routes);

const port = 3000;
app.listen(port, ()=>console.log("Server runing on port "+port));