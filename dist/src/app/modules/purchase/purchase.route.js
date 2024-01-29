"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseRouter = void 0;
const express_1 = __importDefault(require("express"));
const purchase_controller_1 = require("./purchase.controller");
const router = express_1.default.Router();
router
    .get('/', purchase_controller_1.PurchaseController.getALlPurchase)
    .post('/make-purchase', purchase_controller_1.PurchaseController.makePurchase);
exports.PurchaseRouter = router;
