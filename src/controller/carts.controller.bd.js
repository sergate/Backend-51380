const BdProductManager = require('../dao/mongoManager/BdProductManager');
const BdCartManager = require('../dao/mongoManager/BdCartManager');
const { find } = require('../dao/models/products.model');
const { v4 } = require('uuid');

const createCarts = async (req, res) => {
  const cart = req.body;
  const Createcart = await BdCartManager.CreateCarts(cart);
  if (!Createcart.error) {
    res.json(Createcart);
  } else {
    res.json(Createcart);
  }
};

const bdgetCartId = async (req, res) => {
  const id = req.params.cid;
  const cart = await BdCartManager.getCartsId(id);
  if (!cart.error) {
    res.json(cart);
  } else {
    res.json(cart);
  }
};

const bdgetCart = async (req, res) => {
  const cart = await BdCartManager.getCarts();
  if (!cart.error) {
    res.json(cart);
  } else {
    res.json(cart);
  }
};

const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const product = await BdProductManager.getProductId(pid);

  if (!product) {
    return res.status(400).json({
      msg: `El producto con el id ${pid} no existe`,
      ok: false,
    });
  }

  const cart = await BdCartManager.getCartsId(cid);

  if (!cart) {
    const newCart = {
      priceTotal: product.price,
      quantityTotal: 1,
      products: [{ id: product.id }],
      username: cid,
    };

    const cartToSave = await BdCartManager.addProductToCarts(newCart);

    return res.status(200).json({
      msg: 'Carrito creado con exito',
      cart: cartToSave,
    });
  }
  const findProduct = cart.products.find((product) => product.id === pid);

  if (!findProduct) {
    cart.products.push({ id: product.id });
    cart.priceTotal = cart.priceTotal + product.price;
  } else {
    findProduct.quantity++;
    cart.priceTotal = cart.products.reduce((Acomulador, ProductoActual) => Acomulador + product.price * ProductoActual.quantity, 0);
  }
  cart.quantityTotal = cart.quantityTotal + 1;
  const cartToUpdate = await BdCartManager.updateCartProducts(cart);

  return res.status(201).json({
    msg: 'Producto agregado al carrito: ${cid}',
    cart: cartToUpdate,
  });
};

const deleteProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const Cart = await BdCartManager.getCartsId(cid);
  JSON.stringify(Cart);
  const findProductcart = Cart.products.find((prod) => prod.id === pid);

  if (!findProductcart) {
    return res.status(400).json({
      msg: `El producto con el id:${pid} no existe`,
      ok: false,
    });
  } else {
    if (findProductcart.quantity === 1) {
      Cart.products = Cart.products.filter((prod) => prod.id !== pid);
    } else {
      findProductcart.quantity--;
    }
    const product = await BdProductManager.getProductId(pid);
    Cart.quantityTotal = Cart.quantityTotal - 1;
    const total = Cart.products.reduce((acumulador, total) => acumulador + product.price * total.quantity, 0);
    Cart.priceTotal = total;
    const cartToUpdate = await BdCartManager.updateCartProducts(Cart);
    return res.status(200).json({ msg: 'Producto eliminado del carrito', cart: cartToUpdate });
  }
};
const updateQuantityProduct = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity: quantity } = req.body;
  const cart = await BdCartManager.getCartsId(cid);
  const product = await BdProductManager.getProductId(pid);

  if (!cart) {
    return res.status(200).json({
      msg: 'Carrito no encontrado',
    });
  }
  const findProductcart = cart.products.find((prod) => prod.id === pid);

  if (!findProductcart) {
    return res.status(400).json({
      msg: `El producto con el id:${pid} no existe`,
      ok: false,
    });
  }
  if (quantity == undefined) {
    return res.status(400).json({
      msg: `Debe agregar cantidad a actualizar`,
    });
  } else {
    if (quantity < 0) {
      return res.status(400).json({
        msg: `La cantidad debe ser mayor o igual a 0`,
      });
    } else {
      findProductcart.quantity = quantity;
      if (findProductcart.quantity > quantity) {
        cart.priceTotal = cart.priceTotal - product.price * findProductcart.quantity;
      } else {
        cart.priceTotal = cart.priceTotal + product.price * findProductcart.quantity;
      }
    }
  }
  cart.priceTotal = cart.products.reduce((acumulador, total) => acumulador + total.price * total.quantity, 0);
  cart.quantityTotal = cart.products.reduce((Acomulador, ProductoActual) => Acomulador + ProductoActual.quantity, 0);
  const cartToUpdate = await BdCartManager.updateCartProducts(cart);
  return res.status(200).json({ msg: 'Cantidad de producto actualizada', cart: cartToUpdate });
};

const cartUpdate = async (req, res) => {
  const { cid } = req.params;
  const body = req.body;
  const Cart = await BdCartManager.getCartsId(cid);

  if (!Cart) {
    return res.status(200).json({
      msg: 'Carrito no encontrado',
    });
  }
  Cart.products = [];
  Cart.cantidadTotal = 0;
  Cart.totalPrice = 0;

  const product = await BdProductManager.getProductId(body.id);

  if (!product) {
    return res.status(400).json({
      msg: `El producto con el id ${pid} no existe`,
      ok: false,
    });
  }
  Cart.products.push({ id: product.id, quantity: body.quantity });

  Cart.quantityTotal = body.quantity;
  Cart.priceTotal = product.price * body.quantity;

  const cartToUpdate = await BdCartManager.updateCartProducts(Cart);

  return res.status(201).json({
    msg: 'Producto agregado al carrito: ${cid}',
    cart: cartToUpdate,
  });
};

const deleteToCart = async (req, res) => {
  const { cid } = req.params;
  console.log(cid);
  const Cart = await Carts.getCartsId(cid);
  if (!Cart) {
    return res.status(400).json({
      msj: 'Carrito Inexistente',
    });
  }
  Cart.products = [];
  Cart.cantidadTotal = 0;
  Cart.totalPrice = 0;
  const cartToUpdate = await Carts.updateCartProducts(Cart);
  return res.status(201).json({
    msj: 'Carrito Vaciado',
    Carrito: cartToUpdate,
  });
};

const purchase = async (req, res) => {
  let total = 0;
  const id = req.params.cid;
  const carts = await BdCartManager.getCartsId(id);

  const cartsTicket = [];
  const cartsReject = [];

  for (let i = 0; i < carts.products.length; i++) {
    const productBd = await BdProductManager.getProductId(carts.products[i].id);
    if (productBd.stock >= carts.products[i].quantity) {
      productBd.stock = productBd.stock - carts.products[i].quantity;
      await BdProductManager.UpdateProduct(productBd.id, productBd);
      total += productBd.price * carts.products[i].quantity;
      cartsTicket.push(carts.products);
      const cambios = await BdCartManager.deleteProductToCart(id, productBd.id);
      console.log(cambios);
    } else productBd.stock <= carts.products[i].quantity;
    {
      cartsReject.push(productBd); //muestra los productos que no se pudieron agregar por falta de stock
    }
  }
  const newTicket = await BdCartManager.purchase({ code: v4(), amount: total, purchaser: id });
  if (!newTicket) {
    return res.json({
      msg: 'No se pudo crear Ticket',
    });
  }
  return res.json({
    msg: 'Ticket Creado con Exito',
    payload: newTicket,
    msg: 'Productos sin stock',
    product: cartsReject,
  });
};

module.exports = {
  createCarts,
  bdgetCart,
  bdgetCartId,
  addProductToCart,
  deleteProductToCart,
  updateQuantityProduct,
  cartUpdate,
  deleteToCart,
  purchase,
};