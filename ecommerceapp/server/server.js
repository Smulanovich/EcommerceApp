// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const productController = require('./productController');

app.use(cors());

// API endpoint for retrieving documents from a specific collection
app.get('/api/:collection', async (req, res) => {
  try {
    const collection = req.params.collection;
    const documents = await productController.getAllDocumentsFromCollection(collection);
    res.json(documents);
  } catch (error) {
    console.error(`Error retrieving documents from collection "${req.params.collection}":`, error);
    res.status(500).json({ error: 'Error retrieving documents' });
  }
});

// API endpoint for retrieving a document by name within a specific collection
app.get('/api/:collection/:name', async (req, res) => {
  try {
    const collection = req.params.collection;
    const name = req.params.name;
    const document = await productController.getItemByNameFromCollection(collection, name);
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.json(document);
  } catch (error) {
    console.error(`Error retrieving document "${req.params.name}" from collection "${req.params.collection}":`, error);
    res.status(500).json({ error: 'Error retrieving document' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
