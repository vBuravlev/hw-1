const ExpressPinoLogger = require('express-pino-logger');

const pino = ExpressPinoLogger({
    serializers: {
        req: (req) => ({
            method: req.method,
            url: req.url,
            user: req.raw.user,
        }),
    },
});

module.exports = pino;