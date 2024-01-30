"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesRouter = void 0;
const express_1 = __importDefault(require("express"));
const jwtMiddleware_1 = require("../../middleware/jwtMiddleware");
const sale_controller_1 = require("./sale.controller");
const router = express_1.default.Router();
router
    .get('/recent-sales', sale_controller_1.SalesController.getRecentSales)
    .get('/best-selling', sale_controller_1.SalesController.getBestSelling)
    .get('/:category', sale_controller_1.SalesController.getSalesByCategory)
    .post('/make-sale', jwtMiddleware_1.jwtVerify, sale_controller_1.SalesController.makeSale);
exports.SalesRouter = router;
