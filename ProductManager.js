class ProductManager {
  constructor() {
    this.products = [];
    this.nextId = 1;
  }

  addProduct(product) {
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.log("Error: All fields are required.");
      return;
    }

    if (this.getProductByCode(product.code)) {
      console.log(`Error: Product with code ${product.code} already exists.`);
      return;
    }

    product.id = this.nextId;
    this.nextId++;

    this.products.push(product);
    console.log("Product added successfully.");
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(p => p.id === id);

    if (product) {
      return product;
    } else {
      console.log("Error: Product not Found.");
      return null;
    }
  }

  getProductByCode(code) {
    return this.products.find(p => p.code === code);
  }
}