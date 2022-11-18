import { NextFunction, Request, Response } from 'express'
import DeleteCompanyUseCase from '../../../../../application/use-cases/company/DeleteCompanyUseCase'
import MongoCompanyRepository from '../../../../implementations/mongo/MongoCompanyRepository'


export default async function deleteCompanyController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoCompanyRepository = new MongoCompanyRepository()
  const deleteCompanyUseCase = new DeleteCompanyUseCase(mongoCompanyRepository)

  try {
    const { params, tenantId } = req
    const { companyId } = params
    const company = await deleteCompanyUseCase.run(companyId, tenantId)
    res.json(company)
  } catch (e) {
    next(e)
  }
}
