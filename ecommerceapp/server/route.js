const express = require('express');
const app = express();

const paymentController = require('./paymentController');

// Create a checkout session route
app.post('/checkout', paymentController.createCheckoutSession);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
