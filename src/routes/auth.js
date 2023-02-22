
const { Router } = require('express');
const {
  registrationValidationRules,
  loginValidationRules,
  validateView,
  validateApi,
} = require('../middleware/authValidator');

const { viewAuthenticate, apiAuthenticate } = require('../middleware/authHelper.js');

const router = Router();

router.get('/auth', (req, res) => res.render('auth'));

router.post('/auth/login', loginValidationRules(), validateView, viewAuthenticate('login'));
router.post('/auth/register', registrationValidationRules(), validateView, viewAuthenticate('signup'));

router.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.post('/api/v1/auth/login', loginValidationRules(), validateApi, apiAuthenticate('login'));
router.post('/api/v1/auth/register', registrationValidationRules(), validateApi, apiAuthenticate('signup'));

router.get('/api/v1/auth/logout', (req, res) => {
  req.logout();
  res.status(200).json({ success: true });
});

module.exports = router;
