import express, { Router } from 'express'
import getPreferencesController from '../controllers/preferences/getPreferencesController.common'
import updatePreferencesController from '../controllers/preferences/updatePreferencesController.common'

const router: Router = express.Router()

router.get('/', getPreferencesController)
router.put('/:preferencesId', updatePreferencesController)

export default router
