const users = require('../models/users');
const config = require('../config/config.json');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

makeHash = (password) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

exports.signup = (req, res) => {
    const {email, password} = req.body;
    var data = req.body;

    users.find({email: email})
    .then((result) => {
        if(result.length == 0) {
            data.password = makeHash(password);
            const newUser = new users(data);
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
        if(user.removed) {
            res.status(403).json({ message: 'User has been removed!'});
            return;            
        }
        if(bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign(user.toJSON(), config.secret, {expiresIn: config.expiresIn});
            user.lastLogin = Date.now();
            user.save();
            res.status(200).json({message: 'Login successfully!', token: token});
        } else {
            res.status(401).json({message: 'Invalid credential!'});
        }
    })
    .catch((err) => {
        res.status(500).json({ err });
    });
}

exports.update = (req, res) => {
    if(req.auth) {
        var data = req.body;

        users.findById(req.user._id, function(err, obj) {
            if(err) {
                res.status(404).json({ message: 'User not found!' });
            } else {
                if(obj.removed) {
                    res.status(403).json({ message: 'User has been removed!'});
                    return;            
                }
                Object.assign(obj, data);
                obj.save();
                res.status(201).json({ message: 'User updated successfully!'});
            }
        });
    } else {
        res.status(req.status).json({ message: req.message});
    }
    
}

exports.updatePassword = (req, res) => {
    if(req.auth) {
        var {originPassword, password} = req.body;

        users.findById(req.user._id, function(err, obj) {
            if(err) {
                res.status(404).json({ message: 'User not found!' });
            } else {
                if(obj.removed) {
                    res.status(403).json({ message: 'User has been removed!'});
                    return;            
                }
                if(bcrypt.compareSync(originPassword, obj.password)) {
                    if(password) password = makeHash(password);
                    Object.assign(obj, {password});
                    obj.save();
                    res.status(201).json({ message: 'Password updated successfully!'});
                } else {
                    res.status(401).json({ message: 'Origin password is incorrect!'});
                }
            }
        });
    } else {
        res.status(req.status).json({ message: req.message});
    }
    
}

exports.remove = (req, res) => {
    if(req.auth) {
        users.findById(req.user._id, function(err, obj) {
            if(err) {
                res.status(404).json({ message: 'User not found!' });
            } else {
                if(obj.removed) {
                    res.status(403).json({ message: 'User already has been removed!'});
                } else {
                    obj.removed = true;
                    obj.save();
                    res.status(200).json({ message: 'User removed successfully!'});
                }
            }
        });
    } else {
        res.status(req.status).json({ message: req.message});
    }
}