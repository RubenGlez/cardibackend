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
const DeleteCardUseCase_1 = __importDefault(require("../../../../../application/use-cases/card/DeleteCardUseCase"));
const MongoCardRepository_1 = __importDefault(require("../../../../implementations/mongo/MongoCardRepository"));
function deleteCardController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const mongoCardRepository = new MongoCardRepository_1.default();
        const deleteCardUseCase = new DeleteCardUseCase_1.default({
            cardRepository: mongoCardRepository
        });
        try {
            const { params, tenantId = '' } = req;
            const { cardId } = params;
            const card = yield deleteCardUseCase.run({ tenantId, cardId });
            res.json(card);
        }
        catch (e) {
            next(e);
        }
    });
}
exports.default = deleteCardController;
