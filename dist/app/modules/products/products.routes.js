"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const express_1 = __importDefault(require("express"));
const jwtMiddleware_1 = require("../../middleware/jwtMiddleware");
const products_controller_1 = require("./products.controller");
const router = express_1.default.Router();
router
    .get('/', products_controller_1.ProductController.getAllProducts)
    .get('/search', products_controller_1.ProductController.searchProduct)
    .get('/filter', products_controller_1.ProductController.getProductsByFilter)
    .get('/stock', products_controller_1.ProductController.getStockInfo)
    .get('/low-stock', products_controller_1.ProductController.getLowStockProducts)
    .get('/:id', products_controller_1.ProductController.getProductByID)
    .post('/create-product', jwtMiddleware_1.jwtVerify, products_controller_1.ProductController.createProduct)
    .put('/:id', jwtMiddleware_1.jwtVerify, products_controller_1.ProductController.updateProduct)
    .delete('/:id', jwtMiddleware_1.jwtVerify, products_controller_1.ProductController.deleteProduct);
exports.ProductRouter = router;
