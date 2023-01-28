"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorController_1 = __importDefault(require("../controllers/errorController"));
const notFoundController_1 = __importDefault(require("../controllers/notFoundController"));
const versionOneRouter_1 = __importDefault(require("./versionOneRouter"));
const router = express_1.default.Router();
router.use('/v1', versionOneRouter_1.default);
router.use(notFoundController_1.default);
router.use(errorController_1.default);
exports.default = router;
