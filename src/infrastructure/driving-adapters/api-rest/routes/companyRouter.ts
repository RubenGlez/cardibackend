import express, { Router } from 'express'
import {
  createCompanyController,
  deleteCompanyController,
  getCompaniesController,
  getCompanyController,
  updateCompanyController,
} from '../controllers'

const router: Router = express.Router()

router.get('/', getCompaniesController)
router.post('/', createCompanyController)
router.put('/:companyId', updateCompanyController)
router.get('/:companyId', getCompanyController)
router.delete('/:companyId', deleteCompanyController)

export default router
