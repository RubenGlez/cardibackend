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
const SubscriptionModel_1 = __importDefault(require("../../driven-adapters/mongoose/models/SubscriptionModel"));
class MongoSubscriptionRepository {
    constructor() {
        this._model = SubscriptionModel_1.default;
    }
    toDto(subscriptionToMap) {
        var _a, _b, _c, _d, _e, _f;
        const subscriptionDTO = Object.assign({ id: (_a = subscriptionToMap._id) === null || _a === void 0 ? void 0 : _a.toString() }, subscriptionToMap);
        delete subscriptionDTO._id;
        delete subscriptionDTO.__v;
        subscriptionDTO.subscriptor = (_b = subscriptionDTO.subscriptor) === null || _b === void 0 ? void 0 : _b.toString();
        subscriptionDTO.owner = (_c = subscriptionDTO.owner) === null || _c === void 0 ? void 0 : _c.toString();
        subscriptionDTO.card = (_d = subscriptionDTO.card) === null || _d === void 0 ? void 0 : _d.toString();
        subscriptionDTO.promotion = (_e = subscriptionDTO.promotion) === null || _e === void 0 ? void 0 : _e.toString();
        subscriptionDTO.company = (_f = subscriptionDTO.company) === null || _f === void 0 ? void 0 : _f.toString();
        return subscriptionDTO;
    }
    getAllByCompany(company) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscriptionsByCompany = yield this._model.find({ company }).lean();
            if (subscriptionsByCompany.length === 0)
                return [];
            const subscriptionsByCompanyMapped = subscriptionsByCompany.map(subscription => this.toDto(subscription));
            return subscriptionsByCompanyMapped;
        });
    }
    getBySubscriptorAndPromotion(subscriptor, promotion) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscriptionsBySubscriptorAndPromotion = yield this._model
                .findOne({
                subscriptor,
                promotion
            })
                .lean();
            if (subscriptionsBySubscriptorAndPromotion === null)
                return null;
            const subscriptionsBySubscriptorAndPromotionMapped = this.toDto(subscriptionsBySubscriptorAndPromotion);
            return subscriptionsBySubscriptorAndPromotionMapped;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscriptionFound = yield this._model.findById(id).lean();
            if (subscriptionFound === null)
                return null;
            const subscriptionMapped = this.toDto(subscriptionFound);
            return subscriptionMapped;
        });
    }
    save(inputData) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscriptionToCreate = new this._model(inputData);
            const subscriptionCreated = yield subscriptionToCreate.save();
            const subscriptionMapped = this.toDto(subscriptionCreated.toObject());
            return subscriptionMapped;
        });
    }
    update(inputData) {
        return __awaiter(this, void 0, void 0, function* () {
            const subscriptionUpdated = yield this._model
                .findByIdAndUpdate(inputData.id, inputData, { returnDocument: 'after' })
                .lean();
            if (subscriptionUpdated === null)
                return null;
            const subscriptionMapped = this.toDto(subscriptionUpdated);
            return subscriptionMapped;
        });
    }
}
exports.default = MongoSubscriptionRepository;
