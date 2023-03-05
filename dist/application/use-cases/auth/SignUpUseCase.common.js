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
const ExistUserByEmailService_1 = __importDefault(require("../../../domain/services/user/ExistUserByEmailService"));
class SignUpUseCase {
    constructor({ authRepository, userRepository, preferencesRepository }) {
        this._authRepository = authRepository;
        this._userRepository = userRepository;
        this._preferencesRepository = preferencesRepository;
        this._existUserByEmailService = new ExistUserByEmailService_1.default({
            userRepository
        });
    }
    run({ email, password, username, role }) {
        return __awaiter(this, void 0, void 0, function* () {
            const existUser = yield this._existUserByEmailService.run({ email });
            if (existUser)
                throw new OutputError_1.OutputError(OutputErrorTypes_1.OutputErrorTypes.UserAlreadyExist);
            const encryptedPass = yield this._authRepository.encryptPassword(password);
            const userToCreate = {
                email,
                password: encryptedPass,
                username: username !== null && username !== void 0 ? username : '',
                role
            };
            const userCreated = yield this._userRepository.save(userToCreate);
            const accessToken = this._authRepository.generateToken(userCreated.id);
            const preferencesToCreate = {
                owner: userCreated.id
            };
            yield this._preferencesRepository.save(preferencesToCreate);
            return { userId: userCreated.id, accessToken, userRole: userCreated.role };
        });
    }
}
exports.default = SignUpUseCase;
