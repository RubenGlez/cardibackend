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
class DeleteCardUseCase {
    constructor({ cardRepository }) {
        this._cardRepository = cardRepository;
        this._getCardByIdService = new GetCardByIdService_1.default({ cardRepository });
    }
    run({ cardId, tenantId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const cardToDelete = yield this._getCardByIdService.run({ id: cardId });
            if (cardToDelete.owner !== tenantId) {
                throw new OutputError_1.OutputError(OutputErrorTypes_1.OutputErrorTypes.NotOwned);
            }
            // TODO: improve this flow
            // has promos?
            // -> no : delete
            // -> yes : trow error "must delete promos firstly"
            yield this._cardRepository.delete(cardToDelete.id);
        });
    }
}
exports.default = DeleteCardUseCase;
