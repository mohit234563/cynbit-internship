const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');

const app = express();
const PORT = 5000;

// Middleware
// app.use(cors({ origin: 'http://127.0.0.1:5500', credentials: true })); // Allow frontend
app.use(cors({ origin: ['http://127.0.0.1:5500', 'http://localhost:5500'], credentials: true }));

app.use(bodyParser.json());
app.use(session({
    secret: 'my_secret_key',
    resave: false,
    saveUninitialized: true,
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
