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
const GetUserByIdService_1 = __importDefault(require("../../../domain/services/user/GetUserByIdService"));
class UpdateUserUseCase {
    constructor({ userRepository }) {
        this._userRepository = userRepository;
        this._getUserByIdService = new GetUserByIdService_1.default({ userRepository });
    }
    run({ tenantId, userId, password, username }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userId !== tenantId) {
                throw new OutputError_1.OutputError(OutputErrorTypes_1.OutputErrorTypes.NotOwned);
            }
            const currentUser = yield this._getUserByIdService.run({ userId });
            const dataToUpdate = Object.assign(Object.assign({}, currentUser), { password: password !== null && password !== void 0 ? password : currentUser.password, username: username !== null && username !== void 0 ? username : currentUser.username, updatedAt: new Date() });
            const userUpdated = yield this._userRepository.update(dataToUpdate);
            return userUpdated;
        });
    }
}
exports.default = UpdateUserUseCase;
