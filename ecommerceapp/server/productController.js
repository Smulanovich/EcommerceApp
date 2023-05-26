// productController.js

const CC = require('./connectAndClose');

async function getAllProducts() {
  try {
    let products;
    await CC.connectAndClose(async (database) => {
      products = await database.collection('Products').find().toArray();
    });
    return products;
  } 
  catch (error) {
    console.error('Error retrieving products:', error);
    throw new Error('Error retrieving products');
  }
}

async function getProductByName(nameItem) {
  try {
    let product;
    await CC.connectAndClose(async (database) => {
      const Products = database.collection('Products');
      product = await Products.findOne({ name: nameItem });
    });
    return product;
  } 
  catch (error) {
    console.error(`Error retrieving ${nameItem}:`, error);
    throw new Error(`Error retrieving ${nameItem}`);
  }
}

exports.getAllProducts = getAllProducts;
exports.getProductByName = getProductByName;

