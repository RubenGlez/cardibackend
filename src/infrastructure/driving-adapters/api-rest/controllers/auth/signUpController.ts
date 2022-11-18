import { NextFunction, Request, Response } from 'express'
import SignUpUseCase from '../../../../../application/use-cases/auth/SignUpUseCase'
import MongoAuthRepository from '../../../../implementations/mongo/MongoAuthRepository'
import MongoPreferencesRepository from '../../../../implementations/mongo/MongoPreferencesRepository'
import MongoUserRepository from '../../../../implementations/mongo/MongoUserRepository'


export default async function signUpController(
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
