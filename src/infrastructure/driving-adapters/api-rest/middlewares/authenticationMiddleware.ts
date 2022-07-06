import { Request, Response, NextFunction } from 'express'
import {
  MongoUserRepository,
  MongoAuthRepository
} from '../../../../infrastructure'
import { CheckAuthenticationUseCase } from '../../../../application'

export default async function authenticationMiddleware (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoUserRepository = new MongoUserRepository()
  const mongoAuthRepository = new MongoAuthRepository()
  const checkAuthenticationUseCase = new CheckAuthenticationUseCase(
    mongoAuthRepository,
    mongoUserRepository
  )

  try {
    const authHeader = req.header('Authorization')
    const accessToken = authHeader?.replace('Bearer ', '')

    const userIdFromAccessToken = await checkAuthenticationUseCase.run(accessToken)

    req.tenantId = userIdFromAccessToken

    return next()
  } catch (e) {
    return next(e)
  }
}
