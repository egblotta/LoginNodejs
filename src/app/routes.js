const passport = require("passport");

module.exports = (app, passport) => {

    app.get('/',(req, res) => {
        res.render('index');
    });

    app.get('/login',(req, res) => {
        res.render('login', {           //para renderizar mensajes
            message: req.flash('loginMessage')
        });
    });

    //app.post('/login', passport.authenticate(''));

    app.get('/signup', (req, res) => {
        res.render('signup', {
            message: req.flash('signupMessage')
        });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/profile', (req, res) =>{
        res.render('profile', {
            user: req.user
        });
    });
};