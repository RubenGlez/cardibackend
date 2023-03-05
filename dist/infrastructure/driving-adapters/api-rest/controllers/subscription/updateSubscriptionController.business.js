"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UpdateSubscriptionUseCase_business_1 = __importDefault(require("../../../../../application/use-cases/subscription/UpdateSubscriptionUseCase.business"));
const MongoPromotionRepository_1 = __importDefault(require("../../../../implementations/mongo/MongoPromotionRepository"));
const MongoSubscriptionRepository_1 = __importDefault(require("../../../../implementations/mongo/MongoSubscriptionRepository"));
function updateSubscriptionController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const mongoSubscriptionRepository = new MongoSubscriptionRepository_1.default();
        const mongoPromotionRepository = new MongoPromotionRepository_1.default();
        const updateSubscriptionUseCase = new UpdateSubscriptionUseCase_business_1.default({
            promotionRepository: mongoPromotionRepository,
            subscriptionRepository: mongoSubscriptionRepository
        });
        try {
            const { params, tenantId = '', body } = req;
            const { subscriptionId } = params;
            const subscription = yield updateSubscriptionUseCase.run(Object.assign({ tenantId,
                subscriptionId }, body));
            res.json(subscription);
        }
        catch (e) {
            next(e);
        }
    });
}
exports.default = updateSubscriptionController;
