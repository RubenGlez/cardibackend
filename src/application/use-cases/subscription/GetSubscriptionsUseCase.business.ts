import { Subscription } from '../../../domain/entities/Subscription'
import { OutputError } from '../../../domain/exceptions/OutputError'
import { OutputErrorTypes } from '../../../domain/exceptions/OutputErrorTypes'
import { SubscriptionRepository } from '../../../domain/repositories/SubscriptionRepository'
import GetCompanyByIdService from '../../../domain/services/company/GetCompanyByIdService'
import {
  GetSubscriptionsUseCaseDependencies,
  GetSubscriptionsUseCaseProps
} from './types.business'

export default class GetSubscriptionsUseCase {
  private readonly _subscriptionRepository: SubscriptionRepository
  private readonly _getCompanyByIdService: GetCompanyByIdService

  constructor({
    subscriptionRepository,
    companyRepository
  }: GetSubscriptionsUseCaseDependencies) {
    this._subscriptionRepository = subscriptionRepository
    this._getCompanyByIdService = new GetCompanyByIdService({
      companyRepository
    })
  }

  async run({
    tenantId,
    companyId
  }: GetSubscriptionsUseCaseProps): Promise<Subscription[]> {
    const company = await this._getCompanyByIdService.run({ companyId })

    const isCompanyOwnedByTenant = company.owner === tenantId
    if (!isCompanyOwnedByTenant) {
      throw new OutputError(OutputErrorTypes.NotOwned)
    }

    const subscriptions = await this._subscriptionRepository.getAllByCompany(
      company.id
    )
    return subscriptions
  }
}
