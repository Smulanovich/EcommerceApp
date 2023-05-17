const express = require('express');
const {
  getAllProducts,
  getProductByName
} = require('./productController.js');


const router = express.Router();

// GET /products - Retrieve all products
router.get('/', async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

// GET /products/:name - Retrieve product by name
router.get('/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const product = await getProductByName(name);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve product' });
  }
});

module.exports = router;


