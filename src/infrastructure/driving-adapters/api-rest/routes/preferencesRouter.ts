import express, { Router } from 'express'
import getPreferencesController from '../controllers/preferences/getPreferencesController'
import updatePreferencesController from '../controllers/preferences/updatePreferencesController'


const router: Router = express.Router()

router.put('/:preferencesId', updatePreferencesController)
router.get('/', getPreferencesController)

export default router
