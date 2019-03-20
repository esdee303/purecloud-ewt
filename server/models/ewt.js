var mongoose = require('mongoose');

var EwtSchema = new mongoose.model('Ewt', {
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
    }
})