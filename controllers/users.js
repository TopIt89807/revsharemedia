const users = require('../models/users');
const config = require('../config/config.json');

exports.signup = (req, res) => {
    res.status(200).json({ message: 'Success '});
}