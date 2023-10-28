"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const path_1 = __importDefault(require("path"));
const errorHandler_1 = require("./middleware/errorHandler");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const corsOptions_1 = require("../config/corsOptions");
const dbConn_1 = require("../config/dbConn");
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("./middleware/logger");
const root_1 = __importDefault(require("./routes/root"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const PORT = process.env.PORT || 9000;
(0, dbConn_1.connectDB)();
app.use(logger_1.logger);
app.use((0, cors_1.default)(corsOptions_1.corsOptions));
app.use(express_1.default.json());
// // Accept body data
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use("/styles", express_1.default.static(path_1.default.join(__dirname, "public/styles")));
app.use("/", root_1.default);
app.use("/auth", authRoutes_1.default);
app.use("/users", userRoutes_1.default);
app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path_1.default.join(__dirname, "views", "404.html"));
    }
    else if (req.accepts("json")) {
        res.json({ message: "404 Not Found" });
    }
    else {
        res.type("txt").send("404 Not Found");
    }
});
app.use(errorHandler_1.errorHandler);
mongoose_1.default.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
mongoose_1.default.connection.on("error", (err) => {
    console.log(err);
    (0, logger_1.logEvents)(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, "mongoErrLog.log");
});
