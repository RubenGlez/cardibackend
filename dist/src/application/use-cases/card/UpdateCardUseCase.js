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
const GetCardByIdService_1 = __importDefault(require("../../../domain/services/card/GetCardByIdService"));
class UpdateCardUseCase {
    constructor({ cardRepository }) {
        this._cardRepository = cardRepository;
        this._getCardByIdService = new GetCardByIdService_1.default({ cardRepository });
    }
    run({ tenantId, cardId, name, color, logo, description }) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentCard = yield this._getCardByIdService.run({ cardId });
            if ((currentCard === null || currentCard === void 0 ? void 0 : currentCard.owner) !== tenantId) {
                throw new OutputError_1.OutputError(OutputErrorTypes_1.OutputErrorTypes.NotOwned);
            }
            const cardToUpdate = Object.assign(Object.assign({}, currentCard), { name: name !== null && name !== void 0 ? name : currentCard.name, color: color !== null && color !== void 0 ? color : currentCard.color, logo: logo !== null && logo !== void 0 ? logo : currentCard.logo, description: description !== null && description !== void 0 ? description : currentCard.description });
            const cardUpdated = yield this._cardRepository.update(cardToUpdate);
            return cardUpdated;
        });
    }
}
exports.default = UpdateCardUseCase;
