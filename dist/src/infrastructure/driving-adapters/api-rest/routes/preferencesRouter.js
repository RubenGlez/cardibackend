"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getPreferencesController_1 = __importDefault(require("../controllers/preferences/getPreferencesController"));
const updatePreferencesController_1 = __importDefault(require("../controllers/preferences/updatePreferencesController"));
const router = express_1.default.Router();
router.put('/:preferencesId', updatePreferencesController_1.default);
router.get('/:preferencesId', getPreferencesController_1.default);
exports.default = router;
