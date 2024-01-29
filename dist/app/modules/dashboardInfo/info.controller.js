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
exports.InfoController = void 0;
const products_service_1 = require("../products/products.service");
const purchase_services_1 = require("../purchase/purchase.services");
const sale_services_1 = require("../sale/sale.services");
const getCardInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currentStock } = yield products_service_1.ProductService.getStocksCount();
        const { totalSale } = yield sale_services_1.SaleService.getAllSaleAmount();
        const { totalPurchase } = yield purchase_services_1.PurchaseService.getAllPurchasesAmount();
        const result = {
            currentStock,
            totalSale,
            totalPurchase,
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
exports.InfoController = {
    getCardInfo,
};
