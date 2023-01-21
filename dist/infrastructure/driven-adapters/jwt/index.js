"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAdapter = exports.JWT_KEY = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.JWT_KEY = 'unaclavecualquiera';
class JwtAdapter {
    generateToken(userId) {
        const token = jsonwebtoken_1.default.sign({ userId }, exports.JWT_KEY, { expiresIn: '12h' });
        return token;
    }
    verifyToken(accessToken) {
        var _a;
        const userSession = jsonwebtoken_1.default.verify(accessToken, exports.JWT_KEY);
        return (_a = userSession === null || userSession === void 0 ? void 0 : userSession.userId) !== null && _a !== void 0 ? _a : '';
    }
}
exports.JwtAdapter = JwtAdapter;
