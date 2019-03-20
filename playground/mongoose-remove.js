const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// Todo.remove({})
/*
Todo.remove({}).then((result) => {
    console.log('result');
});*/

Todo.findOneAndRemove({_id: '6c66bb6d453d0c3ae49ca959'}).then((todo) => {
    
});

Todo.findByIdAndRemove('6c66bb6d453d0c3ae49ca959').then((todo) => {
    console.log(todo)
});

