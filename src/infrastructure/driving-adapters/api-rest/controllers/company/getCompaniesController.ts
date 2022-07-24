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
    const companys = await getCompaniesUseCase.run()
    res.json(companys)
  } catch (e) {
    next(e)
  }
}
