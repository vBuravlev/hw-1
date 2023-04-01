
const transportUser = (req, res, next) => {
    res.locals.user = req.user || null;
    next();
};

const notFoundPage = (req, res, next) => {
    res.status(404);
    if (req.headers['content-type'] === 'application/json') {
      res.send({ error: 'Not found' });
    } else {
      res.render('404', { url: req.url });
    }
  }


module.exports = { transportUser, notFoundPage };
