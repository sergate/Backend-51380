const BdProductManager = require('../dao/mongoManager/BdProductManager');
const { ProductRepository } = require('../service/index.repository');
const CustomError = require('../errors/customError.js');
const { invalidParamsProduct, invalidId } = require('../utils/creatorMsg');
const { ERROR_FROM_SERVER } = require('../errors/enumErrors');
const { INVALID_FILTER } = require('../errors/enumErrors');

const getProductsBd = async (req, res) => {
  const { limit, page, sort, ...query } = req.query;
  const products = await ProductRepository.get(page, limit, sort, query);
  const { docs } = products;
  const state = products ? 'success' : 'error';
  if (products) {
    res.json({ ...products, status: state, payload: docs });
  } else {
    res.json(products);
  }
};

const addProductBd = async (req, res, next) => {
  const product = req.body;
  if (!product.title) {
    return next(CustomError.createError({ code: 401, msg: invalidParamsProduct(product), typeError: ERROR_FROM_SERVER }));
  }
  const newproduct = await ProductRepository.add(product);
  if (newproduct) {
    res.json(newproduct);
  } else {
    res.json(newproduct);
  }
};
// const addProductBd = async (req, res) => {
//   const product = req.body;
//   const newproduct = await ProductRepository.add(product);
//   if (newproduct) {
//     res.json(newproduct);
//   } else {
//     res.json(newproduct);
//   }
// };

// const getProductIdBd = async (req, res, next) => {
//   const id = req.params.pid;
//   if (!id) {
//     return next(CustomError.createError({ code: 401, msg: invalidId(product), typeError: INVALID_FILTER }));
//   }
//   const newproduct = await ProductRepository.add(product);
//   if (newproduct) {
//     res.json(newproduct);
//   } else {
//     res.json(newproduct);
//   }
// };

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

const deleteProductBd = async (req, res) => {
  const id = req.params.pid;
  const deleteproduct = await BdProductManager.DeleteProductId(id);
  if (deleteproduct) {
    res.json(deleteproduct);
  } else {
    res.json(deleteproduct);
  }
};

module.exports = {
  getProductsBd,
  getProductIdBd,
  addProductBd,
  UpdateProductBd,
  deleteProductBd,
};