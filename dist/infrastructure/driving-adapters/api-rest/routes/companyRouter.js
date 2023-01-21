"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createCompanyController_1 = __importDefault(require("../controllers/company/createCompanyController"));
const deleteCompanyController_1 = __importDefault(require("../controllers/company/deleteCompanyController"));
const getCompaniesController_1 = __importDefault(require("../controllers/company/getCompaniesController"));
const getCompanyController_1 = __importDefault(require("../controllers/company/getCompanyController"));
const updateCompanyController_1 = __importDefault(require("../controllers/company/updateCompanyController"));
const router = express_1.default.Router();
router.get('/', getCompaniesController_1.default);
router.post('/', createCompanyController_1.default);
router.put('/:companyId', updateCompanyController_1.default);
router.get('/:companyId', getCompanyController_1.default);
router.delete('/:companyId', deleteCompanyController_1.default);
exports.default = router;
