class ProductService {
    constructor(manager) {
      this.dao = manager;
    }
  
    get = (page, limit, sort, query) => this.dao.manager.getProduct(page, limit, sort, query);
    add = (product) => this.dao.manager.addProduct(product);
    getId = (id) => this.dao.manager.getProductId(id);
    UpdateProduct = (id, product) => this.dao.manager.UpdateProduct(id, product);
    DeleteProductId = (id) => this.dao.manager.DeleteProductId(id);
  }
  
  module.exports = ProductService;