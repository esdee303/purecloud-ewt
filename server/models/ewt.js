var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var EwtSchema = new mongoose.Schema({
    callStartDateTime: {
        type: String,
        required: true
    },
    callAni: {
        type:String,
        required:false
    },
    calledAddressOriginal: {
        type:String,
        required:false
    },
    interactionId: {
        type: String,
        required: true
    }, 
    callCurrentQueue: {
        type: String,
        required: true
    },
    realWaitTime: {
        type:String,
        required:false
    },
    callEstWaitTime: {
        type:String,
        required:false
    },
    callPositionInQueue: {
        type: Number,
        required: true
    },
    callLanguage: {
        type: String,
        required: false
    },
    success: {
        type: Boolean,
        required: false
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
    ewt.success = true;
    var ewtObject = ewt.toObject();
    return _.pick(ewtObject, ['_id', 'success']);
};

EwtSchema.methods.generateAuthToken = function() {
    var ewt = this;
    var access = 'auth';
    var token = jwt.sign({_id: ewt._id.toHexString(), access}, process.env.JWT_SECRET).toString();
    ewt.tokens = ewt.tokens.concat([{access, token}]);
    return ewt.save().then(() => {
        return token;
    });
};

EwtSchema.methods.removeToken = function (token) {
    var ewt = this;
    return ewt.update({
        $pull: {
            tokens: {token}
        }
    });
};

EwtSchema.statics.findByToken = function (token) {
    var Ewt = this;
    var decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return Promise.reject();
    }
    return Ewt.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'token.access': 'auth'
    });
};

var Ewt = mongoose.model('Ewt', EwtSchema);

module.exports = {Ewt};