const Pizza = require('../../models/pizza');
const express = require("express");
const app = express();

app.use(express.static("./public"));

function homeController(){
    return{
        async index(req, res){
                const pizzas = await Pizza.find();
                res.render('home', {pizzas: pizzas});
            
        }
    }
}

module.exports = homeController;