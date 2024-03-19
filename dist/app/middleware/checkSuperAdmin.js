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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.superAdminVerify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const superAdminVerify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token)
        return res
            .status(401)
            .send({ status: 'Failed', message: 'Invalid token. User unauthorized.' });
    try {
        const user = jsonwebtoken_1.default.verify(token, config_1.default.jwt_token);
        req.user = user;
        if (!(user === null || user === void 0 ? void 0 : user.isSuperAdmin))
            res.status(401).send({
                status: 'Failed',
                message: 'Invalid token. User unauthorized.',
            });
    }
    catch (error) {
        console.log(error);
        res
            .status(401)
            .send({ status: 'Failed', message: 'Invalid token. User unauthorized.' });
    }
    next();
});
exports.superAdminVerify = superAdminVerify;
