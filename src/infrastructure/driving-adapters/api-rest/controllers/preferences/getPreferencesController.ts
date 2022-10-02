import { NextFunction, Request, Response } from 'express'
import { MongoPreferencesRepository } from '../../../..'
import { GetPreferencesUseCase } from '../../../../../application'

export default async function getPreferencesController (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoPreferencesRepository = new MongoPreferencesRepository()
  const getPreferencesUseCase = new GetPreferencesUseCase(mongoPreferencesRepository)

  try {
    const { userId } = req.query
    const preferencess = await getPreferencesUseCase.run(userId?.toString())
    res.json(preferencess)
  } catch (e) {
    next(e)
  }
}
