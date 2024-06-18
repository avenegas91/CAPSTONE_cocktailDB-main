// backend/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const cocktailRoutes = require('./routes/cocktailRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/cocktails', cocktailRoutes);
app.use('/favorites', favoriteRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
