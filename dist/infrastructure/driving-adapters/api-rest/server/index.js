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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = __importDefault(require("../routes"));
class Server {
    constructor(port) {
        this._port = port;
        this._app = (0, express_1.default)();
        this._app.set('port', port);
        this.setMiddlewares();
        this.setRoutes();
    }
    setMiddlewares() {
        this._app.use((0, cors_1.default)());
        this._app.use((0, helmet_1.default)());
        this._app.use((0, morgan_1.default)('dev'));
        this._app.use(express_1.default.json());
        this._app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
    }
    setRoutes() {
        this._app.use('/api', routes_1.default);
    }
    getAppInstance() {
        return this._httpServer;
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise(resolve => {
                this._httpServer = this._app.listen(this._port, () => {
                    console.log('📡 Server listening on port', this._port);
                    resolve();
                });
            });
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve, reject) => {
                if (this._httpServer !== undefined) {
                    this._httpServer.close(error => {
                        if (error !== null) {
                            return reject(error);
                        }
                        return resolve();
                    });
                }
                return resolve();
            });
        });
    }
}
exports.default = Server;
