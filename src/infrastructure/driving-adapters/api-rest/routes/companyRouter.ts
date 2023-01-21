import express, { Router } from 'express'
import createCompanyController from '../controllers/company/createCompanyController'
import deleteCompanyController from '../controllers/company/deleteCompanyController'
import getCompaniesController from '../controllers/company/getCompaniesController'
import getCompanyController from '../controllers/company/getCompanyController'
import updateCompanyController from '../controllers/company/updateCompanyController'

const router: Router = express.Router()

router.get('/', getCompaniesController)
router.post('/', createCompanyController)
router.put('/:companyId', updateCompanyController)
router.get('/:companyId', getCompanyController)
router.delete('/:companyId', deleteCompanyController)

export default router
