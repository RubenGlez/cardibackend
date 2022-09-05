import { NextFunction, Request, Response } from 'express'
import { MongoCompanyRepository } from '../../../../../infrastructure'
import { GetCompaniesUseCase } from '../../../../../application'

export default async function getCompaniesController (
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
