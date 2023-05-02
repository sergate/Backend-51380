const fs = require('fs');

class ProductManager {
  constructor(filename) {
    this.filename = filename;
  }

  async getAll(limit) {
    const content = await this._readFile();
    let products = JSON.parse(content);

    if (limit) {
      products = products.slice(0, limit);
    }

    return products;
  }

  async getById(id) {
    const content = await this._readFile();
    const products = JSON.parse(content);
    const product = products.find(p => p.id === id);

    return product;
  }

  async _readFile() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filename, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = ProductManager;