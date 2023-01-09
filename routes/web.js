const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const customerController = require("../app/http/controllers/customerController.js");
const guest = require('../app/http/middleware/guest')


function initRoutes(app){


    app.get("/",homeController().index);

    app.get("/cart",customerController().index);

    app.get("/login", guest, authController().login);

    app.post("/login",authController().loginPost);

    app.get("/register", guest, authController().register);

    app.post("/register", authController().registerPost)

    app.post('/update-cart', customerController().updateCart);

    app.post("/logout", authController().logout)

    

}

module.exports = initRoutes;