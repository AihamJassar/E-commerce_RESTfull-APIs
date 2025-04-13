const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const dbConnection = require("./config/db");
const categoryRoute = require("./routers/categoryRoute");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");

dotenv.config({ path: "config.env" });

// Connect With Database
dbConnection();

// Start Express App
const app = express();

// Middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}
app.use(express.json());

// Routes
app.use("/api/categories", categoryRoute);

app.all("/{*splat}", (req, res, next) => {
  next(new ApiError(`Con't find this route ${req.originalUrl}`, 400));
});

// Global error handling middleware
app.use(globalError);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, (_) =>
  console.log(`Server running on port ${PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log(`Unhandled Rejection Errors: ${err.name} | ${err.message}`);
  server.close((_) => {
    console.log("shutting down...");
    process.exit(1);
  });
});
