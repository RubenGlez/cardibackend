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
const UserModel_1 = __importDefault(require("../../driven-adapters/mongoose/models/UserModel"));
class MongoUserRepository {
    constructor() {
        this._model = UserModel_1.default;
    }
    toDto(userToMap) {
        var _a;
        const userDTO = Object.assign({ id: (_a = userToMap._id) === null || _a === void 0 ? void 0 : _a.toString() }, userToMap);
        delete userDTO._id;
        delete userDTO.__v;
        return userDTO;
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFound = yield this._model.findOne({ email }).lean();
            if (userFound === null)
                return null;
            const userMapped = this.toDto(userFound);
            return userMapped;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFound = yield this._model.findById(id).lean();
            if (userFound === null)
                return null;
            const userMapped = this.toDto(userFound);
            return userMapped;
        });
    }
    save(inputData) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToCreate = new this._model(inputData);
            const userCreated = yield userToCreate.save();
            const userMapped = this.toDto(userCreated.toObject());
            return userMapped;
        });
    }
    update(inputData) {
        return __awaiter(this, void 0, void 0, function* () {
            const userUpdated = yield this._model
                .findByIdAndUpdate(inputData.id, inputData, { new: true })
                .lean();
            const userMapped = this.toDto(userUpdated);
            return userMapped;
        });
    }
}
exports.default = MongoUserRepository;
