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

async function getReviewsFromProduct(collection, name) {
  try {
    let reviews;
    await CC.connectAndClose(async (database) => {
      const document = await database.collection(collection).findOne({ name });
      reviews = document.reviews || []; // Retrieve the reviews field from the document
    });
    return reviews;
  } catch (error) {
    console.error(`Error retrieving reviews for "${name}" from collection "${collection}":`, error);
    throw new Error(`Error retrieving reviews for "${name}" from collection "${collection}"`);
  }
}

async function addReviewToProduct(collectionName, productName, authorEmail, comment) {
  try {
    await CC.connectAndClose(async (database) => {
      const collection = database.collection(collectionName);
      await collection.updateOne(
        { name: productName },
        { $push: { reviews: { email: authorEmail, comment: comment } } }
      );
    });

    console.log('Review added successfully.');
  } catch (error) {
    console.error('Error adding review:', error);
    throw new Error('Error adding review');
  }
}

exports.addReviewToProduct = addReviewToProduct;
exports.getAllProductsFromCollection = getAllProductsFromCollection;
exports.getItemByNameFromCollection = getItemByNameFromCollection;
exports.getReviewsFromProduct = getReviewsFromProduct;
