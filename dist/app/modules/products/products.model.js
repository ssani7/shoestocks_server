"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    stock_alert: { type: Number, required: true },
    brand: { type: String },
    model: { type: String },
    style: { type: String },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    material: { type: String },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Product = (0, mongoose_1.model)('Product', productSchema);
