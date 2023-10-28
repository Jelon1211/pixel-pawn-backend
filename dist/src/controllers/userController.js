"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const getUser = async (req, res) => {
    const username = req.body.username;
    const user = await User_1.default.findOne({ username: username }).exec();
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
};
exports.getUser = getUser;
