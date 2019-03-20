const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err) {
        return console.log('Unable to connect to the MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // deleteMany --> deletes all occurences
 /*   db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
        console.log(result);
    });*/

    // deleteOne --> only deletes the first occurence
 /*   db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
        console.log(result);
    });*/

    // findOneAndDelete --> only deletes the first occurence + shows the deleted occurence
  /*  db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
        console.log(result);
    });*/

    db.collection('Users').deleteMany({name: 'Andrew'});

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5c641bccc4de184e70eba251')
    
    }).then((results) => {
        console.log(JSON.stringify(results, undefined, 2));
    });


    // client.close();
});