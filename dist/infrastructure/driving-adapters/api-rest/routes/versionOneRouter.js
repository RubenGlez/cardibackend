"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthenticationMiddleware_basic_1 = __importDefault(require("../middlewares/AuthenticationMiddleware.basic"));
const AuthenticationMiddleware_business_1 = __importDefault(require("../middlewares/AuthenticationMiddleware.business"));
const basicRoleRouter_1 = __importDefault(require("./basicRoleRouter"));
const businessRoleRouter_1 = __importDefault(require("./businessRoleRouter"));
const commonRouter_1 = __importDefault(require("./commonRouter"));
const router = express_1.default.Router();
router.use('/common', commonRouter_1.default);
router.use('/basic', AuthenticationMiddleware_basic_1.default, basicRoleRouter_1.default);
router.use('/business', AuthenticationMiddleware_business_1.default, businessRoleRouter_1.default);
exports.default = router;
