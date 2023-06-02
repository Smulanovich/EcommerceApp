// productController.js

const CC = require('./connectAndClose');

async function getAllProductsFromCollection(collection) {
  try {
    let documents;
    await CC.connectAndClose(async (database) => {
      documents = await database.collection(collection).find({}, {projection: { reviews: 0 }}).toArray();
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
      document = await database.collection(collection).findOne({ name }, {projection: { reviews: 0 }});
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

async function serchForCandy(name) { 
  const collections = ['CandyBar', 'CandyCorn', 'CandyStick'];

  try {
    let document = null;

    await CC.connectAndClose(async (database) => {
      for (const collection of collections) {
        document = await database.collection(collection).findOne({ name });

        if (document) {
          break; // Item found, exit the loop
        }
      }
    });

    return document;
  } catch (error) {
    console.error(`Error retrieving "${name}" from collections:`, error);
    throw new Error(`Error retrieving "${name}" from collections`);
  }
}


exports.addReviewToProduct = addReviewToProduct;
exports.getAllProductsFromCollection = getAllProductsFromCollection;
exports.getItemByNameFromCollection = getItemByNameFromCollection;
exports.getReviewsFromProduct = getReviewsFromProduct;
exports.serchForCandy = serchForCandy;