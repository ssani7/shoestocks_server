"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importStar(require("express"));
const globalErrorHandler_1 = require("./app/middleware/globalErrorHandler");
const user_route_1 = require("./app/modules/auth/user/user.route");
const info_route_1 = require("./app/modules/dashboardInfo/info.route");
const products_routes_1 = require("./app/modules/products/products.routes");
const purchase_route_1 = require("./app/modules/purchase/purchase.route");
const sale_route_1 = require("./app/modules/sale/sale.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, express_1.urlencoded)({ extended: true }));
app.get('/', (req, res) => {
    res.send('ShoeStocks.com');
});
app.use('/auth', user_route_1.UserRouter);
app.use('/info', info_route_1.InfoRouter);
app.use('/products', products_routes_1.ProductRouter);
app.use('/purchase', purchase_route_1.PurchaseRouter);
app.use('/sale', sale_route_1.SalesRouter);
app.use(globalErrorHandler_1.globalErrorHandler);
exports.default = app;
