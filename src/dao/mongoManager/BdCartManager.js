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
  // /Nuevos metodos por aplicacion del ticket y el stock/
  deleteProductToCart = async (cid, pid) => {
    try {
      const cartFinded = await this.getById(cid);
      if (cartFinded.error)
        return {
          status: 404,
          error: `Cart con id ${cid} no encontrado`,
        };

      const productInCart = cartFinded.find((product) => product.pid._id == pid);

      if (productInCart) {
        await cartsModel.findByIdAndUpdate(cid, { $pull: { products: { pid } } });
        return { status: 'success', message: 'Producto eliminado satisfactoriamente' };
      }
      return {
        status: 404,
        error: `El producto con el id ${pid} no fue encontrado en el carrito con id ${cid}`,
      };
    } catch (error) {
      return {
        status: 500,
        error: `Hubo un error al eliminar el producto con el  id ${pid}`,
      };
    }
  };

  deleteProducts = async (cid) => {
    try {
      const cartFinded = await this.getById(cid);
      if (cartFinded.error)
        return {
          status: 404,
          error: `Cart con id ${cid} no encontrado`,
        };

      await cartsModel.findByIdAndUpdate(cid, { products: [] });
      return { status: 'success', message: 'todos los productos eliminados' };
    } catch (error) {
      return {
        status: 500,
        error: `Hubo un error al eliminar todos los productos`,
      };
    }
  };

  deleteById = async (cid) => {
    try {
      const cartDeleted = await cartsModel.findByIdAndDelete(cid);
      return cartDeleted === null
        ? {
            status: 404,
            error: `Cart con id ${cid} no encontrado`,
          }
        : {
            status: 'success',
            message: `Cart con id ${cid} eliminado satisfactoriamente`,
          };
    } catch (error) {
      return {
        status: 500,
        error: `Un error ocurrio al eliminar los productos`,
      };
    }
  };
  purchase = async (ticket) => {
    const ticketCreate = await ticketModel.create(ticket);
    return ticketCreate;
  };
}
// purchase = async (cid, purchaser) => {
//   try {
//     const productsInCart = await this.getById(cid);

//     if (productsInCart.error)
//       return {
//         status: 404,
//         error: `Cart con id ${cid} no encontrado`,
//       };

//     const existProductOutStock = Boolean(productsInCart.find((product) => product.pid.stock < product.quantity));

//     if (existProductOutStock) return { status: 400, message: 'Exist product out stock' };

//     let totalAmount = 0;

//     for (const product of productsInCart) {
//       const newStock = product.pid.stock - product.quantity;
//       totalAmount += product.pid.price;
//       await dbpm.putById(product.pid._id, { stock: newStock });
//     }

//     const ticket = await ticketModel.create({
//       code: faker.database.mongodbObjectId(),
//       purchaseDateTime: new Date().toLocaleString(),
//       amount: totalAmount,
//       purchaser: 'yo',
//     });
//     return { payload: { ticket, productsInCart } };
//   } catch (error) {
//     console.log(error);
//     return {
//       status: 500,
//       error: `Un error ocurrio al realizar el purchase`,
//     };
//   }
// };

module.exports = new BdCartsManager();