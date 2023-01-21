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
const ExistCompanyByNameService_1 = __importDefault(require("../../../domain/services/company/ExistCompanyByNameService"));
class CreateCompanyUseCase {
    constructor({ companyRepository }) {
        this._companyRepository = companyRepository;
        this._existCompanyByNameService = new ExistCompanyByNameService_1.default({
            companyRepository
        });
    }
    run({ tenantId, name, description, contact }) {
        return __awaiter(this, void 0, void 0, function* () {
            const existCompany = yield this._existCompanyByNameService.run({
                companyName: name
            });
            if (existCompany) {
                throw new OutputError_1.OutputError(OutputErrorTypes_1.OutputErrorTypes.CompanyAlreadyExist);
            }
            const companyToCreate = {
                owner: tenantId,
                name,
                description,
                contact
            };
            const companyCreated = yield this._companyRepository.save(companyToCreate);
            return companyCreated;
        });
    }
}
exports.default = CreateCompanyUseCase;
