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
const Promotion_1 = require("../../../domain/entities/Promotion");
const Subscription_1 = require("../../../domain/entities/Subscription");
const OutputError_1 = require("../../../domain/exceptions/OutputError");
const OutputErrorTypes_1 = require("../../../domain/exceptions/OutputErrorTypes");
const GetPromotionByIdService_1 = __importDefault(require("../../../domain/services/promotion/GetPromotionByIdService"));
const GetSubscriptionByIdService_1 = __importDefault(require("../../../domain/services/subscription/GetSubscriptionByIdService"));
class UpdateSubscriptionUseCase {
    constructor({ subscriptionRepository, promotionRepository }) {
        this._subscriptionSteps = 3;
        this._subscriptionRepository = subscriptionRepository;
        this._getSubscriptionByIdService = new GetSubscriptionByIdService_1.default({
            subscriptionRepository
        });
        this._getPromotionByIdService = new GetPromotionByIdService_1.default({
            promotionRepository
        });
    }
    run({ tenantId, subscriptionId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentSubscription = yield this._getSubscriptionByIdService.run({
                subscriptionId
            });
            if ((currentSubscription === null || currentSubscription === void 0 ? void 0 : currentSubscription.owner) !== tenantId)
                throw new OutputError_1.OutputError(OutputErrorTypes_1.OutputErrorTypes.NotOwned);
            const promotion = yield this._getPromotionByIdService.run({
                promotionId: currentSubscription.promotion
            });
            const today = new Date();
            const isPromoOutdated = promotion.validFrom > today || promotion.validTo < today;
            if (isPromoOutdated)
                throw new OutputError_1.OutputError(OutputErrorTypes_1.OutputErrorTypes.PromotionOutdated);
            const isStandardPromotion = promotion.type === Promotion_1.PromotionType.Standard;
            if (!isStandardPromotion)
                throw new OutputError_1.OutputError(OutputErrorTypes_1.OutputErrorTypes.InvalidPromotionType);
            const isSubscriptionCompleted = currentSubscription.steps.length === this._subscriptionSteps;
            if (isSubscriptionCompleted)
                throw new OutputError_1.OutputError(OutputErrorTypes_1.OutputErrorTypes.SubscriptionAlreadyCompleted);
            const isLastStep = currentSubscription.steps.length === this._subscriptionSteps - 1;
            const status = isLastStep
                ? Subscription_1.SubscriptionStatus.completed
                : Subscription_1.SubscriptionStatus.inProgress;
            const subscriptionToUpdate = Object.assign(Object.assign({}, currentSubscription), { steps: [...currentSubscription.steps, { date: today }], status });
            const subscriptionUpdated = yield this._subscriptionRepository.update(subscriptionToUpdate);
            return subscriptionUpdated;
        });
    }
}
exports.default = UpdateSubscriptionUseCase;
