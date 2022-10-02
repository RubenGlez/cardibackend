import { NextFunction, Request, Response } from 'express'
import { MongoPreferencesRepository } from '../../../..'
import { UpdatePreferencesUseCase } from '../../../../../application'

export default async function updatePreferencesController (
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
