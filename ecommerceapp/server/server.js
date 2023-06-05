// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const productController = require('./productController');
const userController = require('./userController.js');
require('dotenv').config();

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

const stripe = require('stripe')(STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

// productController -------------------------------------------------------------------------------------------------------

// API endpoint for retrieving documents from a specific collection
app.get('/api/products/:collection', async (req, res) => {
  try {
    const documents = await productController.getAllProductsFromCollection(req.params.collection);
    res.json(documents);
  } 
  catch (error) {
    console.error(`Error retrieving documents from collection "${req.params.collection}":`, error);
    res.status(500).json({ error: 'Error retrieving documents' });
  }
});

// API endpoint for retrieving an item by name within a specific collection
app.get('/api/products/:collection/:name', async (req, res) => {
  try {
    const document = await productController.getItemByNameFromCollection(req.params.collection, req.params.name);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json(document);
  } 
  catch (error) {
    console.error(`Error retrieving document "${req.params.name}" from collection "${req.params.collection}":`, error);
    res.status(500).json({ error: 'Error retrieving document' });
  }
});

// API endpoint for retrieving reviews from a product
app.get('/api/:collection/:name/reviews', async (req, res) => {
  try {
    const { collection, name } = req.params;

    // Call the getReviewsFromProduct function from productController
    const reviews = await productController.getReviewsFromProduct(collection, name);

    res.json(reviews);
  } 
  catch (error) {
    console.error(`Error retrieving reviews:`, error);
    res.status(500).json({ error: 'Error retrieving reviews' });
  }
});

// API endpoint for adding a review to a product
app.post('/api/:collection/:name/reviews/add', async (req, res) => {
  try {
    const { collection, name } = req.params;
    const { authorEmail, comment } = req.body;

    // Call the addReviewToProduct function from productController
    const response = await productController.addReviewToProduct(collection, name, authorEmail, comment);

    res.json(response);
  } 
  catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Error adding review' });
  }
});


// API endpoint for searching
app.get('/api/products', async (req, res) => {
  try {
    const candyProducts = await productController.searchForCandy();
    console.log('Candy Products:', candyProducts);
    res.json(candyProducts);
  } 
  catch (error) {
    console.error('Error retrieving candy items:', error);
    res.status(500).json({ error: 'Error retrieving candy items' });
  }
});

// userController -------------------------------------------------------------------------------------------------------

// API endpoint for user authentication
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const authenticatedUser = await userController.authenticateLogin(email, password);
    if (authenticatedUser) {
      res.json(authenticatedUser);
    } else {
      res.json(null);
    }
  } 
  catch (error) {
    console.error('Error authenticating login:', error);
    res.status(500).json({ error: 'Error authenticating login' });
  }
});

// API endpoint for retrieving a user by email
app.get('/api/users/:email', async (req, res) => {
  try {
    const { email } = req.params;

    // Call the getUserByEmail function from userController
    const user = await userController.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } 
  catch (error) {
    console.error(`Error retrieving user:`, error);
    res.status(500).json({ error: 'Error retrieving user' });
  }
});

// API endpoint for inserting a new user
app.post('/api/insertUser', async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;

    // Call the insertUser function from userController
    const userInsertion = await userController.insertUser(email, firstName, lastName, password);

    res.json(userInsertion);
  } 
  catch (error) {
    console.error('Error inserting user:', error);
    res.status(500).json({ error: 'Error inserting user' });
  }
});

// API endpoint for adding a favorite product for a user
app.post('/api/users/favorite/:product/add', async (req, res) => {
  try {
    const { userEmail, product } = req.body;

    // Call the addFavProduct function from userController
    await userController.addFavProduct(userEmail, product);

    res.json({ message: 'Product added as a favorite.' });
  } 
  catch (error) {
    console.error('Error adding favorite product:', error);
    res.status(500).json({ error: 'Error adding favorite product' });
  }
});

// API endpoint for removing a favorite product for a user
app.post('/api/users/favorite/:product/remove', async (req, res) => {
  try {
    const { userEmail, product } = req.body;

    // Call the deleteFavProduct function from userController
    const succesStatus = await userController.deleteFavProduct(userEmail, product);

    res.json(succesStatus);
  } 
  catch (error) {
    console.error('Error removing favorite product:', error);
    res.status(500).json({ error: 'Error removing favorite product' });
  }
});

// API endpoint for adding an order to order history for a user
app.post('/api/users/:user/history/add', async (req, res) => {
  try {
    const { userEmail, cartItems } = req.body;

    // Call the addOrderToHistory function from userController
    const addingSuccess = await userController.addOrderToHistory(userEmail, cartItems);

    res.json(addingSuccess);
  } 
  catch (error) {
    console.error('Error adding order to order history:', error);
    res.status(500).json({ error: 'Error adding order to order history' });
  }
});

// API endpoint for retrieving favorite products of a user
app.get('/api/users/:email/favorites', async (req, res) => {
  try {
    const { email } = req.params;

    // Call the getFavProducts function to retrieve the favorite products
    const favoriteProducts = await userController.getFavProducts(email);

    res.json(favoriteProducts);
  } 
  catch (error) {
    console.error('Error retrieving favorite products:', error);
    res.status(500).json({ error: 'Error retrieving favorite products' });
  }
});

// API endpoint for retrieving order history of a user
app.get('/api/users/:email/history', async (req, res) => {
  try {
    const { email } = req.params;

    const orderHistory = await userController.getOrderHistory(email);

    res.json(orderHistory);
  } 
  catch (error) {
    console.error('Error retrieving order history:', error);
    res.status(500).json({ error: 'Error retrieving order history' });
  }
});

// API endpoint for deleting a user
app.post('/api/users/:email/delete', async (req, res) => {
  try {
    const { email } = req.params;
    const deleteSuccess = await userController.deleteUser(email);
    res.json(deleteSuccess);
  } 
  catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Error deleting user' });
  }
});

// Endpoint to create a payment intent
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { totalAmount } = req.body;

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100,
      currency: 'usd',
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});