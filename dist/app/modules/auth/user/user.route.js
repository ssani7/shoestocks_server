"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const jwtMiddleware_1 = require("../../../middleware/jwtMiddleware");
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router
    .get('/userInfo/:email', jwtMiddleware_1.jwtVerify, user_controller_1.UserController.getUserInfo)
    .post('/login', user_controller_1.UserController.login)
    .post('/register', user_controller_1.UserController.register);
exports.UserRouter = router;
