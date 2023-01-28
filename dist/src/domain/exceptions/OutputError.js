"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputError = void 0;
const outputErrors_1 = require("./outputErrors");
class OutputError extends Error {
    constructor(name, info) {
        super();
        this._type = 'OutputError';
        this.info = {};
        this.name = name;
        this.message = outputErrors_1.outputErrors[name].message;
        this.status = outputErrors_1.outputErrors[name].status;
        this.info = info;
    }
}
exports.OutputError = OutputError;
