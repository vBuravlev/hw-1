const asyncWrapper = require('../../middleware/asyncWrapper');
const service = require('../../services/courses');
const { defaultPaginationLimit } = require('../../config');

exports.getCourses = asyncWrapper(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || defaultPaginationLimit;

  const { courses, pagination } = await service.get(page, limit);
  res.render('courses', {
    courses: await Promise.all(courses.map(course => course.toObject())),
    pagination,
  });
});

exports.getCourse = asyncWrapper(async (req, res, next) => {
  const course = await service.getOne(req.params.id);
  res.render('course', { ...course.toObject() });
});

exports.createCourse = asyncWrapper(async (req, res, next) => {
  let author = req.user.id;
  const course = await service.create({ ...req.body, author });
  res.redirect(`/courses/${course.id}/edit`);
});

exports.editCourse = asyncWrapper(async (req, res, next) => {
  const course = await service.getOne(req.params.id);
  res.render('edit-course', { ...course.toObject() });
});

exports.updateCourse = asyncWrapper(async (req, res, next) => {
  const course = await service.update(req.params.id, req.body);
  res.redirect(`/courses/${course.id}/edit`);
});

exports.joinUserToCourse = asyncWrapper(async (req, res, next) => {
  await req.user.courses.push(req.params.id);
  req.user.save();
  res.redirect(`/courses/${req.params.id}`);
});
