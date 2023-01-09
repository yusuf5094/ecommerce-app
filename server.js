
require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require('path');
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require('express-flash');
const MongoStore = require('connect-mongo');
const passport = require('passport');








////////// database Connection ////////////////

const url='mongodb://localhost/menu';

mongoose.connect(url, {useNewUrlParser: true });

const connection=mongoose.connection;

connection.once('open',(err) => {

    if(!err){
    console.log('Database connected');
    }
    else{
        console.log('Database connection failed');
    }

});



/*************************** Session store in database ********************************/

let sessionStore = MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/menu',
    collection: 'sessions'
});

/*********************** Creating Session *****************************************/

app.use(session({
    secret: process.env.SESSION_COOKIE_SECRET,
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
    cookie: {expires: 30000}
}));

app.use(flash());


/************** passport config ******************/

const passportInit = require('./app/config/passport')


app.use(passport.initialize());
app.use(passport.session());
passportInit(passport);





/********************************************************************** */

// global middleware

app.use((req,res,next)=>{
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
})



// Assets

app.use(express.static("public"));
app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.json());




// end

//handling routes

require("./routes/web.js")(app);



// end





// set port

app.listen(PORT,() => {
    console.log("Server started at port: "+PORT);
});

// end