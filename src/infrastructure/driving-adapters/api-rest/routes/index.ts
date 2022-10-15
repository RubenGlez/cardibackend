import express, { Router } from 'express'
import { errorController, notFoundController } from '../controllers'
import versionOneRouter from './versionOneRouter'

const router: Router = express.Router()

router.use('/v1', versionOneRouter)

router.use(notFoundController)
router.use(errorController)

export default router
