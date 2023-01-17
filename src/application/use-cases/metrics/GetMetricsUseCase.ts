import { Company } from '../../../domain/entities/Company'
import { Metrics } from '../../../domain/entities/Metrics'
import { User } from '../../../domain/entities/User'
import { OutputError } from '../../../domain/exceptions/OutputError'
import { OutputErrorTypes } from '../../../domain/exceptions/OutputErrorTypes'
import { CompanyRepository } from '../../../domain/repositories/CompanyRepository'
import { MetricsRepository } from '../../../domain/repositories/MetricsRepository'
import GetCompanyByIdService from '../../../domain/services/company/GetCompanyByIdService'

export default class GetMetricsUseCase {
  private readonly _metricsRepository: MetricsRepository
  private readonly _getCompanyByIdService: GetCompanyByIdService

  constructor(
    companyRepository: CompanyRepository,
    metricsRepository: MetricsRepository
  ) {
    this._metricsRepository = metricsRepository
    this._getCompanyByIdService = new GetCompanyByIdService(companyRepository)
  }

  async run(tenantId: User['id'], companyId: Company['id']): Promise<Metrics> {
    const company = await this._getCompanyByIdService.run(companyId)

    const isCompanyOwnedByTenant = company.owner === tenantId
    if (!isCompanyOwnedByTenant) {
      throw new OutputError(OutputErrorTypes.NotOwned)
    }

    const promotionMetrics =
      await this._metricsRepository.getPromotionMetricsByCompany(
        company.id ?? ''
      )

    return promotionMetrics
  }
}
