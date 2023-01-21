"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getMetricsController_1 = __importDefault(require("../controllers/metrics/getMetricsController"));
const router = express_1.default.Router();
router.get('/', getMetricsController_1.default);
exports.default = router;
