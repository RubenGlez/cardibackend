import { NextFunction, Request, Response } from 'express'
import { SignInUseCase } from '../../../../../application/use-cases/auth'
import MongoAuthRepository from '../../../../implementations/mongo/MongoAuthRepository'
import MongoUserRepository from '../../../../implementations/mongo/MongoUserRepository'


export default async function signInController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoUserRepository = new MongoUserRepository()
  const mongoAuthRepository = new MongoAuthRepository()
  const signInUseCase = new SignInUseCase(mongoAuthRepository, mongoUserRepository)

  try {
    const authData = await signInUseCase.run(req.body)
    res.json(authData)
  } catch (e) {
    next(e)
  }
}
