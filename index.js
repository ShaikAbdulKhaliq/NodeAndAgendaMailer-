const express = require('express');
const connectDB = require('./config/database');
const emailRoutes = require('./routes/emailRoutes');
const bodyParser = require('body-parser');
const cors=require("cors")
require('dotenv').config();

const app = express();
connectDB();

app.use(bodyParser.json());
app.use(cors())
app.use('/api/email', emailRoutes);

// Server Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
