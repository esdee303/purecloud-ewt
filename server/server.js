require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');
var {Ewt} = require('./models/ewt.js');

var {authenticate} = require('./middleware/authenticate');

var app = express();
var port = process.env.PORT;

app.use(bodyParser.json());

app.post('/ewts', (req, res) => {
    var body = _.pick(req.body, ['realWaitingTime', 'estWaitingTime',
'conversationId', 'waitingInQueue', 'sender']);
    var ewt = new Ewt(body);
    ewt.save().then(() => {
        return ewt.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(ewt);    
    }).catch((e) => {
        res.status(400).send(e);
    })
});


if(!module.parent) {
    app.listen(port,() => {
        console.log(`Started on port ${port}`);
    })
}
module.exports = { app };
