var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose'); // mongodb
var bodyParser = require('body-parser');
var session = require('express-session');
const  {engine } = require('express-handlebars');
require('dotenv/config');

var indexRouter = require('./routes/index');
var menuRouter = require('./routes/menu');
var loginRouter = require('./routes/login');
var roomRouter = require('./routes/room');



var app = express();

// view engine setup
app.engine('hbs', engine({
    extname: '.hbs',
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: 'SESSION_SECRET', // Chuỗi bí mật để mã hóa session ID
    resave: false, // Không lưu lại session nếu không có sự thay đổi
    saveUninitialized: false // Không tạo mới session nếu không có sự thay đổi
  }));
app.use(bodyParser.urlencoded({extended:true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/menu', menuRouter);
app.use('/login', loginRouter);
app.use('/room', roomRouter);





// db connection
mongoose.set('strictQuery', false);
async function connect(){
    try {
       await mongoose.connect('mongodb+srv://jsduytanhime:jsduytanhime123@cluster0.3q4jo.mongodb.net/DACS?retryWrites=true&w=majority', {
           
       })
        .then(() =>{ 
        app.listen(process.env.PORT, () => console.log(`Server running on port:  ${process.env.PORT} `))
        console.log('Connected!')});    
    } catch (error) {
        console.log(error.message);
    }
}
connect();

module.exports = app;
