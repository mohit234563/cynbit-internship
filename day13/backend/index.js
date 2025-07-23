const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(session({
    secret: 'secret_key',    // Secret key for sessions
    resave: false,
    saveUninitialized: true
}));

app.use('/auth', authRoutes);        // Routes for login/register
app.use('/students', studentRoutes); // Routes for student list

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
