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
const UpdateUserUseCase_1 = __importDefault(require("../../../../../application/use-cases/user/UpdateUserUseCase"));
const MongoUserRepository_1 = __importDefault(require("../../../../implementations/mongo/MongoUserRepository"));
function updateUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const mongoUserRepository = new MongoUserRepository_1.default();
        const updateUserUseCase = new UpdateUserUseCase_1.default({
            userRepository: mongoUserRepository
        });
        try {
            const { params, tenantId = '', body } = req;
            const { userId } = params;
            const user = yield updateUserUseCase.run(Object.assign({ tenantId,
                userId }, body));
            res.json(user);
        }
        catch (e) {
            next(e);
        }
    });
}
exports.default = updateUserController;
