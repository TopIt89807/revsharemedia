const client_sources = require('../models/client_sources');

exports.add = (req, res) => {
    if(req.auth) {
        client_sources.find({sourceName: req.body.sourceName})
        .then((result) => {
            if(result.length == 0) {
                var data = req.body;
                const newSource = new client_sources(data);
                newSource.save((err) => {
                    if(err) return res.status(500).json(err);
                    res.status(201).json({ message: 'Source added successfully!'});
                });
            } else {
                res.status(409).json({ message: 'Source already exist!'});
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
        client_sources.find({sourceName: req.body.sourceName})
        client_sources.findById(req.params.id, function(err, obj) {
            if(err) {
                res.status(404).json({ message: 'Source not found!' });
            } else {
                var data = req.body;
                Object.assign(obj, data);
                obj.save((err) => {
                    if(err) return res.status(500).json(err);
                    res.status(201).json({ message: 'Source updated successfully!'});
                });
            }
        });
    } else {
        res.status(req.status).json({ message: req.message});
    }
}

exports.delete = (req, res) => {
    if(req.auth) {
        client_sources.findById(req.params.id, function(err, obj) {
            if(err) {
                res.status(404).json({ message: 'Source not found!' });
            } else {
                if(!obj) return res.status(404).json({ message: 'Source not found!' });
                obj.remove();
                res.status(200).json({ message: 'Source removed successfully!'});
            }
        });
    } else {
        res.status(req.status).json({ message: req.message});
    }
}
