// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb'); // identiacal to the code above

/*var obj = new ObjectID();
console.log(obj);*/

/* var user = {name: 'andrew', age: 25};
var {name} = user; // destruct user property + setting the value to a new variable --W*/

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('Unable to connect to the MongoDB server');  // return prevents the function to continue (same result as putting } else {})
    }
    console.log('Connected to MongoDB server');
    
    const db = client.db('TodoApp')
/*
  //  db.collection('Todos').find({completed: false}).toArray().then((docs) => { // search + display completed = false documents
      db.collection('Todos').find({
        _id: new ObjectID('5c641a072bb49c1c907092c7')       // search on _id (ObjectID needed)
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });
*/
/*
    db.collection('Todos').find().count().then((count) => { // Count + display number of Todos' documents
        console.log(`Todos count: ${count}`);
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });
*/

    db.collection('Users').find({name: 'Andrew'}).toArray().then((docs) => {        // search and display all documents with name = Andrew
        console.log(JSON.stringify(docs, undefined, 2));
    });

 /*   db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, result) => {
        if(err) {
            return console.log('Unable to insert todo', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });

    db.collection('Users').insertOne({
        name: 'Andrew',
        age: 25,
        location: 'Philadelphia'
    }, (err, result) => {
        if(err) {
            return console.log('Unable to insert user', err);
        }
        console.log(result.ops[0]._id.getTimestamp());
    });*/
   // client.close();
});



