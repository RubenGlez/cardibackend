import { Request, Response, NextFunction } from 'express'
import CheckAuthenticationUseCase from '../../../../application/use-cases/auth/CheckAuthenticationUseCase.business'
import MongoAuthRepository from '../../../implementations/mongo/MongoAuthRepository'
import MongoUserRepository from '../../../implementations/mongo/MongoUserRepository'

export default async function AuthenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoUserRepository = new MongoUserRepository()
  const mongoAuthRepository = new MongoAuthRepository()
  const checkAuthenticationUseCase =
    new CheckAuthenticationUseCase({
      authRepository: mongoAuthRepository,
      userRepository: mongoUserRepository
    })

  try {
    const authHeader = req.header('Authorization')
    const accessToken = authHeader?.replace('Bearer ', '')

    const userIdFromAccessToken = await checkAuthenticationUseCase.run({
      accessToken
    })

    req.tenantId = userIdFromAccessToken

    return next()
  } catch (e) {
    return next(e)
  }
}
