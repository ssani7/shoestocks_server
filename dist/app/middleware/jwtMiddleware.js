"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const jwtVerify = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token)
        return res
            .status(401)
            .send({ status: 'Failed', message: 'Invalid token. User unauthorized.' });
    try {
        const user = jsonwebtoken_1.default.verify(token, config_1.default.jwt_token);
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        res
            .status(401)
            .send({ status: 'Failed', message: 'Invalid token. User unauthorized.' });
    }
};
exports.jwtVerify = jwtVerify;
