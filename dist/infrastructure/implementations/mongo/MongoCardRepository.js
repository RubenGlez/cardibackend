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
const CardModel_1 = __importDefault(require("../../driven-adapters/mongoose/models/CardModel"));
class MongoCardRepository {
    constructor() {
        this._model = CardModel_1.default;
    }
    toDto(cardToMap) {
        var _a, _b, _c;
        const cardDTO = Object.assign({ id: (_a = cardToMap._id) === null || _a === void 0 ? void 0 : _a.toString() }, cardToMap);
        delete cardDTO._id;
        delete cardDTO.__v;
        cardDTO.owner = (_b = cardDTO.owner) === null || _b === void 0 ? void 0 : _b.toString();
        cardDTO.company = (_c = cardDTO.company) === null || _c === void 0 ? void 0 : _c.toString();
        return cardDTO;
    }
    getAllByOwner(owner) {
        return __awaiter(this, void 0, void 0, function* () {
            const allCards = yield this._model.find({ owner }).lean();
            if (allCards.length === 0)
                return [];
            const allCardsMapped = allCards.map(card => this.toDto(card));
            return allCardsMapped;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cardFound = yield this._model.findById(id).lean();
            if (cardFound === null)
                return null;
            const cardMapped = this.toDto(cardFound);
            return cardMapped;
        });
    }
    save(inputData) {
        return __awaiter(this, void 0, void 0, function* () {
            const cardToCreate = new this._model(inputData);
            const cardCreated = yield cardToCreate.save();
            const cardMapped = this.toDto(cardCreated.toObject());
            return cardMapped;
        });
    }
    update(inputData) {
        return __awaiter(this, void 0, void 0, function* () {
            const cardUpdated = yield this._model
                .findByIdAndUpdate(inputData.id, inputData, { returnDocument: 'after' })
                .lean();
            const cardMapped = this.toDto(cardUpdated);
            return cardMapped;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._model.findByIdAndDelete(id).lean();
        });
    }
}
exports.default = MongoCardRepository;
