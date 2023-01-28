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
const PreferencesModel_1 = __importDefault(require("../../driven-adapters/mongoose/models/PreferencesModel"));
class MongoPreferencesRepository {
    constructor() {
        this._model = PreferencesModel_1.default;
    }
    toDto(preferencesToMap) {
        var _a, _b, _c;
        const preferencesDTO = Object.assign({ id: (_a = preferencesToMap._id) === null || _a === void 0 ? void 0 : _a.toString() }, preferencesToMap);
        delete preferencesDTO._id;
        delete preferencesDTO.__v;
        preferencesDTO.user = (_b = preferencesDTO.user) === null || _b === void 0 ? void 0 : _b.toString();
        preferencesDTO.companySelected = (_c = preferencesDTO.companySelected) === null || _c === void 0 ? void 0 : _c.toString();
        return preferencesDTO;
    }
    getByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const preferencesFound = yield this._model.findOne({ user: userId }).lean();
            if (preferencesFound === null)
                return null;
            const preferencesMapped = this.toDto(preferencesFound);
            return preferencesMapped;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const preferencesFound = yield this._model.findOne({ _id: id }).lean();
            if (preferencesFound === null)
                return null;
            const preferencesMapped = this.toDto(preferencesFound);
            return preferencesMapped;
        });
    }
    save(inputData) {
        return __awaiter(this, void 0, void 0, function* () {
            const preferencesToCreate = new this._model(inputData);
            const preferencesCreated = yield preferencesToCreate.save();
            const preferencesMapped = this.toDto(preferencesCreated.toObject());
            return preferencesMapped;
        });
    }
    update(inputData) {
        return __awaiter(this, void 0, void 0, function* () {
            const preferencesUpdated = yield this._model
                .findByIdAndUpdate(inputData.id, inputData, { returnDocument: 'after' })
                .lean();
            const preferencesMapped = this.toDto(preferencesUpdated);
            return preferencesMapped;
        });
    }
}
exports.default = MongoPreferencesRepository;
