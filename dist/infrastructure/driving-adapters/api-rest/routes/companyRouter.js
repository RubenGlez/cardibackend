"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createCompanyController_business_1 = __importDefault(require("../controllers/company/createCompanyController.business"));
const deleteCompanyController_business_1 = __importDefault(require("../controllers/company/deleteCompanyController.business"));
const getCompaniesController_business_1 = __importDefault(require("../controllers/company/getCompaniesController.business"));
const getCompanyController_business_1 = __importDefault(require("../controllers/company/getCompanyController.business"));
const updateCompanyController_business_1 = __importDefault(require("../controllers/company/updateCompanyController.business"));
const router = express_1.default.Router();
router.get('/', getCompaniesController_business_1.default);
router.post('/', createCompanyController_business_1.default);
router.put('/:companyId', updateCompanyController_business_1.default);
router.get('/:companyId', getCompanyController_business_1.default);
router.delete('/:companyId', deleteCompanyController_business_1.default);
exports.default = router;
