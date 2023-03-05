"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createCardController_business_1 = __importDefault(require("../controllers/card/createCardController.business"));
const deleteCardController_business_1 = __importDefault(require("../controllers/card/deleteCardController.business"));
const getCardController_business_1 = __importDefault(require("../controllers/card/getCardController.business"));
const getCardsController_business_1 = __importDefault(require("../controllers/card/getCardsController.business"));
const updateCardController_business_1 = __importDefault(require("../controllers/card/updateCardController.business"));
const router = express_1.default.Router();
router.get('/', getCardsController_business_1.default);
router.post('/', createCardController_business_1.default);
router.put('/:cardId', updateCardController_business_1.default);
router.get('/:cardId', getCardController_business_1.default);
router.delete('/:cardId', deleteCardController_business_1.default);
exports.default = router;
