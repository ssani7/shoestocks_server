"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseService = void 0;
const products_model_1 = require("../products/products.model");
const purchase_model_1 = require("./purchase.model");
const getAllPurchases = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield purchase_model_1.Purchase.find();
    return result;
});
const getAllPurchasesAmount = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield purchase_model_1.Purchase.aggregate([
        { $group: { _id: null, totalPurchase: { $sum: '$purchase_amount' } } },
    ]);
    return { totalPurchase: result[0].totalPurchase };
});
const getAllPurchaseAmount = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield purchase_model_1.Purchase.aggregate([
        { $group: { _id: null, totalPurchase: { $sum: '$purchase_amount' } } },
    ]);
    return { totalPurchase: result[0].totalPurchase };
});
const makePurchase = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //   Incrementing product quantity or create new product based on _id
    let productID = payload === null || payload === void 0 ? void 0 : payload._id;
    if (productID)
        yield products_model_1.Product.updateOne({ _id: payload._id }, { $inc: { quantity: payload.quantity } });
    else {
        const product = yield products_model_1.Product.create(payload);
        productID = product._id;
    }
    const purchaseData = {
        date: new Date(),
        product_id: productID,
        purchase_quantity: payload.quantity,
        purchase_amount: Number(payload.price) * Number(payload.quantity),
    };
    const result = yield purchase_model_1.Purchase.create(purchaseData);
    return result;
});
exports.PurchaseService = {
    makePurchase,
    getAllPurchases,
    getAllPurchaseAmount,
    getAllPurchasesAmount,
};
