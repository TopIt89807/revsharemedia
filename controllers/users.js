const users = require('../models/users');
const config = require('../config/config.json');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    const {email, password} = req.body;

    users.find({email: email})
    .then((result) => {
        if(result.length == 0) {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(password, salt);

            const newUser = new users({
                email,
                hashed_password: hash
            })
            newUser.save();
            res.status(201).json({ message: 'User registered successfully!'});
        } else {
            res.status(409).json({ message: 'User already registered!'});
        }
    })
    .catch((err) => {
        res.status(500).json({ err });
    });
}