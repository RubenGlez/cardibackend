import { NextFunction, Request, Response } from 'express'
import CreateCompanyUseCase from '../../../../../application/use-cases/company/CreateCompanyUseCase.business'
import MongoCompanyRepository from '../../../../implementations/mongo/MongoCompanyRepository'

export default async function createCompanyController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoCompanyRepository = new MongoCompanyRepository()
  const createCompanyUseCase = new CreateCompanyUseCase({
    companyRepository: mongoCompanyRepository
  })

  try {
    const { tenantId = '', body } = req
    const company = await createCompanyUseCase.run({ tenantId, ...body })
    res.json(company)
  } catch (e) {
    next(e)
  }
}
