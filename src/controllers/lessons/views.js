const asyncWrapper = require('../../middleware/asyncWrapper');
const service = require('../../services/lessons');

exports.getLesson = asyncWrapper(async (req, res, next) => {
  const lesson = await service.getOne(req.params.id);
  const { course } = req;
  res.render('lesson', { lesson: lesson.toObject(), course: course.toObject() });
});

exports.createLesson = asyncWrapper(async (req, res, next) => {
  const { course } = req;
  console.log("req.body")
  console.log(req.body)
  await service.create({ ...req.body, course: course.id });
  res.redirect(`/courses/${course.id}/edit`);
});

exports.updateLesson = asyncWrapper(async (req, res, next) => {
  const { course } = req;
  console.log("req.body")
  console.log(req.body)
  await service.update(req.params.id, req.body);
  res.redirect(`/courses/${course.id}/edit`);
});

exports.updateLessonComments = asyncWrapper(async (req, res, next) => {
  const { course, lessons } = req;
  if (req.body.comments.length > 0) {
    const comments = {
      $push: {
        comments: {
          "author": req.user.name,
          "text": req.body.comments
        }
      }
    };
    await service.update(req.params.id, comments);
    res.redirect(`/courses/${course.id}/lessons/${lessons.id}`);
  }
});
