import { Company, User } from '../../domain'

export interface CompanyRepository {
  getAllByOwner: (owner: User['id']) => Promise<Company[]>
  getById: (id: Company['id']) => Promise<Company | null>
  getByName: (name: Company['name']) => Promise<Company | null>
  save: (inputData: Company) => Promise<Company>
  update: (inputData: Company) => Promise<Company>
  delete: (id: Company['id']) => Promise<void>
}
