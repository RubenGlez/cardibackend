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
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../../domain/entities/User");
const OutputError_1 = require("../../../domain/exceptions/OutputError");
const OutputErrorTypes_1 = require("../../../domain/exceptions/OutputErrorTypes");
class CheckAuthenticationUseCase {
    constructor({ authRepository, userRepository }) {
        this._authRepository = authRepository;
        this._userRepository = userRepository;
    }
    run({ accessToken }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (accessToken === undefined) {
                throw new OutputError_1.OutputError(OutputErrorTypes_1.OutputErrorTypes.MissingAccessToken);
            }
            let userIdFromAccessToken;
            try {
                userIdFromAccessToken = this._authRepository.verifyToken(accessToken);
            }
            catch (error) {
                throw new OutputError_1.OutputError(OutputErrorTypes_1.OutputErrorTypes.ExpiredAccessToken);
            }
            const user = yield this._userRepository.getById(userIdFromAccessToken);
            if (user === null) {
                throw new OutputError_1.OutputError(OutputErrorTypes_1.OutputErrorTypes.InvalidAccessToken);
            }
            if (user.role !== User_1.UserRole.Basic) {
                throw new OutputError_1.OutputError(OutputErrorTypes_1.OutputErrorTypes.InvalidUserRole);
            }
            return user.id;
        });
    }
}
exports.default = CheckAuthenticationUseCase;
