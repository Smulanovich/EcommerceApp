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

async function authenticateLogin(userEmail, userPassword) {
  try {
    const collection = database.collection('Users');
    const user = await collection.findOne(
      { email: userEmail, password: userPassword },
      { projection: { email: 1 } }
    );
    
    if (user) {
      return user.email;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error authenticating login:', error);
    throw new Error('Error authenticating login');
  }
}

async function addFavProduct(userEmail, product) {
    try {
      // Add the product to the favoriteProducts array
      await CC.connectAndClose(async (database) => {
        await database.collection('Users').updateOne(
          { email: userEmail},
          { $addToSet: { favoriteProducts: product } }
        );
      });
  
      console.log('Product added as a favorite.');
    } catch (error) {
      console.error('Error adding favorite product:', error);
      throw new Error('Error adding favorite product');
    }
  }
  
  async function deleteFavProduct(userEmail, product) {
    try {
      // Remove the product from the favoriteProducts array
      await CC.connectAndClose(async (database) => {
        await database.collection('Users').updateOne(
          { email: userEmail },
          { $pull: { favoriteProducts: product } }
        );
      });
  
      console.log('Product removed from favorites.');
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
      });
  
      console.log('Order added to order history successfully.');
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