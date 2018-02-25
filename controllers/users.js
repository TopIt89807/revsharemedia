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
                password: hash
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

exports.login = (req, res) => {
    const {email, password} = req.body;

    users.find({email: email})
    .then((result) => {
        if(result.length == 0) {
            res.status(404).json({ message: 'User not found!'});
        } else {
            return result[0];
        }
    })
    .then((user) => {
        if(bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(user.toJSON(), config.secret, {expiresIn: config.expiresIn});
            res.status(200).json({message: 'Login successfully!', token: token});
        } else {
            res.status(401).json({message: 'Invalid credential!'});
        }
    })
    .catch((err) => {
        res.status(500).json({ err });
    });
}