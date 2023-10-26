"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
const router = server_1.express.Router();
const path = require("path");
router.get("^/$|index(.html)?", (reg, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});
module.exports = router;
