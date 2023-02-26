import { NextFunction, Request, Response } from 'express'
import SignUpUseCase from '../../../../../application/use-cases/auth/SignUpUseCase.common'
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

  const signUpUseCase = new SignUpUseCase({
    authRepository: mongoAuthRepository,
    userRepository: mongoUserRepository,
    preferencesRepository: mongoPreferencesRepository
  })

  const { body } = req

  try {
    const authData = await signUpUseCase.run(body)
    res.json(authData)
  } catch (e) {
    next(e)
  }
}
