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
const SignInUseCase_1 = __importDefault(require("../../../../../application/use-cases/auth/SignInUseCase"));
const MongoAuthRepository_1 = __importDefault(require("../../../../implementations/mongo/MongoAuthRepository"));
const MongoUserRepository_1 = __importDefault(require("../../../../implementations/mongo/MongoUserRepository"));
function signInController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const mongoUserRepository = new MongoUserRepository_1.default();
        const mongoAuthRepository = new MongoAuthRepository_1.default();
        const signInUseCase = new SignInUseCase_1.default({
            authRepository: mongoAuthRepository,
            userRepository: mongoUserRepository
        });
        try {
            const authData = yield signInUseCase.run(req.body);
            res.json(authData);
        }
        catch (e) {
            next(e);
        }
    });
}
exports.default = signInController;
