"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var cors_1 = __importDefault(require("cors"));
//import errorHandler from "./middleware/errorMiddleware";
/**
 * Imports various route handlers.
 */
/**
 * Port number for the server.
 * Uses the PORT environment variable if set, otherwise defaults to 5000.
 */
var port = process.env.PORT || 5000;
/**
 * Connects to the database.
 */
var db_1 = require("./config/db");
(0, db_1.connectDB)();
/**
 * Creates an Express application instance.
 */
var app = (0, express_1.default)();
/**
 * Middleware to handle errors.
 */
//import errorHandler from "./middleware/errorMiddleware";
// /**
//  * Enables CORS for the application.
//  */
// app.use(cors());
// // Enable CORS for all origins (not recommended for production)
// app.use(cors());
// OR, Enable CORS for specific origins (recommended)
var corsOptions = {
    origin: [],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
/**
 * Sets up JSON and URL-encoded body parsing with a 50MB limit.
 */
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: "50mb", extended: false }));
/**
 * Uses the error handling middleware.
 */
//app.use(errorHandler);
var logger = require("morgan");
app.use(logger("common"));
/**
 * Mounts the route handlers to specific paths.
 */
app.get('/', function (req, res) {
    res.send('Hello World!');
});
/**
 * Starts the server on the specified port and logs a message.
 */
app.listen(port, function () {
    console.log("Server Running on Port ".concat(port));
    console.log("".concat(process.env.NODE_ENV, " Environment"));
});
exports.default = app;
