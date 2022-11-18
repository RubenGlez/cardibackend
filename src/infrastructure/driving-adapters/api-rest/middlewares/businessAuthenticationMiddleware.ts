import { Request, Response, NextFunction } from 'express'
import CheckBusinessAuthenticationUseCase from '../../../../application/use-cases/auth/CheckBusinessAuthenticationUseCase'
import MongoAuthRepository from '../../../implementations/mongo/MongoAuthRepository'
import MongoUserRepository from '../../../implementations/mongo/MongoUserRepository'


export default async function businessAuthenticationMiddleware(
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
