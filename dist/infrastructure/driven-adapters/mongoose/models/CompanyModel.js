"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { ObjectId } = mongoose_1.Schema.Types;
const CompanySchema = new mongoose_1.Schema({
    owner: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 2,
        maxLength: 32
    },
    description: {
        type: String,
        minLength: 2,
        maxLength: 320
    },
    contact: {
        phone: {
            type: String,
            minLength: 9,
            maxLength: 18
        },
        email: {
            type: String,
            lowercase: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Invalid email format'
            ]
        },
        web: {
            type: String,
            minLength: 4,
            maxLength: 320
        }
    }
}, { timestamps: true });
const CompanyModel = (0, mongoose_1.model)('Company', CompanySchema);
exports.default = CompanyModel;
