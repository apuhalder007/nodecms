const express = require('express');
const app = express();
const bodyParser = require('body-parser');
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