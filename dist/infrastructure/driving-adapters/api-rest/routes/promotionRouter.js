"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createPromotionController_business_1 = __importDefault(require("../controllers/promotion/createPromotionController.business"));
const deletePromotionController_business_1 = __importDefault(require("../controllers/promotion/deletePromotionController.business"));
const getPromotionController_business_1 = __importDefault(require("../controllers/promotion/getPromotionController.business"));
const getPromotionsController_business_1 = __importDefault(require("../controllers/promotion/getPromotionsController.business"));
const updatePromotionController_business_1 = __importDefault(require("../controllers/promotion/updatePromotionController.business"));
const router = express_1.default.Router();
router.get('/', getPromotionsController_business_1.default);
router.post('/', createPromotionController_business_1.default);
router.put('/:promotionId', updatePromotionController_business_1.default);
router.get('/:promotionId', getPromotionController_business_1.default);
router.delete('/:promotionId', deletePromotionController_business_1.default);
exports.default = router;
