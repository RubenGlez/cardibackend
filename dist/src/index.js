"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const mongoose_1 = __importDefault(require("./infrastructure/driven-adapters/mongoose"));
const server_1 = __importDefault(require("./infrastructure/driving-adapters/api-rest/server"));
const ServerInstance = new server_1.default(config_1.PORT);
const MongoInstance = new mongoose_1.default(config_1.DATABASE);
const runApiRest = () => __awaiter(void 0, void 0, void 0, function* () {
    yield ServerInstance.listen();
    yield MongoInstance.connect();
    const appInstance = ServerInstance.getAppInstance();
    return appInstance;
});
const apiInstance = runApiRest();
module.exports = apiInstance;
