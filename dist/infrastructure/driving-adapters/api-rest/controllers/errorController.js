"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OutputError_1 = require("../../../../domain/exceptions/OutputError");
const OutputErrorTypes_1 = require("../../../../domain/exceptions/OutputErrorTypes");
function errorController(err, req, res, next) {
    if (err instanceof OutputError_1.OutputError) {
        res.status(err.status).send(err);
    }
    else {
        console.error('🚨 Error not handled: ', err);
        const outputError = new OutputError_1.OutputError(OutputErrorTypes_1.OutputErrorTypes.Unknown);
        res.status(outputError.status).send(outputError);
    }
}
exports.default = errorController;
