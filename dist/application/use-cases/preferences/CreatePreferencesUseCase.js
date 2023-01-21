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
class CreatePreferencesUseCase {
    constructor(preferencesRepository) {
        this._preferencesRepository = preferencesRepository;
        this._existPreferencesByUserService = new domain_1.ExistPreferencesByUserService(preferencesRepository);
    }
    run(inputData, tenantId) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const existPreferences = yield this._existPreferencesByUserService.run(tenantId);
            if (existPreferences)
                throw new domain_1.CardiError(domain_1.CardiErrorTypes.PreferencesAlreadyExist);
            const preferencesToCreate = {
                user: tenantId,
                companySelected: (_a = inputData.companySelected) !== null && _a !== void 0 ? _a : '',
                themeSelected: (_b = inputData.themeSelected) !== null && _b !== void 0 ? _b : ''
            };
            const preferencesCreated = yield this._preferencesRepository.save(preferencesToCreate);
            return preferencesCreated;
        });
    }
}
exports.default = CreatePreferencesUseCase;
