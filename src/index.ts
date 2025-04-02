import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
//import errorHandler from "./middleware/errorMiddleware";



/**
 * Imports various route handlers.
 */
/**
 * Port number for the server.
 * Uses the PORT environment variable if set, otherwise defaults to 5000.
 */
const port = process.env.PORT || 5000;

/**
 * Connects to the database.
 */
//import connectDB from "./config/db";
//connectDB();

/**
 * Creates an Express application instance.
 */
const app = express();

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
let corsOptions = {
  origin: [],
  credentials: true,
};

app.use(cors(corsOptions));

/**
 * Sets up JSON and URL-encoded body parsing with a 50MB limit.
 */
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

/**
 * Uses the error handling middleware.
 */
//app.use(errorHandler);

const logger = require("morgan");
app.use(logger("common"));

/**
 * Mounts the route handlers to specific paths.
 */
app.get('/', (req: any, res: any) => {
  res.send('Hello World!')
})

/**
 * Starts the server on the specified port and logs a message.
 */
app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
  console.log(`${process.env.NODE_ENV} Environment`);
});

export default app;
