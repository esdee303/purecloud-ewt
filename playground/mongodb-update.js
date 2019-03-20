const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('Unable to connect to the MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // findOneAndUpdate
 /*   db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('5c65cca6f70d49ce8ec3007c')
    }, {
        $set: {
            completed: true
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });*/

    // change name to steven + increment age by one

    db.collection('Users').findOneAndUpdate({_id: new ObjectID('5c641b6b9714f04b5037ffac')}, {
        $set: {
            name: 'Rudy'
        }, 
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });
    // client.close();
});