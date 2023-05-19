const { getProductByName } = require('./productController');
const nameItem = 'Snickers Chocolate Bar';

getProductByName(nameItem)
  .then(bar => {
    console.log(bar.name);
    console.log(bar.price);
  })
  .catch(error => {
    console.error('Error retrieving product:', error);
  });
