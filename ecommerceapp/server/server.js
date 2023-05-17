const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./productRoutes.js');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 4000;
const dbURI = process.env.MONGODB_URI; 

// Connect to MongoDB Atlas
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    // Start the server once the connection is established
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
  });

// Route for product-related operations
app.use('/products', productRoutes);
