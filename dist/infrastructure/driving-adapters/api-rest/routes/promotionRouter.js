"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createPromotionController_1 = __importDefault(require("../controllers/promotion/createPromotionController"));
const deletePromotionController_1 = __importDefault(require("../controllers/promotion/deletePromotionController"));
const getPromotionController_1 = __importDefault(require("../controllers/promotion/getPromotionController"));
const getPromotionsController_1 = __importDefault(require("../controllers/promotion/getPromotionsController"));
const updatePromotionController_1 = __importDefault(require("../controllers/promotion/updatePromotionController"));
const router = express_1.default.Router();
router.get('/', getPromotionsController_1.default);
router.post('/', createPromotionController_1.default);
router.put('/:promotionId', updatePromotionController_1.default);
router.get('/:promotionId', getPromotionController_1.default);
router.delete('/:promotionId', deletePromotionController_1.default);
exports.default = router;
