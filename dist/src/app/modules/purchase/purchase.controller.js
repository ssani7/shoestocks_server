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
exports.PurchaseController = void 0;
const purchase_services_1 = require("./purchase.services");
const getALlPurchase = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield purchase_services_1.PurchaseService.getAllPurchases();
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const makePurchase = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const purchaseData = req.body;
        const result = yield purchase_services_1.PurchaseService.makePurchase(purchaseData);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.PurchaseController = {
    makePurchase,
    getALlPurchase,
};
