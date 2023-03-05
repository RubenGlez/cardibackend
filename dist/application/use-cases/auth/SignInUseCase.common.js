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
const GetUserByEmailService_1 = __importDefault(require("../../../domain/services/user/GetUserByEmailService"));
class SignInUseCase {
    constructor({ authRepository, userRepository }) {
        this._authRepository = authRepository;
        this._userRepository = userRepository;
        this._getUserByEmailService = new GetUserByEmailService_1.default({ userRepository });
    }
    run({ email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield this._getUserByEmailService.run({ email });
            if (foundUser === null) {
                throw new OutputError_1.OutputError(OutputErrorTypes_1.OutputErrorTypes.UserNotFound);
            }
            const isPasswordCorrect = yield this._authRepository.comparePassword(password, foundUser.password);
            if (!isPasswordCorrect) {
                throw new OutputError_1.OutputError(OutputErrorTypes_1.OutputErrorTypes.InvalidCredentials);
            }
            const userUpdated = yield this._userRepository.update(foundUser);
            const accessToken = this._authRepository.generateToken(userUpdated.id);
            return { userId: userUpdated.id, accessToken, userRole: userUpdated.role };
        });
    }
}
exports.default = SignInUseCase;
