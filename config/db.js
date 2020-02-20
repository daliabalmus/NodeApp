const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');



// function myfunc(callback){
//        callback(err,reply);
// };
const connectDB  = async () => {
       try {
              await mongoose.connect(db, {
                     useNewUrlParser:true,
                     useUnifiedTopology:true
              });
              
              console.log('MongoDB connected ...');
       } catch (error) {
              console.error(error);
              
              // Exit process with failure
              process.exit(1);
       }
};
//
// module.exports = {
//        connectDB: connectDB
// };
module.exports = {
       connectDB: connectDB
};