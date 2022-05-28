const router = require('express').Router();
const { User } = require('../models');
const Op = require('sequelize').Op;

router.get('/login', (req, res) => {
  if (req.session.user) {
    res.redirect("/")
  } else {
    res.render('login')
  }
});


router.get('/signup', (req, res) => {
  if (req.session.user) {
    res.redirect("/")
  } else {
    res.render('signup')
  }
});


router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect("/login")
});

router.get('*', (req, res) => {
  const user = req.session?.user
  res.render('error404', { user })
})

module.exports = router;
