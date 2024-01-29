"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoRouter = void 0;
const express_1 = __importDefault(require("express"));
const info_controller_1 = require("./info.controller");
const router = express_1.default.Router();
router.get('/cardInfo', info_controller_1.InfoController.getCardInfo);
exports.InfoRouter = router;
