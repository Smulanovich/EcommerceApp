const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);


// async function getAllProducts() {
//   try {
//     const products = await Product.find();
//     return products;
//   } catch (error) {
//     console.error('Error retrieving products:', error);
//     throw new Error('Error retrieving products');
//   }
// }

async function getProductByName(nameItem) {
  try {
    const database = client.db('EcommerceApp');
    const Products = database.collection('Products');
    const product = await Products.findOne({ name: nameItem });
    return product;
  } finally {
    //Close when you finish/error
    await client.close();
  }
}

//exports.getAllProducts = getAllProducts;
exports.getProductByName = getProductByName;

