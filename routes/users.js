
const express = require('express');
const router = express.Router();

router.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/');
});

router.post('/logout', (req, res) => {
  req.session.userId = null;
  res.send({});
});

module.exports = router;
