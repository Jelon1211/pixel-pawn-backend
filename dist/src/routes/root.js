"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const path_1 = require("path");
router.get("^/$|index(.html)?", (req, res) => {
    res.sendFile((0, path_1.join)(__dirname, "..", "views", "index.html"));
});
exports.default = router;
