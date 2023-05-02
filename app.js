const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 3000;

const productManager = new ProductManager('products.json');

app.get('/products', async (req, res) => {
  const limit = req.query.limit;
  const products = await productManager.getAll(limit);
  res.json({ products });
});

app.get('/products/:pid', async (req, res) => {
  const id = req.params.pid;
  const product = await productManager.getById(id);

  if (product) {
    res.json({ product });
  } else {
    res.status(404).send('Product not found');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});