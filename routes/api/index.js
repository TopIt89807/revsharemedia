const express = require('express');
const router = express.Router();
const users = require('./users');
const clients = require('./clients');
const tags = require('./tags');
const sources = require('./sources');

router.use('/users', users);
router.use('/clients', clients);
router.use('/tags', tags);
router.use('/sources', sources);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
