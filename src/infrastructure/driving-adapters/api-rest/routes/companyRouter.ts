import express, { Router } from 'express'
import createCompanyController from '../controllers/company/createCompanyController.business'
import deleteCompanyController from '../controllers/company/deleteCompanyController.business'
import getCompaniesController from '../controllers/company/getCompaniesController.business'
import getCompanyController from '../controllers/company/getCompanyController.business'
import updateCompanyController from '../controllers/company/updateCompanyController.business'

const router: Router = express.Router()

router.get('/', getCompaniesController)
router.post('/', createCompanyController)
router.put('/:companyId', updateCompanyController)
router.get('/:companyId', getCompanyController)
router.delete('/:companyId', deleteCompanyController)

export default router
