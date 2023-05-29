// userController.js

const CC = require('./connectAndClose');

async function getUserByEmail(email) {
  try {
    let user;
    await CC.connectAndClose(async (database) => {
      user = await database.collection('Users').findOne({ email });
    });
    return user;
  } catch (error) {
    console.error(`Error retrieving user ${emailAddress}:`, error);
    throw new Error(`Error retrieving user ${emailAddress}`);
  }
}

async function insertUser(email, firstName, lastName, password) {
  try {
    // Check if a user with the same email already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      console.log('User with the same email already exists.');
      return; // Do not create the user
    }

    const user = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      favoriteProducts: [],
      orderHistory: [],
    };

    await CC.connectAndClose(async (database) => {
      await database.collection('Users').insertOne(user);
      console.log('User inserted successfully.');
    });
  } catch (error) {
    console.error('Error inserting user:', error);
    throw new Error('Error inserting user');
  }
}

async function authenticateLogin(email, password) {
  try {
    let user;
    await CC.connectAndClose(async (database) => {
      user =  await database.collection('Users').findOne(
        { email: email, password: password },
        { projection: { email: 1 } }
      );
    });

    return user ? user.email : null;
  } catch (error) {
    console.error('Error authenticating login:', error);
    throw new Error('Error authenticating login');
  }
}

async function addFavProduct(userEmail, product) {
  try {
    await CC.connectAndClose(async (database) => {
      const collection = database.collection('Users');
      // Check if the product is already in the user's favoriteProducts array
      const user = await collection.findOne({ email: userEmail });
      if (user.favoriteProducts.includes(product)) {
        console.log('Product already exists in favorites.');
        return; // Do not add the product again
      }

      // Add the product to the favoriteProducts array
      await collection.updateOne(
        { email: userEmail },
        { $addToSet: { favoriteProducts: product } }
      );

      console.log('Product added as a favorite.');
    });
  } catch (error) {
    console.error('Error adding favorite product:', error);
    throw new Error('Error adding favorite product');
  }
}

async function deleteFavProduct(userEmail, product) {
  try {
    await CC.connectAndClose(async (database) => {
      // Remove the product from the favoriteProducts array
      await database.collection('Users').updateOne(
        { email: userEmail },
        { $pull: { favoriteProducts: product } }
      );

      console.log('Product removed from favorites.');
    });
  } catch (error) {
    console.error('Error removing favorite product:', error);
    throw new Error('Error removing favorite product');
  }
}

async function addOrderToHistory(userEmail, order) {
  try {
    await CC.connectAndClose(async (database) => {
      await database.collection('Users').updateOne(
        { email: userEmail },
        { $push: { orderHistory: order } }
      );

      console.log('Order added to order history successfully.');
    });
  } catch (error) {
    console.error('Error adding order to order history:', error);
    throw new Error('Error adding order to order history');
  }
}
  
  

exports.insertUser = insertUser;
exports.getUserByEmail = getUserByEmail;
exports.authenticateLogin = authenticateLogin;
exports.addFavProduct = addFavProduct;
exports.deleteFavProduct = deleteFavProduct;
exports.addOrderToHistory = addOrderToHistory;