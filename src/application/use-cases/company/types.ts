import { Company } from '../../../domain/entities/Company'
import { CompanyRepository } from '../../../domain/repositories/CompanyRepository'

type CompanyToCreate = Pick<Company, 'name' | 'description' | 'contact'>
type CompanyToUpdate = Pick<Company, 'id' | 'name' | 'description' | 'contact'>

export interface CreateCompanyUseCaseDependencies {
  companyRepository: CompanyRepository
}

export interface CreateCompanyUseCaseProps extends CompanyToCreate {
  tenantId: Company['owner']
}

export interface DeleteCompanyUseCaseDependencies {
  companyRepository: CompanyRepository
}

export interface DeleteCompanyUseCaseProps {
  tenantId: Company['owner']
  companyId: Company['id']
}

export interface GetCompaniesUseCaseDependencies {
  companyRepository: CompanyRepository
}

export interface GetCompaniesUseCaseProps {
  tenantId: Company['owner']
}

export interface GetCompanyUseCaseDependencies {
  companyRepository: CompanyRepository
}

export interface GetCompanyUseCaseProps {
  companyId: Company['id']
}

export interface UpdateCompanyUseCaseDependencies {
  companyRepository: CompanyRepository
}

export interface UpdateCompanyUseCaseProps extends CompanyToUpdate {
  tenantId: Company['owner']
  companyId: Company['id']
}
