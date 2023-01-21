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
const CreateCompanyUseCase_1 = __importDefault(require("../../../../../application/use-cases/company/CreateCompanyUseCase"));
const MongoCompanyRepository_1 = __importDefault(require("../../../../implementations/mongo/MongoCompanyRepository"));
function createCompanyController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const mongoCompanyRepository = new MongoCompanyRepository_1.default();
        const createCompanyUseCase = new CreateCompanyUseCase_1.default({
            companyRepository: mongoCompanyRepository
        });
        try {
            const { tenantId = '' } = req;
            const company = yield createCompanyUseCase.run(Object.assign({ tenantId }, req.body));
            res.json(company);
        }
        catch (e) {
            next(e);
        }
    });
}
exports.default = createCompanyController;
