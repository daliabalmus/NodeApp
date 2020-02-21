
// Set up mongoose connection

const express = require('express');
const connectDB = require('./config/db');

const usersRoute = require('./routes/api/users');

connectDB();
// Connect database

const app = express();
app.get('/', (req, res) => res.send('API RUNNING'));

// Define routes
app.use('/api/users', usersRoute);
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
       console.log('Server is up and running on port numner ' + PORT);
});


