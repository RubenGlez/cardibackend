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
class GetCardByIdService {
    constructor({ cardRepository }) {
        this._cardRepository = cardRepository;
    }
    run({ cardId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const card = yield this._cardRepository.getById(cardId);
            if (card === null)
                throw new OutputError_1.OutputError(OutputErrorTypes_1.OutputErrorTypes.CardNotFound);
            return card;
        });
    }
}
exports.default = GetCardByIdService;
