const express = require('express');
const router = express.Router();
const User = require('../models/users')
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    let userPw = userData.getDataValue("password");
    const validPassword = await bcrypt.compare(req.body.password, userPw);

    console.log(`isValidPassword: ${validPassword}`);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    console.log('saving session')

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
    console.error(err);
  }
});

router.delete('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(400).send('Unable to log out')
      } else {
        res.send('Logout successful')
      }
    });
  } else {
    res.end()
  }
})

module.exports = router;