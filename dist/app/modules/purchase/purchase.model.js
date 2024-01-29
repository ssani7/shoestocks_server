"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Purchase = void 0;
const mongoose_1 = require("mongoose");
const purchaseSchema = new mongoose_1.Schema({
    date: { type: Date, required: true },
    product_id: { type: String, required: true },
    purchase_quantity: { type: Number, required: true },
    purchase_amount: { type: Number, required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Purchase = (0, mongoose_1.model)('Purchase', purchaseSchema);
