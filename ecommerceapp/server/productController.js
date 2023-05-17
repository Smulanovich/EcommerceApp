import Product from './productModel.js';

// Function to retrieve all items from the Products collection
async function getAllProducts() {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw new Error('Error retrieving products');
  }
}

export { getAllProducts };
