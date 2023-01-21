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
const domain_1 = require("../../../domain");
class DeleteUserUseCase {
    constructor(userRepository) {
        this._userRepository = userRepository;
        this._getUserByIdService = new domain_1.GetUserByIdService(userRepository);
    }
    run(userId, tenantId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userId !== tenantId)
                throw new domain_1.CardiError(domain_1.CardiErrorTypes.NotOwned);
            const userToDelete = yield this._getUserByIdService.run(userId);
            yield this._userRepository.delete(userToDelete.id);
        });
    }
}
exports.default = DeleteUserUseCase;
