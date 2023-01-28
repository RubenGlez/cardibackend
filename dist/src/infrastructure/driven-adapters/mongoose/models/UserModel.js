"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const User_1 = require("../../../../domain/entities/User");
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Invalid email format'
        ]
    },
    password: {
        type: String,
        required: true,
        minLength: 4
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        minLength: 2,
        maxLength: 32
    },
    role: {
        type: String,
        enum: Object.values(User_1.UserRole),
        required: true
    },
    lastLoginAt: Date
}, {
    timestamps: true
});
const UserModel = (0, mongoose_1.model)('User', UserSchema);
exports.default = UserModel;
