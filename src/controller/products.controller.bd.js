const BdProductManager = require('../dao/mongoManager/BdProductManager');
const { ProductRepository } = require('../service/index.repository');
const CustomError = require('../errors/customError.js');
const { invalidParamsProduct, invalidId } = require('../utils/creatorMsg');
const { ERROR_FROM_SERVER } = require('../errors/enumErrors');
const { INVALID_FILTER } = require('../errors/enumErrors');
const ProductService = require('../service/products.service');
const mailingService = require('../service/mailing.service');
const ProductManager = require('../dao/fsManager/ProductManager');
const userModel = require('../dao/models/users.model');
const productModel = require('../dao/models/products.model');

const getProductsBd = async (req, res) => {
  const { limit, page, sort, ...query } = req.query;
  const products = await ProductRepository.get(page, limit, sort, query);
  const { docs, ...resto } = products;
  const state = products ? 'success' : 'error';
  if (products) {
    res.json({ ...resto, status: state, payload: docs });
  } else {
    res.json(products);
  }
};

const addProductBd = async (req, res, next) => {
  const product = req.body;
  if (req.user.role !== 'user') {
    product.owner = req.user.email;
    product.ownerRole = req.user.role;
    const newproduct = await ProductRepository.add(product);
    return res.json({
      status: 'success',
      msg: 'Producto Creado con exito',
      newproduct,
    });
  } else {
    return res.json({
      msg: 'Este usuario no puede agregar productos',
    });
  }
};

const getProductIdBd = async (req, res) => {
  const id = req.params.pid;
  const getProductId = await ProductRepository.getId(id);
  if (getProductId) {
    res.json(getProductId);
  } else {
    res.json(getProductId);
  }
};

const UpdateProductBd = async (req, res) => {
  const id = req.params.pid;
  const product = req.body;
  const UpdateProductId = await BdProductManager.UpdateProduct(id, product);
  if (UpdateProductId) {
    res.json(UpdateProductId);
  } else {
    res.json(UpdateProductId);
  }
};

const deleteProductBd = async (req, res, next) => {
  const id = req.params.pid;
  const productExist = await BdProductManager.getProductId(id);
  if (!productExist) {
    return res.json({ msg: 'Producto Inexistente' });
  }
  if (req.user.role === 'admin') {
    await BdProductManager.DeleteProductId(id);
    const propietario = productExist.ownerRole;
    if (propietario === 'premium') {
      mailingService.sendMail({
        to: productExist.owner,
        subject: 'Se ha eliminado tu producto de Brebajes Magicos',
        html: `<div style="background-color: wine; color: withe; display: flex; flex-direction: column; justify-content: center;  align-items: center;">
              <h1>Tu producto ${productExist}ha sido eliminado!</h1>
              </div>`,
      });
    }
    return res.json({ msg: 'Producto Eliminado' });
  }
  if (req.user.role === 'premium') {
    if (req.user.email == productExist.owner) {
      await BdProductManager.DeleteProductId(id);
      if (productExist.owner) {
        mailingService.sendMail({
          to: req.user.email,
          subject: 'Se ha eliminado tu producto de Brebajes magicos',
          html: `<div style="background-color: wine; color: withe; display: flex; flex-direction: column; justify-content: center;  align-items: center;">
                <h1>Tu cuenta ha sido eliminada!</h1>
                <a>Si quieres continuar usando nuestros servicios puedes generar una nueva cuenta.</a>
                </div>`,
        });
      }
      return res.json({ msg: 'Producto Eliminado' });
    } else {
      return res.json({ msg: 'No tienes permisos para eliminar este producto' });
    }
  } else {
    return res.json({ msg: 'No tienes permisos para eliminar este producto' });
  }
};

module.exports = {
  getProductsBd,
  getProductIdBd,
  addProductBd,
  UpdateProductBd,
  deleteProductBd,
};