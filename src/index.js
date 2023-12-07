const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
require('dotenv').config();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const musicRoutes = require('./routes/musicRoutes');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 9696;


app.use(bodyParser.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/musics', musicRoutes);

app.listen(PORT, () => {
  console.log(`Ready to go on port ${PORT} !!`);
});
