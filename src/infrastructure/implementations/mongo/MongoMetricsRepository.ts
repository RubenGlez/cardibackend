import { Company } from '../../../domain/entities/Company'
import { Metrics } from '../../../domain/entities/Metrics'
import { MetricsRepository } from '../../../domain/repositories/MetricsRepository'
import SubscriptionModel from '../../driven-adapters/mongoose/models/SubscriptionModel'

export default class MongoMetricsRepository implements MetricsRepository {
  private readonly _subscriptionModel = SubscriptionModel

  async getPromotionMetricsByCompany(company: Company['id']): Promise<Metrics> {
    const unexpiredMostFollowedPromotions =
      await this._subscriptionModel.aggregate([
        // subs filtered by company and in progress
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ['$company', { $toObjectId: company }] },
                { $eq: ['$status', 'inProgress'] }
              ]
            }
          }
        },
        // grouped by promotion id
        {
          $group: {
            _id: '$promotion',
            subsCounter: { $count: {} }
          }
        },
        // populate promotions
        {
          $lookup: {
            from: 'promotions',
            localField: '_id',
            foreignField: '_id',
            as: 'promotion_doc'
          }
        },
        // replace root with promotions array
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ['$promotion_doc', 0] }, '$$ROOT']
            }
          }
        },
        // clear unneccessary fields
        {
          $project: {
            promotion_doc: 0,
            __v: 0
          }
        },
        // filter by unexpired promotions
        {
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
        },
        // Sort by counter
        {
          $sort: {
            subsCounter: -1
          }
        }
      ])

    const unexpiredMostCompletedPromotions =
      await this._subscriptionModel.aggregate([
        // subs filtered by company and completed
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ['$company', { $toObjectId: company }] },
                { $eq: ['$status', 'completed'] }
              ]
            }
          }
        },
        // grouped by promotion id
        {
          $group: {
            _id: '$promotion',
            subsCounter: { $count: {} }
          }
        },
        // populate promotions
        {
          $lookup: {
            from: 'promotions',
            localField: '_id',
            foreignField: '_id',
            as: 'promotion_doc'
          }
        },
        // replace root with promotions array
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ['$promotion_doc', 0] }, '$$ROOT']
            }
          }
        },
        // clear unneccessary fields
        {
          $project: {
            promotion_doc: 0,
            __v: 0
          }
        },
        // filter by unexpired promotions
        {
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
        },
        // Sort by counter
        {
          $sort: {
            subsCounter: -1
          }
        }
      ])

    const expiredMostFollowedPromotions =
      await this._subscriptionModel.aggregate([
        // subs filtered by company and in progress
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ['$company', { $toObjectId: company }] },
                { $eq: ['$status', 'inProgress'] }
              ]
            }
          }
        },
        // grouped by promotion id
        {
          $group: {
            _id: '$promotion',
            subsCounter: { $count: {} }
          }
        },
        // populate promotions
        {
          $lookup: {
            from: 'promotions',
            localField: '_id',
            foreignField: '_id',
            as: 'promotion_doc'
          }
        },
        // replace root with promotions array
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ['$promotion_doc', 0] }, '$$ROOT']
            }
          }
        },
        // clear unneccessary fields
        {
          $project: {
            promotion_doc: 0,
            __v: 0
          }
        },
        // filter by unexpired promotions
        {
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
        },
        // Sort by counter
        {
          $sort: {
            subsCounter: -1
          }
        }
      ])

    const expiredMostCompletedPromotions =
      await this._subscriptionModel.aggregate([
        // subs filtered by company and in progress
        {
          $match: {
            $expr: {
              $and: [
                { $eq: ['$company', { $toObjectId: company }] },
                { $eq: ['$status', 'completed'] }
              ]
            }
          }
        },
        // grouped by promotion id
        {
          $group: {
            _id: '$promotion',
            subsCounter: { $count: {} }
          }
        },
        // populate promotions
        {
          $lookup: {
            from: 'promotions',
            localField: '_id',
            foreignField: '_id',
            as: 'promotion_doc'
          }
        },
        // replace root with promotions array
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ['$promotion_doc', 0] }, '$$ROOT']
            }
          }
        },
        // clear unneccessary fields
        {
          $project: {
            promotion_doc: 0,
            __v: 0
          }
        },
        // filter by unexpired promotions
        {
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
        },
        // Sort by counter
        {
          $sort: {
            subsCounter: -1
          }
        }
      ])

    const promotionMetrics = {
      expired: {
        mostFollowedPromotions: expiredMostFollowedPromotions,
        mostCompletedPromotions: expiredMostCompletedPromotions
      },
      unexpired: {
        mostFollowedPromotions: unexpiredMostFollowedPromotions,
        mostCompletedPromotions: unexpiredMostCompletedPromotions
      }
    }

    return promotionMetrics
  }
}
