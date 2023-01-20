import { Company } from '../../../domain/entities/Company'
import { CompanyRepository } from '../../../domain/repositories/CompanyRepository'
import { MetricsRepository } from '../../../domain/repositories/MetricsRepository'

export interface GetMetricsUseCaseDependencies {
  companyRepository: CompanyRepository
  metricsRepository: MetricsRepository
}

export interface GetMetricsUseCaseProps {
  tenantId: Company['owner']
  companyId: Company['id']
}
