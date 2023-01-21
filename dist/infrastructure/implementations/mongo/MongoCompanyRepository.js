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
const CompanyModel_1 = __importDefault(require("../../driven-adapters/mongoose/models/CompanyModel"));
class MongoCompanyRepository {
    constructor() {
        this._model = CompanyModel_1.default;
    }
    toDto(companyToMap) {
        var _a, _b;
        const companyDTO = Object.assign({ id: (_a = companyToMap._id) === null || _a === void 0 ? void 0 : _a.toString() }, companyToMap);
        delete companyDTO._id;
        delete companyDTO.__v;
        companyDTO.owner = (_b = companyDTO.owner) === null || _b === void 0 ? void 0 : _b.toString();
        return companyDTO;
    }
    getAllByOwner(owner) {
        return __awaiter(this, void 0, void 0, function* () {
            const allCompanys = yield this._model.find({ owner }).lean();
            if (allCompanys.length === 0)
                return [];
            const allCompanysMapped = allCompanys.map(company => this.toDto(company));
            return allCompanysMapped;
        });
    }
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const companyFound = yield this._model.findOne({ name }).lean();
            if (companyFound === null)
                return null;
            const companyMapped = this.toDto(companyFound);
            return companyMapped;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const companyFound = yield this._model.findById(id).lean();
            if (companyFound === null)
                return null;
            const companyMapped = this.toDto(companyFound);
            return companyMapped;
        });
    }
    save(inputData) {
        return __awaiter(this, void 0, void 0, function* () {
            const companyToCreate = new this._model(inputData);
            const companyCreated = yield companyToCreate.save();
            const companyMapped = this.toDto(companyCreated.toObject());
            return companyMapped;
        });
    }
    update(inputData) {
        return __awaiter(this, void 0, void 0, function* () {
            const companyUpdated = yield this._model
                .findByIdAndUpdate(inputData.id, inputData, { returnDocument: 'after' })
                .lean();
            const companyMapped = this.toDto(companyUpdated);
            return companyMapped;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._model.findByIdAndDelete(id);
        });
    }
}
exports.default = MongoCompanyRepository;
