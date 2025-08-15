const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const analyticsRoutes = require('./routes/analytics');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', analyticsRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Analytics server running on port ${PORT}`);
});
