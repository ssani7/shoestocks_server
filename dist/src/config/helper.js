"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productFilterGenerator = void 0;
const productFilterGenerator = (filter) => {
    let queryFilter = {};
    if (filter.name)
        queryFilter.name = { $regex: filter.name, $options: 'i' };
    if (filter.brand)
        queryFilter.brand = { $regex: filter.brand, $options: 'i' };
    if (filter.style)
        queryFilter.style = { $regex: filter.style, $options: 'i' };
    if (filter.size)
        queryFilter.size = { $regex: filter.size, $options: 'i' };
    if (filter.color)
        queryFilter.color = { $regex: filter.color, $options: 'i' };
    if (filter.matrial)
        queryFilter.matrial = { $regex: filter.material, $options: 'i' };
    if (filter.model)
        queryFilter.model = { $regex: filter.model, $options: 'i' };
    if (Number(filter.price) > 10)
        queryFilter = Object.assign(Object.assign({}, queryFilter), { price: { $lte: Number(filter.price) } });
    return queryFilter;
};
exports.productFilterGenerator = productFilterGenerator;
