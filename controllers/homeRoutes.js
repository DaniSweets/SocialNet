const express = require('express');
const router = express.Router();
const withAuth = require('../utils/auth');

router.get('/', async (req,res) => {
  res.render('homepage', {logged_in: req.session.logged_in})
});

router.get('/login', async (req,res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
  } 
  res.render('login')
});

router.get('/signup', async (req,res) => {
  res.render('signup')
});

router.get('/dashboard', withAuth, async (req,res) => {
  res.render('dashboard', {logged_in: req.session.logged_in})
});

  module.exports = router;