const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const cors = require('cors');

// env config
require('dotenv').config();

// Database Connection
connectDB();

// App intialization
const app = express();
app.use(express.json());
app.use(cors());

// routes
app.use('/api/auth/', authRoutes);



// Server Connection
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log("server up and running" + PORT));