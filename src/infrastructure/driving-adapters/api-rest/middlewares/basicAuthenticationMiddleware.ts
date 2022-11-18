import { Request, Response, NextFunction } from 'express'
import CheckBasicAuthenticationUseCase from '../../../../application/use-cases/auth/CheckBasicAuthenticationUseCase'
import MongoAuthRepository from '../../../implementations/mongo/MongoAuthRepository'
import MongoUserRepository from '../../../implementations/mongo/MongoUserRepository'


export default async function basicAuthenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoUserRepository = new MongoUserRepository()
  const mongoAuthRepository = new MongoAuthRepository()
  const checkBasicAuthenticationUseCase = new CheckBasicAuthenticationUseCase(
    mongoAuthRepository,
    mongoUserRepository
  )

  try {
    const authHeader = req.header('Authorization')
    const accessToken = authHeader?.replace('Bearer ', '')

    const userIdFromAccessToken = await checkBasicAuthenticationUseCase.run(accessToken)

    req.tenantId = userIdFromAccessToken

    return next()
  } catch (e) {
    return next(e)
  }
}
