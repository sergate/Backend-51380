const express = require("express");
const ProductManager = require("../ProductManager");
const dataProd = new ProductManager("productsDB");

const realTimeProdRoutes = express.Router();

realTimeProdRoutes.get("/", async (req, res) => {
  try {

    const products = await dataProd.getProducts();
    return res.render("realTimeProducts", { products: products });

  } catch (error) {
    res.status(500).json({ succes: "false", msg: "Error", payload: {} });
  }
});

module.exports = realTimeProdRoutes;
