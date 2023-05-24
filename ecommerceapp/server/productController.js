const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectAndClose(callback) {
  try {
    await client.connect();
    await callback(client.db('EcommerceApp'));
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Error connecting to MongoDB');
  } finally {
    await client.close();
  }
}

async function getAllProducts() {
  try {
    let products;
    await connectAndClose(async (database) => {
      const Products = database.collection('Products');
      products = await Products.find().toArray();
    });
    return products;
  } catch (error) {
    console.error('Error retrieving products:', error);
    throw new Error('Error retrieving products');
  }
}

async function getProductByName(nameItem) {
  try {
    let product;
    await connectAndClose(async (database) => {
      const Products = database.collection('Products');
      product = await Products.findOne({ name: nameItem });
    });
    return product;
  } catch (error) {
    console.error(`Error retrieving ${nameItem}:`, error);
    throw new Error(`Error retrieving ${nameItem}`);
  }
}

exports.getAllProducts = getAllProducts;
exports.getProductByName = getProductByName;
