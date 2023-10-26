import dotenv from "dotenv";
dotenv.config();
require("express-async-errors");
import express from "express";
const app = express();
import path from "path";
import { errorHandler } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsOptions } from "../config/corsOptions";
import { connectDB } from "../config/dbConn";
import mongoose from "mongoose";
import { logger } from "./middleware/logger";
import rootRoutes from "./routes/root";
import authRoutes from "./routes/authRoutes";

const PORT = process.env.PORT || 9000;

// connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

// // Accept body data
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use("/styles", express.static(path.join(__dirname, "public/styles")));

app.use("/", rootRoutes);

app.use("/auth", authRoutes);

app.all("*", (req: any, res: any) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
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
