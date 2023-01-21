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
const GetWalletByOwnerService_1 = __importDefault(require("../../../domain/services/wallet/GetWalletByOwnerService"));
class UpdateWalletUseCase {
    constructor({ walletRepository }) {
        this._walletRepository = walletRepository;
        this._getWalletByIdService = new GetWalletByOwnerService_1.default({ walletRepository });
    }
    run({ tenantId, id, cards }) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentWallet = yield this._getWalletByIdService.run({ owner: id });
            if ((currentWallet === null || currentWallet === void 0 ? void 0 : currentWallet.owner) !== tenantId) {
                throw new OutputError_1.OutputError(OutputErrorTypes_1.OutputErrorTypes.NotOwned);
            }
            const walletToUpdate = Object.assign(Object.assign({}, currentWallet), { cards: cards !== null && cards !== void 0 ? cards : currentWallet.cards });
            const walletUpdated = yield this._walletRepository.update(walletToUpdate);
            return walletUpdated;
        });
    }
}
exports.default = UpdateWalletUseCase;
