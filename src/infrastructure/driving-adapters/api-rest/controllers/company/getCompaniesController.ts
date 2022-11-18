import { NextFunction, Request, Response } from 'express'
import GetCompaniesUseCase from '../../../../../application/use-cases/company/GetCompaniesUseCase'
import MongoCompanyRepository from '../../../../implementations/mongo/MongoCompanyRepository'

export default async function getCompaniesController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoCompanyRepository = new MongoCompanyRepository()
  const getCompaniesUseCase = new GetCompaniesUseCase(mongoCompanyRepository)

  try {
    const { tenantId } = req
    const companies = await getCompaniesUseCase.run(tenantId)
    res.json(companies)

  } catch (e) {
    next(e)
  }
}
