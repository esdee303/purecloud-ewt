var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var EwtSchema = new mongoose.Schema({
    realWaitingTime: {
        type: String,
        required: true
    },
    estWaitingTime: {
        type: String,
        required: true
    },
    conversationId: {
        type: String,
        required: true
    },
    waitingInQueue: {
        type: Number,
        required: false
    },
    sender: {
        type: String,
        required: true
    },
    tokens: [{
        access: {
            type: String,
            require: true
        },
        token: {
            type: String,
            require: true
        }
    }]
});

EwtSchema.methods.toJSON = function() {
    var ewt = this;
    var ewtObject = ewt.toObject();
    return _.pick(ewtObject, ['_id', 'realWaitingTime', 'estWaitingTime', 'conversationId', 'waitingInQueue', 'sender']);
};

EwtSchema.methods.generateAuthToken = function() {
    var ewt = this;
    var access = 'auth';
    var token = jwt.sign({_id: ewt._id.toHexString(), access}, process.env.JWT_SECRET).toString();
    ewt.token = ewt.tokens.concat([{access, token}]);
    return ewt.save().then(() => {
        return token;
    });
};

var Ewt = mongoose.model('Ewt', EwtSchema);

module.exports = {Ewt};