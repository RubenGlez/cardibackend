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
const GetCompanyByIdService_1 = __importDefault(require("../../../domain/services/company/GetCompanyByIdService"));
class UpdateCompanyUseCase {
    constructor({ companyRepository }) {
        this._companyRepository = companyRepository;
        this._getCompanyByIdService = new GetCompanyByIdService_1.default({
            companyRepository
        });
    }
    run({ tenantId, id, name, description, contact }) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentCompany = yield this._getCompanyByIdService.run({ id });
            console.log('--aqui', currentCompany === null || currentCompany === void 0 ? void 0 : currentCompany.owner, tenantId);
            if ((currentCompany === null || currentCompany === void 0 ? void 0 : currentCompany.owner) !== tenantId)
                throw new OutputError_1.OutputError(OutputErrorTypes_1.OutputErrorTypes.NotOwned);
            const companyToUpdate = Object.assign(Object.assign({}, currentCompany), { name: name !== null && name !== void 0 ? name : currentCompany.name, description: description !== null && description !== void 0 ? description : currentCompany.description, contact: Object.assign(Object.assign({}, currentCompany.contact), contact) });
            const companyUpdated = yield this._companyRepository.update(companyToUpdate);
            return companyUpdated;
        });
    }
}
exports.default = UpdateCompanyUseCase;
