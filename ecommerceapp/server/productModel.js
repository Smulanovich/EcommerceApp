const mongoose = require('mongoose');

// Define the schema for the Product collection
const productSchema = new mongoose.Schema({
  name: String,
  image_address: String,
  price: Number,
  type: Number
});

// Create a model for the Product collection
const Product = mongoose.model('Product', productSchema);

module.exports = Product;

