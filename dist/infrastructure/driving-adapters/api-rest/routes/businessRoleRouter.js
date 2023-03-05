"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cardRouter_1 = __importDefault(require("./cardRouter"));
const companyRouter_1 = __importDefault(require("./companyRouter"));
const metricsRouter_1 = __importDefault(require("./metricsRouter"));
const promotionRouter_1 = __importDefault(require("./promotionRouter"));
const subscriptionsRouter_1 = __importDefault(require("./subscriptionsRouter"));
const router = express_1.default.Router();
router.use('/cards', cardRouter_1.default);
router.use('/companies', companyRouter_1.default);
router.use('/promotions', promotionRouter_1.default);
router.use('/subscriptions', subscriptionsRouter_1.default);
router.use('/metrics', metricsRouter_1.default);
exports.default = router;
