// userController.js

const CC = require('./connectAndClose');

async function getUserEmailIfExists(email) {
  try {
    let user;
    await CC.connectAndClose(async (database) => {
      user = await database.collection('Users').findOne(
        { email },
        { projection: { email: 1} });
    });
    return user;
  } catch (error) {
    console.error(`Error retrieving user ${emailAddress}:`, error);
    throw new Error(`Error retrieving user ${emailAddress}`);
  }
}

async function insertUser(email, firstName, lastName, userPassword) {
  try {
    // Check if a user with the same email already exists
    const existingUser = await getUserEmailIfExists(email);
    if (existingUser) {
      console.log('User with the same email already exists.');
      return null; // Do not create the user
    }

    const user = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: userPassword,
      favoriteProducts: [],
      orderHistory: [],
    };

    await CC.connectAndClose(async (database) => {
      await database.collection('Users').insertOne(user);
      console.log('User inserted successfully.');
    });

    const { password, favoriteProducts, orderHistory, ...userWithoutSensitiveData } = user;
    return userWithoutSensitiveData;
  } 
  catch (error) {
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
        { projection: { email: 1, firstName: 1, lastName: 1 } }
      );
    });

    return user ? user : null;
  } 
  catch (error) {
    console.error('Error authenticating login:', error);
    throw new Error('Error authenticating login');
  }
}

async function addFavProduct(userEmail, product) {
  try {
    let additionStatus = true;

    await CC.connectAndClose(async (database) => {
      const collection = database.collection('Users');
      // Check if the product is already in the user's favoriteProducts array
      const user = await collection.findOne({ email: userEmail });
      if (user.favoriteProducts.includes(product)) {
        console.log('Product already exists in favorites.');
        additionStatus = false; // Do not add the product again
      } else {
        // Add the product to the favoriteProducts array
        await collection.updateOne(
          { email: userEmail },
          { $addToSet: { favoriteProducts: product } }
        );
        console.log('Product added as a favorite.');
      }
    });

    return additionStatus;
  } catch (error) {
    console.error('Error adding favorite product:', error);
    throw new Error('Error adding favorite product');
  }
}

async function deleteFavProduct(userEmail, product) {
  try {
    let removalStatus = false;

    await CC.connectAndClose(async (database) => {
      const result = await database.collection('Users').updateOne(
        { email: userEmail },
        { $pull: { favoriteProducts: product } }
      );

      if (result.modifiedCount > 0) {
        console.log('Product removed from favorites.');
        removalStatus = true;
      } else {
        console.log('Product not found in favorites.');
      }
    });

    return removalStatus;
  } catch (error) {
    console.error('Error removing favorite product:', error);
    throw new Error('Error removing favorite product');
  }
}



async function addOrderToHistory(userEmail, orderArray) {
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
    
// Function to get favorite products of a user
async function getFavProducts(userEmail) {
  try {
    let favProducts;
    await CC.connectAndClose(async (database) => {
      favProducts = await database.collection('Users').findOne(
        { email: userEmail },
        { projection: { favoriteProducts: 1 } }
      );
    });

    return favProducts ? favProducts.favoriteProducts : [];
  } catch (error) {
    console.error('Error retrieving favorite products:', error);
    throw new Error('Error retrieving favorite products');
  }
}

// Function to get order history of a user
async function getOrderHistory(userEmail) {
  try {
    let orderHistory;
    await CC.connectAndClose(async (database) => {
      orderHistory = await database.collection('Users').findOne(
        { email: userEmail },
        { projection: { orderHistory: 1 } }
      );
    });
    return orderHistory ? orderHistory.orderHistory : [];
  } 
  catch (error) {
    console.error('Error retrieving order history:', error);
    throw new Error('Error retrieving order history');
  }
}

async function deleteUser(email) {
  try {
    let deleteStatus = false;

    await CC.connectAndClose(async (database) => {
      const result = await database.collection('Users').deleteOne({ email });
      
      if (result.deletedCount > 0) {
        console.log('User deleted successfully.');
        deleteStatus = true;
      } else {
        console.log('User not found.');
      }
    });
    return deleteStatus;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Error deleting user');
  }
}

exports.insertUser = insertUser;
exports.getUserEmailIfExists = getUserEmailIfExists;
exports.authenticateLogin = authenticateLogin;
exports.addFavProduct = addFavProduct;
exports.deleteFavProduct = deleteFavProduct;
exports.addOrderToHistory = addOrderToHistory;
exports.getFavProducts = getFavProducts;
exports.getOrderHistory = getOrderHistory;
exports.deleteUser = deleteUser;