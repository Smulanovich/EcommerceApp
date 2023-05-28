// productController.js

const CC = require('./connectAndClose');

async function getAllProductsFromCollection(collection) {
  try {
    let documents;
    await CC.connectAndClose(async (database) => {
      documents = await database.collection(collection).find({}, { reviews: 0 }).toArray();
    });
    return documents;
  } catch (error) {
    console.error(`Error retrieving documents from collection "${collection}":`, error);
    throw new Error(`Error retrieving documents from collection "${collection}"`);
  }
}

async function getItemByNameFromCollection(collection, name) {
  try {
    let document;
    await CC.connectAndClose(async (database) => {
      document = await database.collection(collection).findOne({ name }, { reviews: 0 });
    });
    return document;
  } catch (error) {
    console.error(`Error retrieving "${name}" from collection "${collection}":`, error);
    throw new Error(`Error retrieving "${name}" from collection "${collection}"`);
  }
}

exports.getAllProductsFromCollection = getAllProductsFromCollection;
exports.getItemByNameFromCollection = getItemByNameFromCollection;
