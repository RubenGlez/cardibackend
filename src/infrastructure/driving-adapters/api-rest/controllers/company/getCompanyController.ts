import { NextFunction, Request, Response } from 'express'
import { MongoCompanyRepository } from '../../../../../infrastructure'
import { GetCompanyUseCase } from '../../../../../application'

export default async function getCompanyController (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoCompanyRepository = new MongoCompanyRepository()
  const getCompanyUseCase = new GetCompanyUseCase(mongoCompanyRepository)

  try {
    const { companyId } = req.params
    const companys = await getCompanyUseCase.run(companyId)
    res.json(companys)
  } catch (e) {
    next(e)
  }
}
