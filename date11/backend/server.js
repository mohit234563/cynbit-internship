const express = require('express');
const cors=require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const studentRoutes = require('./routes/students');
app.use('/api/students', studentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
