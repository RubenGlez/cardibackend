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
Object.defineProperty(exports, "__esModule", { value: true });
const OutputError_1 = require("../../exceptions/OutputError");
const OutputErrorTypes_1 = require("../../exceptions/OutputErrorTypes");
class GetPromotionByIdService {
    constructor({ promotionRepository }) {
        this._promotionRepository = promotionRepository;
    }
    run({ promotionId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const promotion = yield this._promotionRepository.getById(promotionId);
            if (promotion === null) {
                throw new OutputError_1.OutputError(OutputErrorTypes_1.OutputErrorTypes.PromotionNotFound);
            }
            return promotion;
        });
    }
}
exports.default = GetPromotionByIdService;
