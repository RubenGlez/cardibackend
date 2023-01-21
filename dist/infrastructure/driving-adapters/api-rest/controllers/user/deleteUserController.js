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
const infrastructure_1 = require("../../../../../infrastructure");
const application_1 = require("../../../../../application");
function deleteUserController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const mongoUserRepository = new infrastructure_1.MongoUserRepository();
        const deleteUserUseCase = new application_1.DeleteUserUseCase(mongoUserRepository);
        try {
            const { params, tenantId } = req;
            const { userId } = params;
            const deletedUser = yield deleteUserUseCase.run(userId, tenantId);
            res.json(deletedUser);
        }
        catch (e) {
            next(e);
        }
    });
}
exports.default = deleteUserController;
