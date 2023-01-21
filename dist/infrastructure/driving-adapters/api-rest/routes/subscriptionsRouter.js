"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createSubscriptionController_1 = __importDefault(require("../controllers/subscription/createSubscriptionController"));
const getSubscriptionsController_1 = __importDefault(require("../controllers/subscription/getSubscriptionsController"));
const updateSubscriptionController_1 = __importDefault(require("../controllers/subscription/updateSubscriptionController"));
const router = express_1.default.Router();
router.get('/', getSubscriptionsController_1.default);
router.post('/', createSubscriptionController_1.default);
router.put('/:subscriptionId', updateSubscriptionController_1.default);
exports.default = router;
