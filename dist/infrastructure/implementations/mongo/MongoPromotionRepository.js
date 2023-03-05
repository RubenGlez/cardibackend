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
const PromotionModel_1 = __importDefault(require("../../driven-adapters/mongoose/models/PromotionModel"));
class MongoPromotionRepository {
    constructor() {
        this._model = PromotionModel_1.default;
    }
    toDTO(promotionToMap) {
        var _a, _b, _c, _d;
        const promotionDTO = Object.assign({ id: (_a = promotionToMap._id) === null || _a === void 0 ? void 0 : _a.toString() }, promotionToMap);
        delete promotionDTO._id;
        delete promotionDTO.__v;
        promotionDTO.owner = (_b = promotionDTO.owner) === null || _b === void 0 ? void 0 : _b.toString();
        promotionDTO.company = (_c = promotionDTO.company) === null || _c === void 0 ? void 0 : _c.toString();
        promotionDTO.card = (_d = promotionDTO.card) === null || _d === void 0 ? void 0 : _d.toString();
        return promotionDTO;
    }
    getAllByCompany(company) {
        return __awaiter(this, void 0, void 0, function* () {
            const promotionsByCompany = yield this._model.find({ company }).lean();
            if (promotionsByCompany.length === 0)
                return [];
            const promotionsByCompanyMapped = promotionsByCompany.map(promotion => this.toDTO(promotion));
            return promotionsByCompanyMapped;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const promotionFound = yield this._model.findById(id).lean();
            if (promotionFound === null)
                return null;
            const promotionMapped = this.toDTO(promotionFound);
            return promotionMapped;
        });
    }
    save(inputData) {
        return __awaiter(this, void 0, void 0, function* () {
            const promotionToCreate = new this._model(inputData);
            const promotionCreated = yield promotionToCreate.save();
            const promotionMapped = this.toDTO(promotionCreated.toObject());
            return promotionMapped;
        });
    }
    update(inputData) {
        return __awaiter(this, void 0, void 0, function* () {
            const promotionUpdated = yield this._model
                .findByIdAndUpdate(inputData.id, inputData, { returnDocument: 'after' })
                .lean();
            const promotionMapped = this.toDTO(promotionUpdated);
            return promotionMapped;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._model.findByIdAndDelete(id);
        });
    }
}
exports.default = MongoPromotionRepository;
