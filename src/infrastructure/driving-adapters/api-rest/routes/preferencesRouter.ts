import express, { Router } from 'express'
import {
  updatePreferencesController,
  getPreferencesController,
} from '../controllers'

const router: Router = express.Router()

router.put('/:preferencesId', updatePreferencesController)
router.get('/', getPreferencesController)
// router.delete('/:preferencesId', deletePreferencesController)

export default router
