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
exports.UserServices = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../../config"));
const user_model_1 = require("./user.model");
const login = (userdata) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: userdata.email });
    if (!user)
        throw new Error('User not found for email: ' + userdata.email);
    if (user.password !== userdata.password)
        throw new Error('Invalid password');
    const token = jsonwebtoken_1.default.sign(user.toJSON(), config_1.default.jwt_token, {
        expiresIn: '1D',
    });
    return { user, token };
});
const register = (userdata) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield user_model_1.User.findOne({ email: userdata.email });
    if (existing)
        throw new Error('User already exists for email: ' + userdata.email);
    const user = yield user_model_1.User.create(userdata);
    const token = jsonwebtoken_1.default.sign(user.toJSON(), config_1.default.jwt_token, {
        expiresIn: '1D',
    });
    return { user, token };
});
const getUserInfo = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: email });
    if (!user)
        throw new Error('User not found for email: ' + email);
    return user;
});
exports.UserServices = {
    login,
    register,
    getUserInfo,
};
