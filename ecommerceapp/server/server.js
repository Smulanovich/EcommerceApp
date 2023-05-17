import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './productRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;
const dbURI = process.env.MONGODB_URI; // Assuming you set the environment variable MONGODB_URI

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
