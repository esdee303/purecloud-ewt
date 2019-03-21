require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Ewt} = require('./models/ewt.js');

var {authenticate} = require('./middleware/authenticate');

var app = express();
var port = process.env.PORT;

app.use(bodyParser.json());

app.post('/ewts', (req, res) => {
    var body = _.pick(
        req.body, 
        ['callStartDateTime',
        'callAni', 
        'calledAddressOriginal', 
        'interactionId',
        'callCurrentQueue',
        'realWaitTime',
        'callEstWaitTime',
        'apiEstWaitTimeInSeconds',
        'callPositionInQueue', 
        'callLanguage']);
    
    var ewt = new Ewt(body);
    ewt.save().then(() => {
        return ewt.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(ewt);    
    }).catch((e) => {
        res.status(400).send(e);
    })
});

app.get('/ewts/:interactionId', (req, res) => {
    var id = req.params.interactionId;
    Ewt.find({
       interactionId: id
    }).then((ewts) => {
      res.send({ewts});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/allEwts/', (req,res) => {
    Ewt.find({
        success : true
    }).then((ewts) => {
        res.send({ewts});
    }, (e) => {
        res.status(400).send(e);
    });
});


if(!module.parent) {
    app.listen(port,() => {
        console.log(`Started on port ${port}`);
    })
}
module.exports = { app };
