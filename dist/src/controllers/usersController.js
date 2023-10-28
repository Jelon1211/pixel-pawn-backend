"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewUser = exports.getUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUser = async (req, res) => {
    const username = req.body.username;
    const user = await User_1.default.findOne({ username: username }).exec();
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
};
exports.getUser = getUser;
const createNewUser = async (req, res) => {
    const { firstname, password, username } = req.body;
    if (!firstname || !password || !username) {
        return res.status(400).json({ message: "All fields are required!" });
    }
    const duplicate = await User_1.default.findOne({ username }).lean().exec();
    if (duplicate) {
        return res.status(409).json({ message: "Duplicate username" });
    }
    const hashedPwd = await bcrypt_1.default.hash(password, 10);
    const userObject = { firstname, password: hashedPwd, username };
    const user = await User_1.default.create(userObject);
    if (user) {
        res.status(201).json({ message: `New user ${username} created` });
    }
    else {
        res.status(400).json({ message: "Invalid user data recived" });
    }
};
exports.createNewUser = createNewUser;
