import { PipelineStage } from 'mongoose'
import { Company } from '../../../domain/entities/Company'
import { Metrics } from '../../../domain/entities/Metrics'
import { MetricsRepository } from '../../../domain/repositories/MetricsRepository'
import SubscriptionModel from '../../driven-adapters/mongoose/models/SubscriptionModel'

export default class MongoMetricsRepository implements MetricsRepository {
  private readonly _subscriptionModel = SubscriptionModel

  async getPromotionMetricsByCompany(company: Company['id']): Promise<Metrics> {
    const filterByCompanyAndInProgress: PipelineStage = {
      $match: {
        $expr: {
          $and: [
            { $eq: ['$company', { $toObjectId: company }] },
            { $eq: ['$status', 'inProgress'] }
          ]
        }
      }
    }
    const filterByCompanyAndCompleted: PipelineStage = {
      $match: {
        $expr: {
          $and: [
            { $eq: ['$company', { $toObjectId: company }] },
            { $eq: ['$status', 'completed'] }
          ]
        }
      }
    }
    const groupedByPromotionId: PipelineStage = {
      $group: {
        _id: '$promotion',
        subsCounter: { $count: {} }
      }
    }
    const populatePromotions: PipelineStage = {
      $lookup: {
        from: 'promotions',
        localField: '_id',
        foreignField: '_id',
        as: 'promotion_doc'
      }
    }
    const replaceRootWithPromotions: PipelineStage = {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{ $arrayElemAt: ['$promotion_doc', 0] }, '$$ROOT']
        }
      }
    }
    const clearDocuments: PipelineStage = {
      $project: {
        promotion_doc: 0,
        __v: 0
      }
    }
    const filterByUnexpired: PipelineStage = {
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
    }
    const filterByExpired: PipelineStage = {
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
    }
    const sortByCounter: PipelineStage = {
      $sort: {
        subsCounter: -1
      }
    }

    // TODO: refactor these four queries into a single one
    const unexpiredMostFollowedPromotions =
      await this._subscriptionModel.aggregate([
        { ...filterByCompanyAndInProgress },
        { ...groupedByPromotionId },
        { ...populatePromotions },
        { ...replaceRootWithPromotions },
        { ...clearDocuments },
        { ...filterByUnexpired },
        { ...sortByCounter }
      ])

    const unexpiredMostCompletedPromotions =
      await this._subscriptionModel.aggregate([
        filterByCompanyAndCompleted,
        groupedByPromotionId,
        populatePromotions,
        replaceRootWithPromotions,
        clearDocuments,
        filterByUnexpired,
        sortByCounter
      ])

    const expiredMostFollowedPromotions =
      await this._subscriptionModel.aggregate([
        filterByCompanyAndInProgress,
        groupedByPromotionId,
        populatePromotions,
        replaceRootWithPromotions,
        clearDocuments,
        filterByExpired,
        sortByCounter
      ])

    const expiredMostCompletedPromotions =
      await this._subscriptionModel.aggregate([
        filterByCompanyAndCompleted,
        groupedByPromotionId,
        populatePromotions,
        replaceRootWithPromotions,
        clearDocuments,
        filterByExpired,
        sortByCounter
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
