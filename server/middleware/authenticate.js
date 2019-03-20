var {Ewt} = require('./../models/ewt');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    Ewt.findByToken(token).then((user) => {
        if(!ewt) {
            return Promise.reject();
        }
        req.ewt = ewt;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send()
    });
};

module.exports = {authenticate};