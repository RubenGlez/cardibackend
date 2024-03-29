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
const GetMetricsUseCase_1 = __importDefault(require("../../../../../application/use-cases/metrics/GetMetricsUseCase"));
const MongoCompanyRepository_1 = __importDefault(require("../../../../implementations/mongo/MongoCompanyRepository"));
const MongoMetricsRepository_1 = __importDefault(require("../../../../implementations/mongo/MongoMetricsRepository"));
function getMetricsController(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const mongoCompanyRepository = new MongoCompanyRepository_1.default();
        const mongoMetricsRepository = new MongoMetricsRepository_1.default();
        const getMetricsUseCase = new GetMetricsUseCase_1.default({
            companyRepository: mongoCompanyRepository,
            metricsRepository: mongoMetricsRepository
        });
        try {
            const { tenantId = '', query } = req;
            const { companyId } = query;
            const metrics = yield getMetricsUseCase.run({
                tenantId,
                companyId: (_a = companyId === null || companyId === void 0 ? void 0 : companyId.toString()) !== null && _a !== void 0 ? _a : ''
            });
            res.json(metrics);
        }
        catch (e) {
            next(e);
        }
    });
}
exports.default = getMetricsController;
