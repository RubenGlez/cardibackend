"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Promotion_1 = require("../../../../domain/entities/Promotion");
const { ObjectId } = mongoose_1.Schema.Types;
const PromotionSchema = new mongoose_1.Schema({
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
    card: {
        type: ObjectId,
        ref: 'Card',
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
        maxLength: 320,
        required: true
    },
    type: {
        type: String,
        enum: Object.values(Promotion_1.PromotionType),
        required: true
    },
    validFrom: {
        type: Date,
        required: true
    },
    validTo: {
        type: Date,
        required: true
    }
}, { timestamps: true });
const PromotionModel = (0, mongoose_1.model)('Promotion', PromotionSchema);
exports.default = PromotionModel;
