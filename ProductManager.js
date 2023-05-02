const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  addProduct(product) {
    const products = this.getProducts();

    // Asignar un id autoincrementable al producto.
    const lastId = products.length > 0 ? products[products.length - 1].id : 0;
    const newProduct = { ...product, id: lastId + 1 };

    // Agregar el producto al array de productos y escribirlo en el archivo.
    products.push(newProduct);
    this.writeProducts(products);

    return newProduct;
  }

  getProducts() {
    try {
      const products = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(products);
    } catch (err) {
      // Si el archivo no existe o hay algún error al leerlo, devolver un array vacío.
      return [];
    }
  }

  getProductById(id) {
    const products = this.getProducts();
    const product = products.find(p => p.id === id);

    if (product) {
      return product;
    } else {
      throw new Error('Product not found');
    }
  }

  updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const productIndex = products.findIndex(p => p.id === id);

    if (productIndex >= 0) {
      const updatedProduct = { ...products[productIndex], ...updatedFields };
      products[productIndex] = updatedProduct;
      this.writeProducts(products);

      return updatedProduct;
    } else {
      throw new Error('Product not found');
    }
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const filteredProducts = products.filter(p => p.id !== id);
    this.writeProducts(filteredProducts);
  }

  writeProducts(products) {
    const productsString = JSON.stringify(products);
    fs.writeFileSync(this.path, productsString);
  }
}

module.exports = ProductManager;