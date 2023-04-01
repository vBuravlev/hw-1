const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

module.exports = session({
    secret: 'secret', // you should choose a unique value here
    resave: false, // forces the session to be saved back to the session store
    saveUninitialized: false, // forces a session that is “uninitialized” to be saved to the store
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
});