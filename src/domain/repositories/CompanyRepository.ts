import { Company } from '../entities/Company'

export type CompanyRepositorySaveProps = Pick<
  Company,
  'owner' | 'name' | 'description' | 'contact'
>

export interface CompanyRepository {
  getAllByOwner: (owner: Company['owner']) => Promise<Company[]>
  getById: (id: Company['id']) => Promise<Company | null>
  getByName: (name: Company['name']) => Promise<Company | null>
  save: (props: CompanyRepositorySaveProps) => Promise<Company>
  update: (inputData: Company) => Promise<Company>
  delete: (id: Company['id']) => Promise<void>
}
