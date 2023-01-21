"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardiError = void 0;
const cardiErrors_1 = require("./cardiErrors");
class CardiError extends Error {
    constructor(name, info) {
        super();
        this._type = 'CardiError';
        this.info = {};
        this.name = name;
        this.message = cardiErrors_1.cardiErrors[name].message;
        this.status = cardiErrors_1.cardiErrors[name].status;
        this.info = info;
    }
}
exports.CardiError = CardiError;
