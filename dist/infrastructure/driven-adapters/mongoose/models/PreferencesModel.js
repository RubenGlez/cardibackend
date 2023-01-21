"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { ObjectId, String } = mongoose_1.Schema.Types;
const PreferencesSchema = new mongoose_1.Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    companySelected: {
        type: ObjectId,
        ref: 'Company'
    },
    themeSelected: {
        type: String
    }
}, { timestamps: true });
const PreferencesModel = (0, mongoose_1.model)('Preferences', PreferencesSchema);
exports.default = PreferencesModel;
