import { NextFunction, Request, Response } from 'express'
import GetCompanyUseCase from '../../../../../application/use-cases/company/GetCompanyUseCase'
import MongoCompanyRepository from '../../../../implementations/mongo/MongoCompanyRepository'

export default async function getCompanyController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoCompanyRepository = new MongoCompanyRepository()
  const getCompanyUseCase = new GetCompanyUseCase({
    companyRepository: mongoCompanyRepository
  })

  try {
    const { companyId } = req.params
    const companys = await getCompanyUseCase.run({ companyId })
    res.json(companys)
  } catch (e) {
    next(e)
  }
}
