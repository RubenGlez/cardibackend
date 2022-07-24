import { NextFunction, Request, Response } from 'express'
import { MongoCompanyRepository } from '../../../../../infrastructure'
import { DeleteCompanyUseCase } from '../../../../../application'

export default async function deleteCompanyController (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoCompanyRepository = new MongoCompanyRepository()
  const deleteCompanyUseCase = new DeleteCompanyUseCase(mongoCompanyRepository)

  try {
    const { params, tenantId } = req
    const { companyId } = params
    const company = await deleteCompanyUseCase.run({ ...req.body, id: companyId }, tenantId)
    res.json(company)
  } catch (e) {
    next(e)
  }
}
