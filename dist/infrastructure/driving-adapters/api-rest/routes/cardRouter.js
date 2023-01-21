"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createCardController_1 = __importDefault(require("../controllers/card/createCardController"));
const deleteCardController_1 = __importDefault(require("../controllers/card/deleteCardController"));
const getCardController_1 = __importDefault(require("../controllers/card/getCardController"));
const getCardsController_1 = __importDefault(require("../controllers/card/getCardsController"));
const updateCardController_1 = __importDefault(require("../controllers/card/updateCardController"));
const router = express_1.default.Router();
router.get('/', getCardsController_1.default);
router.post('/', createCardController_1.default);
router.put('/:cardId', updateCardController_1.default);
router.get('/:cardId', getCardController_1.default);
router.delete('/:cardId', deleteCardController_1.default);
exports.default = router;
