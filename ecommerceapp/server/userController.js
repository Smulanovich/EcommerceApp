// userController.js

const CC = require('./connectAndClose');

async function getUserByEmail(emailAddress) {
    try {
        let user;
        await CC.connectAndClose(async (database) => {
        user = await database.collection('Users').findOne({ email: emailAddress });
        });
        return user;
    } catch (error) {
        console.error(`Error retrieving user ${emailAddress}:`, error);
        throw new Error(`Error retrieving user ${emailAddress}`);
    }
}

async function insertUser(email, firstName, lastName, password) {
  try {
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
  

exports.insertUser = insertUser;
exports.getUserByEmail = getUserByEmail;
exports.addFavProduct = addFavProduct;