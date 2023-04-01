const asyncWrapper = require('../../middleware/asyncWrapper');

module.exports = service => ({
  getCurrent: asyncWrapper(async (req, res, next) => {
    res.render('my-courses', { user: req.user.toObject() });
  }),
});
