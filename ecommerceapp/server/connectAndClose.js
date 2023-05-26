const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

// Connect to the EcommerceApp database (MongoDB Atlas)
async function connectAndClose(callback) {
  try {
    await client.connect();
    await callback(client.db('EcommerceApp'));
  } 
  catch (error) {
    console.error('Error:', error);
    throw new Error('Error connecting to MongoDB');
  } 
  finally {
    await client.close();
  }
}

exports.connectAndClose = connectAndClose;