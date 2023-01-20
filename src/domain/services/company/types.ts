import { Company } from '../../entities/Company'
import { CompanyRepository } from '../../repositories/CompanyRepository'

export interface ExistCompanyByNameServiceDependencies {
  companyRepository: CompanyRepository
}

export interface ExistCompanyByNameServiceProps {
  companyName: Company['name']
}

export interface GetCompanyByIdServiceDependencies {
  companyRepository: CompanyRepository
}

export interface GetCompanyByIdServiceProps {
  id: Company['id']
}
