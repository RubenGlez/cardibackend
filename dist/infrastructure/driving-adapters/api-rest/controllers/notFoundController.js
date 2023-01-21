"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OutputError_1 = require("../../../../domain/exceptions/OutputError");
const OutputErrorTypes_1 = require("../../../../domain/exceptions/OutputErrorTypes");
function notFoundController(req, res, next) {
    const error = new OutputError_1.OutputError(OutputErrorTypes_1.OutputErrorTypes.NotFound);
    next(error);
}
exports.default = notFoundController;
