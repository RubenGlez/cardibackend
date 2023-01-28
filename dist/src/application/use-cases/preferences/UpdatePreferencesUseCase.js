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
const GetPreferencesByUserService_1 = __importDefault(require("../../../domain/services/preferences/GetPreferencesByUserService"));
class UpdatePreferencesUseCase {
    constructor({ preferencesRepository }) {
        this._preferencesRepository = preferencesRepository;
        this._getPreferencesByUserService = new GetPreferencesByUserService_1.default({
            preferencesRepository
        });
    }
    run({ tenantId, preferencesId, themeSelected, companySelected, languageSelected }) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentPreferences = yield this._getPreferencesByUserService.run({
                tenantId
            });
            if (currentPreferences.id !== preferencesId) {
                throw new OutputError_1.OutputError(OutputErrorTypes_1.OutputErrorTypes.NotOwned);
            }
            const preferencesToUpdate = Object.assign(Object.assign({}, currentPreferences), { themeSelected: themeSelected !== null && themeSelected !== void 0 ? themeSelected : currentPreferences.themeSelected, companySelected: companySelected !== null && companySelected !== void 0 ? companySelected : currentPreferences.companySelected, languageSelected: languageSelected !== null && languageSelected !== void 0 ? languageSelected : currentPreferences.languageSelected });
            const preferencesUpdated = yield this._preferencesRepository.update(preferencesToUpdate);
            return preferencesUpdated;
        });
    }
}
exports.default = UpdatePreferencesUseCase;
