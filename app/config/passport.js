const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function init(passport){

    passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {

        const user = await User.findOne({email:email});

        if(!user){

            return done(null, false, {message: 'No user found with this email'});

        } else {
            bcrypt.compare(password, user.password).then(match => {

                if(match){

                    done(null, user, {message: 'logged in successfully'});

                } else {

                    done(null, false, {message: 'Invalid username or password'});

                }
            }).catch(err => {

                return done(null, false, {message: 'Something went wrong'});

            })
        }

    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    })

}

module.exports = init;