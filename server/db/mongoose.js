var mongoose = require('mongoose');

mongoose.Promise = global.Promise;


// Using the OR doesn't work, we have to select mongoose.connect to the local database or to the cloud database

// mongoose.connect('mongodb://localhost:27017/TodoApp')



/*
 mongoose.connect(`mongodb://esdee303:bdog2015@cluster0-shard-00-00-ftq1f.mongodb.net:27017/TodoApp?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`
  ,{ useNewUrlParser: true, }, function(error){
      console.log(error);
}) || ('mongodb://localhost:27017/TodoApp');
*/

mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, }, function(error) {
      // console.log(error);
});


module.exports = { mongoose };

