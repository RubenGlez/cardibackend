"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getUserController_common_1 = __importDefault(require("../controllers/user/getUserController.common"));
const updateUserController_common_1 = __importDefault(require("../controllers/user/updateUserController.common"));
const router = express_1.default.Router();
router.get('/:userId', getUserController_common_1.default);
router.put('/:userId', updateUserController_common_1.default);
exports.default = router;
