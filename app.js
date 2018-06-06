const express = require('express');
const app = express();
const path = require("path");
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const fileUpload = require('express-fileupload');
app.use(expressValidator({
    customValidators: {
        isImage: function (value, filename) {

            var extension = (path.extname(filename)).toLowerCase();
            switch (extension) {
                case '.jpg':
                    return '.jpg';
                case '.jpeg':
                    return '.jpeg';
                case '.png':
                    return '.png';
                default:
                    return false;
            }
        }
    }
}));
app.use(cookieParser());
app.use(session({ secret: 'apu', saveUninitialized: false, resave: false }));
app.use(flash());

app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
//app.use(bodyParser.json());
app.use(fileUpload());
app.set('views', __dirname+"/views/");
app.set('view engine', "ejs");
app.use(express.static('public'));
const frontendRoutes = require('./routes/frontend/routes');
const authRoutes = require('./routes/backend/auth');
const dasboardRoutes = require('./routes/backend/dashboard');

app.use('/admin', authRoutes);
app.use('/admin', dasboardRoutes);
app.use('/', frontendRoutes);
const functions = require('./utilities/functions');

app.locals.frontendMenu = functions.frontendMenu;

app.locals.somevar = function(){

    setTimeout(() => {
        return "hello world";
    }, 2000);
    
} 
//console.log(app.locals.frontendMenu);
const port = 3000;
app.listen(port, ()=>console.log("Server runing on port "+port));