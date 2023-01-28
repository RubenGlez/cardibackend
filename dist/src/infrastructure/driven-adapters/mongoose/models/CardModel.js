"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { ObjectId } = mongoose_1.Schema.Types;
const CardSchema = new mongoose_1.Schema({
    owner: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    company: {
        type: ObjectId,
        ref: 'Company',
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
        minLength: 2,
        maxLength: 32
    },
    color: {
        type: String
    },
    logo: {
        type: String
    },
    description: {
        type: String
    }
}, { timestamps: true });
const CardModel = (0, mongoose_1.model)('Card', CardSchema);
exports.default = CardModel;
