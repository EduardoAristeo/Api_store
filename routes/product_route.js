const express = require("express");
const router = express.Router();
const product_controller = require('../controller/productController');

// Rutas
router.get("/", product_controller.fetchAll);
router.post("/", product_controller.createProduct);
router.put("/:id", product_controller.findByIdAndUpdate);
router.delete("/:id", product_controller.findByIdAndRemove);
router.get("/proveedor/:id", product_controller.fetchProductsByProvider);

module.exports = router;
