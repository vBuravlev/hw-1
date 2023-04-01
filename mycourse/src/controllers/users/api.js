const asyncWrapper = require('../../middleware/asyncWrapper');

module.exports = service => ({
  get: asyncWrapper(async (req, res, next) => {
    const users = await service.get();
    res.status(200).json({ success: true, data: users });
  }),
  getOne: asyncWrapper(async (req, res, next) => {
    const user = await service.getOne(req.params.id);
    res.status(200).json({ success: true, data: user });
  }),
});
