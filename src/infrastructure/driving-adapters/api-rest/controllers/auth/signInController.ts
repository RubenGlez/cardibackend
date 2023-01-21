import { NextFunction, Request, Response } from 'express'
import SignInUseCase from '../../../../../application/use-cases/auth/SignInUseCase'
import MongoAuthRepository from '../../../../implementations/mongo/MongoAuthRepository'
import MongoUserRepository from '../../../../implementations/mongo/MongoUserRepository'

export default async function signInController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoUserRepository = new MongoUserRepository()
  const mongoAuthRepository = new MongoAuthRepository()
  
  const signInUseCase = new SignInUseCase({
    authRepository: mongoAuthRepository,
    userRepository: mongoUserRepository
  })

  const { body } = req

  try {
    const authData = await signInUseCase.run(body)
    res.json(authData)
  } catch (e) {
    next(e)
  }
}
