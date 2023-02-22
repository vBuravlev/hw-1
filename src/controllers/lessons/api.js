const asyncWrapper = require('../../middleware/asyncWrapper');
const service = require('../../services/lessons');

exports.getLessons = asyncWrapper(async (req, res, next) => {
  const { course } = req;
  const lessons = await service.get(course.id);
  res.status(200).json({ success: true, data: lessons });
});

exports.getLesson = asyncWrapper(async (req, res, next) => {
  const lesson = await service.getOne(req.params.id);
  res.status(200).json({ success: true, data: lesson });
});

exports.createLesson = asyncWrapper(async (req, res, next) => {
  const lesson = await service.create(req.body);
  res.status(201).json({
    success: true,
    msg: `Lesson created`,
    data: lesson,
  });
});

exports.updateLesson = asyncWrapper(async (req, res, next) => {
  const lesson = await service.update(req.params.id, req.body);
  res.status(201).json({
    success: true,
    msg: `Lesson updated`,
    data: lesson,
  });
});

exports.deleteLesson = asyncWrapper(async (req, res, next) => {
  await service.delete(req.params.id);
  res.status(200).json({ success: true, msg: 'Lesson deleted', data: {} });
});

