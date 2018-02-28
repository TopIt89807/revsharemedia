const clients = require('../models/clients');

exports.add = (req, res) => {
    if(req.auth) {
        var data = req.body;
        const newClient = new clients(data);
        newClient.save();
        res.status(201).json({ message: 'Client added successfully!'});
    } else {
        res.status(req.status).json({ message: req.message});
    }
}

exports.update = (req, res) => {
    if(req.auth) {
        clients.findById(req.params.id, function(err, obj) {
            if(err) {
                res.status(404).json({ message: 'Client not found!' });
            } else {
                if(obj.removed) {
                    res.status(403).json({ message: 'Client has been removed!'});
                    return;            
                }
                var data = req.body;
                data.lastUpdated = Date.now();

                Object.assign(obj, data);
                obj.save();
                res.status(201).json({ message: 'Client updated successfully!'});
            }
        });
    } else {
        res.status(req.status).json({ message: req.message});
    }
}

exports.delete = (req, res) => {
    if(req.auth) {
        clients.findById(req.params.id, function(err, obj) {
            if(err) {
                res.status(404).json({ message: 'Client not found!' });
            } else {
                if(obj.removed) {
                    res.status(403).json({ message: 'Client already has been removed!'});
                } else {
                    obj.removed = true;
                    obj.save();
                    res.status(200).json({ message: 'Client removed successfully!'});
                }
            }
        });
    } else {
        res.status(req.status).json({ message: req.message});
    }
}
