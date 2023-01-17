import { NextFunction, Request, Response } from 'express'
import GetMetricsUseCase from '../../../../../application/use-cases/metrics/GetMetricsUseCase'
import MongoCompanyRepository from '../../../../implementations/mongo/MongoCompanyRepository'
import MongoMetricsRepository from '../../../../implementations/mongo/MongoMetricsRepository'

export default async function getMetricsController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoCompanyRepository = new MongoCompanyRepository()
  const mongoMetricsRepository = new MongoMetricsRepository()
  const getMetricsUseCase = new GetMetricsUseCase(
    mongoCompanyRepository,
    mongoMetricsRepository
  )

  try {
    const { tenantId, query } = req
    const { companyId } = query

    const metrics = await getMetricsUseCase.run(tenantId, companyId?.toString())
    res.json(metrics)
  } catch (e) {
    next(e)
  }
}
