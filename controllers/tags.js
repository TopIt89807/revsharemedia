const client_tags = require('../models/client_tags');

exports.add = (req, res) => {
    if(req.auth) {
        client_tags.find({tagName: req.body.tagName})
        .then((result) => {
            if(result.length == 0) {
                var data = req.body;
                const newTag = new client_tags(data);
                newTag.save();
                res.status(201).json({ message: 'Tag added successfully!'});
            } else {
                res.status(409).json({ message: 'Tag already exist!'});
            }
        })
        .catch((err) => {
            res.status(500).json({ err });
        });
    } else {
        res.status(req.status).json({ message: req.message});
    }
}

exports.update = (req, res) => {
    if(req.auth) {
        client_tags.find({tagName: req.body.tagName})
        client_tags.findById(req.params.id, function(err, obj) {
            if(err) {
                res.status(404).json({ message: 'Tag not found!' });
            } else {
                var data = req.body;
                Object.assign(obj, data);
                obj.save((err) => {
                    if(err) return res.status(500).json(err);
                    res.status(201).json({ message: 'Tag updated successfully!'});
                });
            }
        });
    } else {
        res.status(req.status).json({ message: req.message});
    }
}

exports.delete = (req, res) => {
    if(req.auth) {
        client_tags.findById(req.params.id, function(err, obj) {
            if(err) {
                res.status(404).json({ message: 'Tag not found!' });
            } else {
                if(!obj) return res.status(404).json({ message: 'Tag not found!' });
                obj.remove();
                res.status(200).json({ message: 'Tag removed successfully!'});
            }
        });
    } else {
        res.status(req.status).json({ message: req.message});
    }
}
