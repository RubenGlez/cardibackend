import { NextFunction, Request, Response } from 'express'
import UpdatePreferencesUseCase from '../../../../../application/use-cases/preferences/UpdatePreferencesUseCase'
import MongoPreferencesRepository from '../../../../implementations/mongo/MongoPreferencesRepository'

export default async function updatePreferencesController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoPreferencesRepository = new MongoPreferencesRepository()
  const updatePreferencesUseCase = new UpdatePreferencesUseCase(mongoPreferencesRepository)

  try {
    const { params, tenantId } = req
    const { preferencesId } = params
    const preferences = await updatePreferencesUseCase.run({ ...req.body, id: preferencesId }, tenantId)
    res.json(preferences)
  } catch (e) {
    next(e)
  }
}
