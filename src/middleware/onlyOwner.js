const { AuthorizeError, NotFoundError } = require('../common/errors');
const courseService = require('../services/courses');
const asyncWrapper = require('./asyncWrapper');

module.exports = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const course = await courseService.getOne(id);

  if (!course) {
    return next(new NotFoundError(`Course not found with id of ${id}`));
  }

  if (!course.author._id.equals(req.user._id)) {
    return next(new AuthorizeError('Not Allowed'));
  }

  next();
});
