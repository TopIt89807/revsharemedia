const express = require('express');
const router = express.Router();
const users = require('./users');
const clients = require('./clients');

router.use('/users', users);
router.use('/clients', clients);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
