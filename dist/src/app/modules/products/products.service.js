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
exports.ProductService = void 0;
const helper_1 = require("../../../config/helper");
const products_model_1 = require("./products.model");
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.find();
    return result;
});
const getProductByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.findOne({ _id: id });
    return result;
});
const getProductsByFilter = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const queryFilter = (0, helper_1.productFilterGenerator)(filter);
    const result = yield products_model_1.Product.find(queryFilter);
    return result;
});
const getLowStockProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.find({
        $expr: { $lte: ['$quantity', '$stock_alert'] },
    });
    return result;
});
const getStocksCount = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.aggregate([
        { $group: { _id: null, currentStock: { $sum: '$quantity' } } },
    ]);
    return { currentStock: result[0].currentStock };
});
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.create(payload);
    return result;
});
const searchProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.find({
        name: { $regex: `${payload}`, $options: 'i' },
    });
    return result;
});
const updateProduct = (_id, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.updateOne({ _id: _id }, {
        $set: Object.assign({}, productData),
    });
    return result;
});
const deleteProduct = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.deleteOne({ _id: _id });
    return result;
});
exports.ProductService = {
    getAllProducts,
    createProduct,
    getStocksCount,
    getLowStockProducts,
    searchProduct,
    getProductsByFilter,
    deleteProduct,
    updateProduct,
    getProductByID,
};
