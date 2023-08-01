const cartsModel = require('../models/carts.model');
const ticketModel = require('../models/ticket.model');
// const productModel = require('../models/products.model')

class BdCartsManager {
  constructor() {
    this.carts = [];
  }

  CreateCarts = async (cart) => {
    try {
      const Createcart = await cartsModel.create(cart);
      return Createcart;
    } catch (error) {
      return { msg: 'Error al crear Carritos' };
    }
  };

  getCartsId = async (id) => {
    try {
      const cart = await cartsModel.findById(id);
      return cart;
    } catch (error) {
      return undefined;
    }
  };

  renderCart = async (id) => {
    try {
      const cart = await cartsModel.findById(id);
      return [cart];
    } catch (error) {
      return undefined;
    }
  };

  getCarts = async () => {
    try {
      const cart = await cartsModel.find();
      return cart;
    } catch (error) {
      return { msg: 'Error Al Mostrar Carrito' };
    }
  };

  addProductToCarts = async (cid, product) => {
    const cart = await cartsModel.findById(cid);
    console.log(JSON.stringify(product));
    const resultado = cart.products.findIndex((prod) => prod.id == product.id);
    console.log(resultado);
    if (resultado === -1) {
    } else {
    }
  };

  updateCartProducts = async (cart) => {
    const cartUpdated = await cartsModel.findByIdAndUpdate(cart.id, cart, { new: true });
    return cartUpdated;
  };
}
// /Nuevos metodos por aplicacion del ticket y el stock/
deleteProductToCart = async (cid, pid) => {
  try {
    const cartFinded = await this.getById(cid);
    if (cartFinded.error)
      return {
        status: 404,
        error: `Cart with id ${cid} not found`,
      };

    const productInCart = cartFinded.find((product) => product.pid._id == pid);

    if (productInCart) {
      await cartsModel.findByIdAndUpdate(cid, { $pull: { products: { pid } } });
      return { status: 'success', message: 'Product deleted successfully' };
    }
    return {
      status: 404,
      error: `The product with id ${pid} was not found in the cart with id ${cid}`,
    };
  } catch (error) {
    return {
      status: 500,
      error: `An error occurred while deleting the product with id ${pid}`,
    };
  }
};

deleteProducts = async (cid) => {
  try {
    const cartFinded = await this.getById(cid);
    if (cartFinded.error)
      return {
        status: 404,
        error: `Cart with id ${cid} not found`,
      };

    await cartsModel.findByIdAndUpdate(cid, { products: [] });
    return { status: 'success', message: 'All product deleted successfully' };
  } catch (error) {
    return {
      status: 500,
      error: `An error occurred while deleting products`,
    };
  }
};

deleteById = async (cid) => {
  try {
    const cartDeleted = await cartsModel.findByIdAndDelete(cid);
    return cartDeleted === null
      ? {
          status: 404,
          error: `Cart with id ${cid} not found`,
        }
      : {
          status: 'success',
          message: `Cart with id ${cid} deleted successfully`,
        };
  } catch (error) {
    return {
      status: 500,
      error: `An error occurred while deleting products`,
    };
  }
};

purchase = async (cid, purchaser) => {
  try {
    const productsInCart = await this.getById(cid);

    if (productsInCart.error)
      return {
        status: 404,
        error: `Cart with id ${cid} not found`,
      };

    const existProductOutStock = Boolean(productsInCart.find((product) => product.pid.stock < product.quantity));

    if (existProductOutStock) return { status: 400, message: 'Exist product out stock' };

    let totalAmount = 0;

    for (const product of productsInCart) {
      const newStock = product.pid.stock - product.quantity;
      totalAmount += product.pid.price;
      await dbpm.putById(product.pid._id, { stock: newStock });
    }

    const ticket = await ticketModel.create({
      code: faker.database.mongodbObjectId(),
      purchaseDateTime: new Date().toLocaleString(),
      amount: totalAmount,
      purchaser: 'yo',
    });
    return { payload: { ticket, productsInCart } };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      error: `An error occurred while purchase`,
    };
  }
};

module.exports = new BdCartsManager();