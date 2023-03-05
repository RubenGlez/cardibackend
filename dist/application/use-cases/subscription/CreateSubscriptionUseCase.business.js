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
const Subscription_1 = require("../../../domain/entities/Subscription");
const User_1 = require("../../../domain/entities/User");
const OutputError_1 = require("../../../domain/exceptions/OutputError");
const OutputErrorTypes_1 = require("../../../domain/exceptions/OutputErrorTypes");
const GetPromotionByIdService_1 = __importDefault(require("../../../domain/services/promotion/GetPromotionByIdService"));
const GetUserByIdService_1 = __importDefault(require("../../../domain/services/user/GetUserByIdService"));
class CreateSubscriptionUseCase {
    constructor({ subscriptionRepository, promotionRepository, userRepository }) {
        this._subscriptionRepository = subscriptionRepository;
        this._getPromotionByIdService = new GetPromotionByIdService_1.default({
            promotionRepository
        });
        this._getUserByIdService = new GetUserByIdService_1.default({ userRepository });
    }
    run({ tenantId, promotion, subscriptor }) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const _promotion = yield this._getPromotionByIdService.run({
                promotionId: promotion
            });
            if (((_a = _promotion.owner) === null || _a === void 0 ? void 0 : _a.toString()) !== tenantId) {
                throw new OutputError_1.OutputError(OutputErrorTypes_1.OutputErrorTypes.NotOwned);
            }
            const _subscriptor = yield this._getUserByIdService.run({
                userId: subscriptor
            });
            const subscriptorHasBasicRole = _subscriptor.role === User_1.UserRole.Basic;
            if (!subscriptorHasBasicRole) {
                throw new OutputError_1.OutputError(OutputErrorTypes_1.OutputErrorTypes.InvalidSusbcriptorRole);
            }
            const today = new Date();
            const isPromoOutdated = _promotion.validFrom > today || _promotion.validTo < today;
            if (isPromoOutdated)
                throw new OutputError_1.OutputError(OutputErrorTypes_1.OutputErrorTypes.PromotionOutdated);
            const subscriptionFound = yield this._subscriptionRepository.getBySubscriptorAndPromotion(_subscriptor.id, _promotion.id);
            if (subscriptionFound !== null) {
                throw new OutputError_1.OutputError(OutputErrorTypes_1.OutputErrorTypes.SubscriptionAlreadyExist, {
                    id: (_b = subscriptionFound === null || subscriptionFound === void 0 ? void 0 : subscriptionFound.id) !== null && _b !== void 0 ? _b : ''
                });
            }
            const subscriptionToCreate = {
                subscriptor,
                owner: _promotion.owner,
                promotion: _promotion.id,
                card: _promotion.card,
                company: _promotion.company,
                steps: [{ date: today }],
                status: Subscription_1.SubscriptionStatus.inProgress
            };
            const subscriptionCreated = yield this._subscriptionRepository.save(subscriptionToCreate);
            return subscriptionCreated;
        });
    }
}
exports.default = CreateSubscriptionUseCase;
