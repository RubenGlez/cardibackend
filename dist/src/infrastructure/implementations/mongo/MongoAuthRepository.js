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
const bcrypt_1 = require("../../driven-adapters/bcrypt");
const jwt_1 = require("../../driven-adapters/jwt");
class MongoAuthRepository {
    constructor() {
        this._bcryptAdapter = new bcrypt_1.BCryptAdapter();
        this._jwtAdapter = new jwt_1.JwtAdapter();
    }
    encryptPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const encryptedPass = yield this._bcryptAdapter.hash(password);
            return encryptedPass;
        });
    }
    comparePassword(password1, password2) {
        return __awaiter(this, void 0, void 0, function* () {
            const areSamePasswords = yield this._bcryptAdapter.compare(password1, password2);
            return areSamePasswords;
        });
    }
    generateToken(userId) {
        const accessToken = this._jwtAdapter.generateToken(userId);
        return accessToken;
    }
    verifyToken(accessToken) {
        const userId = this._jwtAdapter.verifyToken(accessToken);
        return userId;
    }
}
exports.default = MongoAuthRepository;
