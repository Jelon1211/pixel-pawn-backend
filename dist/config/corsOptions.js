"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const allowedOrigins_1 = require("./allowedOrigins");
const corsOptions = {
    // origin: (origin, callback) => {
    //     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
    //         callback(null, true)
    //     } else {
    //         callback(new Error('Not allowed by CORS'))
    //     }
    // },
    origin: allowedOrigins_1.allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200,
};
exports.corsOptions = corsOptions;
