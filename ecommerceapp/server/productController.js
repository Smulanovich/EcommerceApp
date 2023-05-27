// productController.js

const CC = require('./connectAndClose');

async function getAllDocumentsFromCollection(collection) {
  try {
    let documents;
    await CC.connectAndClose(async (database) => {
      documents = await database.collection(collection).find().toArray();
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
      const Collection = database.collection(collection);
      document = await Collection.findOne({ name });
    });
    return document;
  } catch (error) {
    console.error(`Error retrieving "${name}" from collection "${collection}":`, error);
    throw new Error(`Error retrieving "${name}" from collection "${collection}"`);
  }
}

exports.getAllDocumentsFromCollection = getAllDocumentsFromCollection;
exports.getItemByNameFromCollection = getItemByNameFromCollection;
