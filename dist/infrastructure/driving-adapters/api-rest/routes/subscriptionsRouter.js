"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createSubscriptionController_business_1 = __importDefault(require("../controllers/subscription/createSubscriptionController.business"));
const getSubscriptionsController_business_1 = __importDefault(require("../controllers/subscription/getSubscriptionsController.business"));
const updateSubscriptionController_business_1 = __importDefault(require("../controllers/subscription/updateSubscriptionController.business"));
const router = express_1.default.Router();
router.get('/', getSubscriptionsController_business_1.default);
router.post('/', createSubscriptionController_business_1.default);
router.put('/:subscriptionId', updateSubscriptionController_business_1.default);
exports.default = router;
