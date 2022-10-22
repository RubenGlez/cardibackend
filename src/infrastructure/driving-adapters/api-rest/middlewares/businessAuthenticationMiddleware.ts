import { Request, Response, NextFunction } from 'express'
import {
  MongoUserRepository,
  MongoAuthRepository
} from '../../..'
import { CheckBusinessAuthenticationUseCase } from '../../../../application'

export default async function businessAuthenticationMiddleware (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const mongoUserRepository = new MongoUserRepository()
  const mongoAuthRepository = new MongoAuthRepository()
  const checkBusinessAuthenticationUseCase = new CheckBusinessAuthenticationUseCase(
    mongoAuthRepository,
    mongoUserRepository
  )

  try {
    const authHeader = req.header('Authorization')
    const accessToken = authHeader?.replace('Bearer ', '')

    const userIdFromAccessToken = await checkBusinessAuthenticationUseCase.run(accessToken)

    req.tenantId = userIdFromAccessToken

    return next()
  } catch (e) {
    return next(e)
  }
}
