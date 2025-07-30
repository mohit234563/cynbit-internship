const express = require('express');
const bodyParser = require('body-parser');

const studentRoutes = require('./routes/students');

const app = express();

// Middleware
app.use(bodyParser.json());

// Use the students routes
app.use('/api/students', studentRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
