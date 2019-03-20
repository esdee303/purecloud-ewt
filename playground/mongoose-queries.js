const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var todoId = '6c66bb6d453d0c3ae49ca959';
var userId = '5c65dba8f3a73c1b3cb5ae34';


/*Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
});

Todo.findOne( {
    _id: id
}).then((todo) => {
    console.log('Todo', todo);
});*/

if(!ObjectID.isValid(todoId)) {
    console.log('todo ID not valid.');
} else {
    Todo.findById(todoId).then((todo) => {
        if(!todo) {
            return console.log('Todo not found.')
        }
        console.log('Todo By Id', todo);
    }).catch((e) => console.log(e));
}

if(!ObjectID.isValid(userId)) {
    console.log('user ID not valid.');
} else {
    User.findById(userId).then((user) => {
        if(!user) {
            return console.log('User not found.')
        }
        console.log(JSON.stringify(user, undefined, 2))
    }, (e) => {
        console.log(e);
    });
}



