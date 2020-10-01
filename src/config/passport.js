const LocalStrategy = require('passport-local').Strategy;       // estrategia para autenticarse con usuario y contraseña
const User = require ('../app/models/user');

module.exports = function (passport){
    passport.serializeUser(function (user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });

    //metodo signup
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req, email, password, done){
        User.findOne({'local.email':email}, function(err, user){
            if (err){return done(err);}
            if (user){
                return done(null, false, req.flash('signupMessage','El email ya existe.'));
            }else{
                var newUser = new User();           //crea un objeto usuario
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);        //cifra la pw
                newUser.save(function (err){
                    if (err){throw err;}
                    return done(null, newUser);
                });
            }
        });    
    }));

    //metodo login
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true                 //le pasamos el request a la funcion 
    },
    function(req, email, password, done) {
        User.findOne({'local.email':email}, function(err, user) {            //si existe retorna un error, sino sigue
            if (err){return done(err);}
            if (!user){
                return done(null, false, req.flash('loginMessage','El usuario no ha sido encontrado.'));
            }
            if(!user.validatePassword(password)) {
                return done(null, false, req.flash('loginMessage', 'Contraseña incorrecta'))
            }
            return done(null, user);
        });    
    }));

}