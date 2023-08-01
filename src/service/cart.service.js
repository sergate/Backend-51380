const BdCartManager = require('../dao/mongoManager/BdCartManager');

class CartService {
  constructor(manager) {
    this.dao = manager;
  }
  CreateCarts = (cart) => BdCartManager.CreateCarts(cart);
  getCartsId = (id) => BdCartManager.getCartsId(id);
  getCarts = () => BdCartManager.getCarts();
  addProductToCart = (cid, pid) => BdCartManager.addProductToCarts(cid, pid);
  updateCartProducts = (cid) => BdCartManager.updateCartProducts(cid);
}

module.exports = CartService;