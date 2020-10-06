const passport = require("passport");

module.exports = (app, passport) => {

    app.get('/',(req, res) => {
        res.render('index');
    });

    app.get('/login',(req, res) => {
        res.render('login', {           //para renderizar el mensaje que se mostrará en el html
            message: req.flash('loginMessage')
        });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/signup', (req, res) => {      //req(request)  y res(response) son manejadores de funciones
        res.render('signup', {
            message: req.flash('signupMessage')
        });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/profile', isLoggedIn, (req, res) =>{              //isLoggedIn para la comprobacion de logeado
        res.render('profile',{                             //lleva al profile
            user: req.user                                  //obtengo la informacion del usuario
        });
    });

    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};

//para saber si esta logeado
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();                  //si esta logeado entonces continuar con la siguiente ruta
    }
    return res.redirect('/');           //sino devolver al main
}