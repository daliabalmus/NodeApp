
// Set up mongoose connection

const express = require('express');
const connectDB = require('./config/db');
connectDB.connectDB();
// Connect database

const server = express();
server.get('/', (req, res) => res.send('API RUNNING'));
// server.use('/products', product);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
       console.log('Server is up and running on port numner ' + PORT);
});


