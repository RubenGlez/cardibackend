"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthenticationMiddleware_common_1 = __importDefault(require("../middlewares/AuthenticationMiddleware.common"));
const authRouter_1 = __importDefault(require("./authRouter"));
const preferencesRouter_1 = __importDefault(require("./preferencesRouter"));
const userRouter_1 = __importDefault(require("./userRouter"));
const router = express_1.default.Router();
router.use('/auth', authRouter_1.default);
router.use('/preferences', AuthenticationMiddleware_common_1.default, preferencesRouter_1.default);
router.use('/users', AuthenticationMiddleware_common_1.default, userRouter_1.default);
exports.default = router;
