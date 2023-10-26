"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.express = void 0;
require("dotenv").config();
require("express-async-errors");
exports.express = require("express");
const app = (0, exports.express)();
const path = require("path");
const { logger, logEvents } = require("../src/middleware/logger");
const errorHandler = require("../src/middleware/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("../config/corsOptions");
const connectDB = require("../config/dbConn");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 9000;
// connectDB();
app.use(logger);
app.use(cors(corsOptions));
app.use(exports.express.json());
// // Accept body data
app.use(exports.express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/styles", exports.express.static(path.join(__dirname, "public/styles")));
app.use("/", require("./routes/root"));
app.use("/auth", require("../src/routes/authRoutes"));
app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    }
    else if (req.accepts("json")) {
        res.json({ message: "404 Not Found" });
    }
    else {
        res.type("txt").send("404 Not Found");
    }
});
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// mongoose.connection.once("open", () => {
//   console.log("Connected to MongoDB");
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// });
// mongoose.connection.on("error", (err) => {
//   console.log(err);
//   logEvents(
//     `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
//     "mongoErrLog.log"
//   );
// });
