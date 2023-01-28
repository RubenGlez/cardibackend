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
const CreatePromotionUseCase_1 = __importDefault(require("../../../../../application/use-cases/promotion/CreatePromotionUseCase"));
const MongoPromotionRepository_1 = __importDefault(require("../../../../implementations/mongo/MongoPromotionRepository"));
function createPromotionController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const mongoPromotionRepository = new MongoPromotionRepository_1.default();
        const createPromotionUseCase = new CreatePromotionUseCase_1.default({
            promotionRepository: mongoPromotionRepository
        });
        try {
            const { tenantId = '', body } = req;
            const promotion = yield createPromotionUseCase.run(Object.assign({ tenantId }, body));
            res.json(promotion);
        }
        catch (e) {
            next(e);
        }
    });
}
exports.default = createPromotionController;
