const express = require('express');
const app = express();
const ejs = require("ejs");
const expressLayout = require("express-ejs-layouts");
const path = require('path');
const PORT = process.env.PORT || 3000;

//handling routes

app.get("/",(req, res) => {
    res.render('home');
});

// end

// setting view engine

app.use(expressLayout);
app.set('views',path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');

// end

// set port

app.listen(PORT,() => {
    console.log("Server started at port: "+PORT);
});

// end