import { Metrics } from '../../../domain/entities/Metrics'
import { OutputError } from '../../../domain/exceptions/OutputError'
import { OutputErrorTypes } from '../../../domain/exceptions/OutputErrorTypes'
import { MetricsRepository } from '../../../domain/repositories/MetricsRepository'
import GetCompanyByIdService from '../../../domain/services/company/GetCompanyByIdService'
import { GetMetricsUseCaseDependencies, GetMetricsUseCaseProps } from './types'

export default class GetMetricsUseCase {
  private readonly _metricsRepository: MetricsRepository
  private readonly _getCompanyByIdService: GetCompanyByIdService

  constructor({
    companyRepository,
    metricsRepository
  }: GetMetricsUseCaseDependencies) {
    this._metricsRepository = metricsRepository
    this._getCompanyByIdService = new GetCompanyByIdService({
      companyRepository
    })
  }

  async run({ tenantId, companyId }: GetMetricsUseCaseProps): Promise<Metrics> {
    const company = await this._getCompanyByIdService.run({ id: companyId })

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
