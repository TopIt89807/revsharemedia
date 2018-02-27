const express = require('express');
const router = express.Router();
const users = require('./users');
const client = require('./client');

router.use('/users', users);
router.use('/client', client);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
