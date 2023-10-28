"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
const test = (req, res) => {
    console.log("jest request");
    res.json({ tak: "tak" });
};
exports.test = test;
