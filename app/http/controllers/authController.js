const bcrypt = require('bcrypt');
const User = require('../../models/user');
const passport = require('passport');
const session = require("express-session");

function authController(){
    return{

        login(req, res){
            res.render("auth/login");
        },

        loginPost(req, res, next){

            passport.authenticate('local', (err, user, info) => {
                    if(err){

                        req.flash('error', info.message);
                        
                    }
                    if(!user){

                        req.flash('error', info.message);
                        res.redirect('/login')

                    } else {

                        req.logIn(user, (err) => {

                            if(err){
                                req.flash('error', info.message);
                                return next(err);
                            } else {
                                return res.redirect('/')
                            }
                            
                        })
                    }


            })(req, res, next)
        },

        register(req, res){
            res.render("auth/register");
        },

        registerPost(req, res){
            const {name, email, password} = req.body;
            /************Validating request ***********/

            if(!name || !email || !password){
                req.flash('error', '* All fields are required');
                req.flash('name', name);
                req.flash('email', email);

                return res.redirect("/register");
            }

            User.exists({email: email}, async (err, result) => {
                if(result){
                    req.flash('error', '* Email already exists');
                    req.flash('name', name);
                    req.flash('email', email);
                    res.redirect('/register');

                }

                else{

                    const hashedPassword = await bcrypt.hash(password, 10);

                    /*********** Create user **********/
                    const user = new User({
                        name: name,
                        email: email,
                        password: hashedPassword
                    });
                    user.save().then((user) => {
                        res.redirect('/');
                    }).catch(err => {
                        req.flash('error', 'Something went wrong!');
                        res.redirect('/register');
                    })
                }
            })
        },

        logout(req, res){
            req.logout(()=>{
                return res.redirect('/')
            });
            
            
        }
    }
}

module.exports = authController;