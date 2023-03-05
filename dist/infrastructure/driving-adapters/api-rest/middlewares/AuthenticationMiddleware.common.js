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
const CheckAuthenticationUseCase_common_1 = __importDefault(require("../../../../application/use-cases/auth/CheckAuthenticationUseCase.common"));
const MongoAuthRepository_1 = __importDefault(require("../../../implementations/mongo/MongoAuthRepository"));
const MongoUserRepository_1 = __importDefault(require("../../../implementations/mongo/MongoUserRepository"));
function AuthenticationMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const mongoUserRepository = new MongoUserRepository_1.default();
        const mongoAuthRepository = new MongoAuthRepository_1.default();
        const checkAuthenticationUseCase = new CheckAuthenticationUseCase_common_1.default({
            authRepository: mongoAuthRepository,
            userRepository: mongoUserRepository
        });
        try {
            const authHeader = req.header('Authorization');
            const accessToken = authHeader === null || authHeader === void 0 ? void 0 : authHeader.replace('Bearer ', '');
            const userIdFromAccessToken = yield checkAuthenticationUseCase.run({
                accessToken
            });
            req.tenantId = userIdFromAccessToken;
            return next();
        }
        catch (e) {
            return next(e);
        }
    });
}
exports.default = AuthenticationMiddleware;
