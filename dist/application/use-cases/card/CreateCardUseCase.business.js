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
class CreateCardUseCase {
    constructor({ cardRepository }) {
        this._cardRepository = cardRepository;
    }
    run({ tenantId, company, name, color, logo, description }) {
        return __awaiter(this, void 0, void 0, function* () {
            const cardToCreate = {
                owner: tenantId,
                company,
                name,
                color,
                logo,
                description
            };
            const cardCreated = yield this._cardRepository.save(cardToCreate);
            return cardCreated;
        });
    }
}
exports.default = CreateCardUseCase;
