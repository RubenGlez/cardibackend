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
class MongoMetricsRepository {
    constructor() {
        this._subscriptionModel = SubscriptionModel_1.default;
    }
    getPromotionMetricsByCompany(company) {
        return __awaiter(this, void 0, void 0, function* () {
            const filterByCompanyAndInProgress = {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: ['$company', { $toObjectId: company }] },
                            { $eq: ['$status', 'inProgress'] }
                        ]
                    }
                }
            };
            const filterByCompanyAndCompleted = {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: ['$company', { $toObjectId: company }] },
                            { $eq: ['$status', 'completed'] }
                        ]
                    }
                }
            };
            const groupedByPromotionId = {
                $group: {
                    _id: '$promotion',
                    subsCounter: { $count: {} }
                }
            };
            const populatePromotions = {
                $lookup: {
                    from: 'promotions',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'promotion_doc'
                }
            };
            const replaceRootWithPromotions = {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [{ $arrayElemAt: ['$promotion_doc', 0] }, '$$ROOT']
                    }
                }
            };
            const clearDocuments = {
                $project: {
                    promotion_doc: 0,
                    __v: 0
                }
            };
            const filterByUnexpired = {
                $match: {
                    $expr: {
                        $and: [
                            {
                                $lt: ['$validFrom', '$$NOW']
                            },
                            {
                                $gt: ['$validTo', '$$NOW']
                            }
                        ]
                    }
                }
            };
            const filterByExpired = {
                $match: {
                    $expr: {
                        $or: [
                            {
                                $gt: ['$validFrom', '$$NOW']
                            },
                            {
                                $lt: ['$validTo', '$$NOW']
                            }
                        ]
                    }
                }
            };
            const sortByCounter = {
                $sort: {
                    subsCounter: -1
                }
            };
            const limitResults = {
                $limit: 5
            };
            // TODO: refactor these four queries into a single one
            const unexpiredMostFollowedPromotions = yield this._subscriptionModel.aggregate([
                filterByCompanyAndInProgress,
                groupedByPromotionId,
                populatePromotions,
                replaceRootWithPromotions,
                clearDocuments,
                filterByUnexpired,
                sortByCounter,
                limitResults
            ]);
            const unexpiredMostCompletedPromotions = yield this._subscriptionModel.aggregate([
                filterByCompanyAndCompleted,
                groupedByPromotionId,
                populatePromotions,
                replaceRootWithPromotions,
                clearDocuments,
                filterByUnexpired,
                sortByCounter
            ]);
            const expiredMostFollowedPromotions = yield this._subscriptionModel.aggregate([
                filterByCompanyAndInProgress,
                groupedByPromotionId,
                populatePromotions,
                replaceRootWithPromotions,
                clearDocuments,
                filterByExpired,
                sortByCounter
            ]);
            const expiredMostCompletedPromotions = yield this._subscriptionModel.aggregate([
                filterByCompanyAndCompleted,
                groupedByPromotionId,
                populatePromotions,
                replaceRootWithPromotions,
                clearDocuments,
                filterByExpired,
                sortByCounter
            ]);
            const promotionMetrics = {
                expired: {
                    mostFollowedPromotions: expiredMostFollowedPromotions,
                    mostCompletedPromotions: expiredMostCompletedPromotions
                },
                unexpired: {
                    mostFollowedPromotions: unexpiredMostFollowedPromotions,
                    mostCompletedPromotions: unexpiredMostCompletedPromotions
                }
            };
            return promotionMetrics;
        });
    }
}
exports.default = MongoMetricsRepository;
