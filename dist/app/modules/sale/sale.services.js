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
exports.SaleService = void 0;
const products_model_1 = require("../products/products.model");
const sale_model_1 = require("./sale.model");
const getSalesByCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    // calculating differce between current date and category value
    const today = new Date();
    const oneDay = 1000 * 60 * 60 * 24;
    const lastOneDay = new Date(today.valueOf() - 1 * oneDay);
    const lastWeek = new Date(today.valueOf() - 7 * oneDay);
    const lastMonth = new Date(today.valueOf() - 30 * oneDay);
    const lastYear = new Date(today.valueOf() - 365 * oneDay);
    // default showing weekly sales
    let filter = lastWeek;
    // changing filter accoring to need
    if (category === 'daily')
        filter = lastOneDay;
    else if (category === 'monthly')
        filter = lastMonth;
    else if (category === 'yearly')
        filter = lastYear;
    // const result = await Sale.find({ date: { $gt: ['$date', filter] } });
    const result = yield sale_model_1.Sale.aggregate([
        { $match: { date: { $gt: filter } } },
        {
            $lookup: {
                from: 'products',
                localField: 'product_id',
                foreignField: '_id',
                as: 'product',
            },
        },
    ]);
    return result;
});
const getRecentSales = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sale_model_1.Sale.aggregate([
        { $sort: { createdAt: -1 } },
        { $limit: 5 },
        {
            $lookup: {
                from: 'products',
                localField: 'product_id',
                foreignField: '_id',
                as: 'product',
            },
        },
    ]);
    return result;
});
const getBestSelling = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sale_model_1.Sale.aggregate([
        {
            $group: {
                _id: '$product_id',
                name: { $first: '$product_name' },
                value: { $sum: '$sale_amount' },
            },
        },
        { $sort: { value: -1 } },
        { $limit: 5 },
    ]);
    return result;
});
const getAllSaleAmount = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sale_model_1.Sale.aggregate([
        { $group: { _id: null, totalSale: { $sum: '$sale_amount' } } },
    ]);
    // const range = await Sale.aggregate([
    //   {
    //     $group: {
    //       // _id: {
    //       //   $cond: [
    //       //     { $lt: ['$date', fifteenDays] },
    //       //     '16-30',
    //       //     { $cond: [{ $lt: ['$date', sevenDays] }, '08-15', '01-07'] },
    //       //   ],
    //       // },
    //       _id: { $lt: ['$date', sevenDays] },
    //       doc: { $first: '$$ROOT' },
    //       count: { $sum: 1 },
    //     },
    //   },
    //   { $replaceRoot: { newRoot: '$doc' } },
    // ]);
    return { totalSale: result[0].totalSale };
});
const makeSale = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //  updating product stock with sale data
    const product = yield products_model_1.Product.findOne({ _id: payload.product_id });
    // return error if product is not available
    if (!product)
        throw new Error('Product not found');
    const remainingQuantity = Number(product === null || product === void 0 ? void 0 : product.quantity) - Number(payload.sale_quantity);
    if (remainingQuantity < 0)
        throw new Error('Product stock is lower than the sale quantity');
    // deleting the whole product if stock is 0 otherwise reducing quantity
    if (remainingQuantity === 0)
        yield products_model_1.Product.deleteOne({ _id: payload.product_id });
    else
        yield products_model_1.Product.updateOne({ _id: payload.product_id }, { $inc: { quantity: -Number(payload.sale_quantity) } });
    //   recoding the sale if the product can be updated
    return yield sale_model_1.Sale.create(payload);
});
exports.SaleService = {
    makeSale,
    getSalesByCategory,
    getAllSaleAmount,
    getRecentSales,
    getBestSelling,
};
