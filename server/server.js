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

app.post('/ewts', authenticate, (req, res) => {
    var ewt = new Ewt({
        realWaitingTime: req.body.realWaitingTime,
        estWaitingTime: req.body.estWaitingTime,
        conversationId: req.body.conversationId,
        waitingInQueue: req.body.waitingInQueue,
        sender: req.body.sender
    });
    ewt.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/ewts', authenticate, (req, res) => {
   Ewt.find({
       sender: req.body.sender
   }).then((ewts) => {
       res.send({ewts});
   }, (e) => {
       res.status(040).send();
   });
});

if(!module.parent) {
    app.listen(port,() => {
        console.log(`Started on port ${port}`);
    })
}
module.exports = { app };
