import { Company } from "../../../domain/entities/Company"
import { Subscription } from "../../../domain/entities/Subscription"
import { User } from "../../../domain/entities/User"
import { OutputError } from "../../../domain/exceptions/OutputError"
import { OutputErrorTypes } from "../../../domain/exceptions/OutputErrorTypes"
import { CompanyRepository } from "../../../domain/repositories/CompanyRepository"
import { SubscriptionRepository } from "../../../domain/repositories/SubscriptionRepository"

export default class GetSubscriptionsUseCase {
  private readonly _subscriptionRepository: SubscriptionRepository
  private readonly _companyRepository: CompanyRepository

  constructor(
    subscriptionRepository: SubscriptionRepository,
    companyRepository: CompanyRepository
  ) {
    this._subscriptionRepository = subscriptionRepository
    this._companyRepository = companyRepository
  }

  async run(
    tenantId: User['id'],
    companyId: Company['id'],
  ): Promise<Subscription[]> {
    const company = await this._companyRepository.getById(companyId)
    if (company == null) {
      throw new OutputError(OutputErrorTypes.CompanyNotFound)
    }

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
