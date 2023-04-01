const path = require('path');
const fs = require('node:fs');

const express = require('express');
const logger = require('./config/logger.js');
const bodyParser = require('body-parser');
const session = require('./config/session.js');
const passport = require('passport');
require('./config/passport')(passport);
const helmet = require('helmet');
const rateLimit = require('./config/rate-limit.js');
const cors = require('cors');
const { transportUser, notFoundPage } = require('./middleware/helpers.js');
const errorHandler = require('./middleware/errorHandler');

const exphbs = require('express-handlebars');
const hbsHelpers = require('./helpers/hbs');

const routers = fs.readdirSync(path.join(__dirname,'./routes/'), { withFileTypes: true });
const middelewaresDomainLogicSite = routers.map(route => require(`./routes/${route.name}`));

const app = express();

const middlewaresDefault = [
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  logger,
  helmet(),
  rateLimit,
  cors(),
  session,
  passport.initialize(),
  passport.session()
];

const middlewareErrors = [
  notFoundPage,
  errorHandler
];

app.use(middlewaresDefault);

app.engine('handlebars', exphbs({ defaultLayout: 'main', helpers: hbsHelpers }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(transportUser);
app.use(express.static('public'));
app.use(middelewaresDomainLogicSite);
app.use(middlewareErrors);

module.exports = app;
