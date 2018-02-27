const users = require('../models/users');
const config = require('../config/config.json');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.add = (req, res) => {
    const { firstname, lastname, email, phone, streetAddress1, streetAddress2, city,
        state, country, postal, assignedTo, dateCreated, lastUpdated, tags, source} = req.body;
    
    
}
