passport = require('passport');

const viewAuthenticate = (name) => {
    return function (req, res, next) {
        passport.authenticate(name, function (err, user, info) {
            if (err) return next(err);

            if (!user) {
                const { message } = info;
                const isLoginError = name === 'login';
                return res.render('auth', { message, isLoginError });
            }

            req.logIn(user, function (err) {
                if (err) return next(err);
                return res.redirect('/');
            });
        })(req, res, next);
    };
}


const apiAuthenticate = (name) => {
    return function (req, res, next) {
        passport.authenticate(name, function (err, user, info) {
            if (err) return next(err);

            if (!user) {
                const { message } = info;
                return res.status(404).json({ success: false, message });
            }

            req.logIn(user, function (err) {
                if (err) return next(err);
                return res.status(200).json({ success: true });
            });
        })(req, res, next);
    };
}


module.exports = { viewAuthenticate, apiAuthenticate };