// app.js


// Set up mongoose connection

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://root:admin@cluster0-0aist.mongodb.net/productstutorial?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
       const collection = client.db("productstutorial").collection("Product");
       // perform actions on the collection object
       client.close();
});




const express = require('express');
// const bodyParser = require('body-parser');
// const product = require('./routes/product.route'); // Imports routes for the products
const app = express();
app.get('/', (req, res) => res.send('API RUNNING'));
// app.use('/products', product);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
       console.log('Server is up and running on port numner ' + PORT);
});



