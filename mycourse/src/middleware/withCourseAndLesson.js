const Course = require('../models/courses');
const Lessons = require('../models/lessons');
const { NotFoundError } = require('../common/errors');
const asyncWrapper = require('./asyncWrapper');

const withCourse = asyncWrapper(async (req, res, next) => {
  const { courseId } = req.params;
  const course = await Course.findById(courseId);

  if (!course) { return next(new NotFoundError(`Course not found with id of ${courseId}`)) };
  req.course = course;
  next();
});

const withLessons = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const lesson = await Lessons.findById(id);
  
  if (!lesson) { return next(new NotFoundError(`Lesson not found with id of ${id}`)) };
  req.lessons = lesson;
  next();
});

module.exports = { withCourse, withLessons };
