import { NextFunction, Request, Response } from 'express'
import { MongoCompanyRepository } from '../../../../../infrastructure'
import { UpdateCompanyUseCase } from '../../../../../application'

export default async function updateCompanyController (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoCompanyRepository = new MongoCompanyRepository()
  const updateCompanyUseCase = new UpdateCompanyUseCase(mongoCompanyRepository)

  try {
    const { params, tenantId } = req
    const { companyId } = params
    const company = await updateCompanyUseCase.run({ ...req.body, id: companyId }, tenantId)
    res.json(company)
  } catch (e) {
    next(e)
  }
}
