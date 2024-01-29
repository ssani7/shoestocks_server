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
exports.SalesController = void 0;
const sale_services_1 = require("./sale.services");
const getSalesByCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.params.category;
        const result = yield sale_services_1.SaleService.getSalesByCategory(category);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getRecentSales = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield sale_services_1.SaleService.getRecentSales();
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getBestSelling = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield sale_services_1.SaleService.getBestSelling();
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const makeSale = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { saleData } = req.body;
        const result = yield sale_services_1.SaleService.makeSale(saleData);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.SalesController = {
    makeSale,
    getRecentSales,
    getSalesByCategory,
    getBestSelling,
};
