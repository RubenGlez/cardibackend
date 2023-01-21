import { NextFunction, Request, Response } from 'express'
import UpdateCompanyUseCase from '../../../../../application/use-cases/company/UpdateCompanyUseCase'
import MongoCompanyRepository from '../../../../implementations/mongo/MongoCompanyRepository'

export default async function updateCompanyController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoCompanyRepository = new MongoCompanyRepository()
  const updateCompanyUseCase = new UpdateCompanyUseCase({
    companyRepository: mongoCompanyRepository
  })

  try {
    const { params, tenantId = '', body } = req
    const { companyId } = params
    const company = await updateCompanyUseCase.run({
      tenantId,
      companyId,
      ...body,
    })
    res.json(company)
  } catch (e) {
    next(e)
  }
}
