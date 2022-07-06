import express, { Router } from 'express'
import { createCompanyController } from '../controllers'

const router: Router = express.Router()

router.post('/', createCompanyController)
router.put('/:companyId', () => {})
router.get('/:companyId', () => {})
router.delete('/:companyId', () => {})

export default router
