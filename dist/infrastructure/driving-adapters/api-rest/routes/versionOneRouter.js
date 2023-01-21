"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const basicAuthenticationMiddleware_1 = __importDefault(require("../middlewares/basicAuthenticationMiddleware"));
const businessAuthenticationMiddleware_1 = __importDefault(require("../middlewares/businessAuthenticationMiddleware"));
const authRouter_1 = __importDefault(require("./authRouter"));
const basicRoleRouter_1 = __importDefault(require("./basicRoleRouter"));
const businessRoleRouter_1 = __importDefault(require("./businessRoleRouter"));
const router = express_1.default.Router();
router.use('/auth', authRouter_1.default);
router.use('/basic', basicAuthenticationMiddleware_1.default, basicRoleRouter_1.default);
router.use('/business', businessAuthenticationMiddleware_1.default, businessRoleRouter_1.default);
exports.default = router;
