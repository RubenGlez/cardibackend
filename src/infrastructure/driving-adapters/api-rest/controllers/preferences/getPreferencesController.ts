import { NextFunction, Request, Response } from 'express'
import GetPreferencesUseCase from '../../../../../application/use-cases/preferences/GetPreferencesUseCase'
import MongoPreferencesRepository from '../../../../implementations/mongo/MongoPreferencesRepository'

export default async function getPreferencesController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoPreferencesRepository = new MongoPreferencesRepository()
  const getPreferencesUseCase = new GetPreferencesUseCase({
    preferencesRepository: mongoPreferencesRepository
  })

  try {
    const { tenantId = '' } = req
    const preferencess = await getPreferencesUseCase.run({ tenantId })
    res.json(preferencess)
  } catch (e) {
    next(e)
  }
}
