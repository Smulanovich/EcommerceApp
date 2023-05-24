const express = require('express');
const app = express();
const productController = require('./productController'); // Update the path if necessary

// Other server configurations and middleware setup

// API endpoint for retrieving all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await productController.getAllProducts(); // Call the getAllProducts function from the product controller
    res.json(products);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: 'Error retrieving products' });
  }
});

// API endpoint for retrieving a product by name
app.get('/api/products/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const product = await productController.getProductByName(name); // Call the getProductByName function from the product controller
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(`Error retrieving product "${req.params.name}":`, error);
    res.status(500).json({ error: 'Error retrieving product' });
  }
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

