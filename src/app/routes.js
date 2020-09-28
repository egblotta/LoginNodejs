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

};