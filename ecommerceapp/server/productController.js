const Product = require('./productModel.js').default;

// Function to retrieve all items from the Products collection
async function getAllProducts() {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw new Error('Error retrieving products');
  }
}

// Function to retrieve a product by name
async function getProductByName(name) {
  try {
    const product = await Product.findOne({ name });
    return product || null; // Return null if product is not found
  } catch (error) {
    throw new Error('Error retrieving product');
  }
}

exports.getAllProducts = getAllProducts;
exports.getProductByName = getProductByName;

