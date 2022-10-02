import { NextFunction, Request, Response } from 'express'
import {
  MongoUserRepository,
  MongoAuthRepository,
  MongoPreferencesRepository
} from '../../../../../infrastructure'
import { SignUpUseCase } from '../../../../../application'

export default async function signUpController (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoUserRepository = new MongoUserRepository()
  const mongoAuthRepository = new MongoAuthRepository()
  const mongoPreferencesRepository = new MongoPreferencesRepository()
  const signUpUseCase = new SignUpUseCase(mongoAuthRepository, mongoUserRepository, mongoPreferencesRepository)

  try {
    const authData = await signUpUseCase.run(req.body)
    res.json(authData)
  } catch (e) {
    next(e)
  }
}
