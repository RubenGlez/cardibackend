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
const OutputError_1 = require("../../../domain/exceptions/OutputError");
const OutputErrorTypes_1 = require("../../../domain/exceptions/OutputErrorTypes");
const GetPromotionByIdService_1 = __importDefault(require("../../../domain/services/promotion/GetPromotionByIdService"));
class UpdatePromotionUseCase {
    constructor({ promotionRepository }) {
        this._promotionRepository = promotionRepository;
        this._getPromotionByIdService = new GetPromotionByIdService_1.default({
            promotionRepository
        });
    }
    run({ tenantId, id, name, description, validFrom, validTo }) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentPromotion = yield this._getPromotionByIdService.run({ id });
            if ((currentPromotion === null || currentPromotion === void 0 ? void 0 : currentPromotion.owner) !== tenantId) {
                throw new OutputError_1.OutputError(OutputErrorTypes_1.OutputErrorTypes.NotOwned);
            }
            const promotionToUpdate = Object.assign(Object.assign({}, currentPromotion), { name: name !== null && name !== void 0 ? name : currentPromotion.name, description: description !== null && description !== void 0 ? description : currentPromotion.description, validFrom: validFrom !== null && validFrom !== void 0 ? validFrom : currentPromotion.validFrom, validTo: validTo !== null && validTo !== void 0 ? validTo : currentPromotion.validTo });
            const promotionUpdated = yield this._promotionRepository.update(promotionToUpdate);
            return promotionUpdated;
        });
    }
}
exports.default = UpdatePromotionUseCase;
