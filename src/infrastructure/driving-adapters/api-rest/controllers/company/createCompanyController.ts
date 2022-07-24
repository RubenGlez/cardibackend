import { NextFunction, Request, Response } from 'express'
import { MongoCompanyRepository, MongoUserRepository } from '../../../../../infrastructure'
import { CreateCompanyUseCase } from '../../../../../application'

export default async function createCompanyController (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoCompanyRepository = new MongoCompanyRepository()
  const mongoUserRepository = new MongoUserRepository()
  const createCompanyUseCase = new CreateCompanyUseCase(
    mongoCompanyRepository,
    mongoUserRepository
  )

  try {
    const { tenantId } = req
    const company = await createCompanyUseCase.run(req.body, tenantId)
    res.json(company)
  } catch (e) {
    next(e)
  }
}
