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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const sale_services_1 = require("../sale/sale.services");
const products_service_1 = require("./products.service");
const getAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield products_service_1.ProductService.getAllProducts();
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getProductByID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield products_service_1.ProductService.getProductByID(id);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getProductsByFilter = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.query;
        const result = yield products_service_1.ProductService.getProductsByFilter(filter);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getStockInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currentStock } = yield products_service_1.ProductService.getStocksCount();
        const { totalSale } = yield sale_services_1.SaleService.getAllSaleAmount();
        const result = {
            currentStock,
            totalSale,
        };
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getLowStockProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield products_service_1.ProductService.getLowStockProducts();
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = __rest(req.body, []);
        const result = yield products_service_1.ProductService.createProduct(productData);
        res.status(200).json({
            success: true,
            message: 'Product is created successfully!',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const searchProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const result = yield products_service_1.ProductService.searchProduct(String(name));
        res.status(200).json({
            success: true,
            message: 'Product is created successfully!',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield products_service_1.ProductService.deleteProduct(id);
        res.status(200).json({
            success: true,
            message: 'Product is created successfully!',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const productData = __rest(req.body, []);
        const result = yield products_service_1.ProductService.updateProduct(id, productData);
        res.status(200).json({
            success: true,
            message: 'Product is created successfully!',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.ProductController = {
    createProduct,
    getAllProducts,
    getStockInfo,
    getLowStockProducts,
    searchProduct,
    getProductsByFilter,
    deleteProduct,
    updateProduct,
    getProductByID,
};
