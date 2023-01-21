"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signInController_1 = __importDefault(require("../controllers/auth/signInController"));
const signUpController_1 = __importDefault(require("../controllers/auth/signUpController"));
const router = express_1.default.Router();
router.post('/signup', signUpController_1.default);
router.post('/signin', signInController_1.default);
exports.default = router;
