const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const dbConnection = require("./config/db");
const categoryRoute = require("./routers/categoryRoute");
const subCategoryRoute = require("./routers/subCategoryRoute");
const brandRoute = require("./routers/brandRoute");
const productRoute = require("./routers/productRoute");
const userRoute = require("./routers/userRoute");
const authRoute = require("./routers/authRoute");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");
const qs = require("qs");
const path = require("path");

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

app.set("query parser", (str) => qs.parse(str));

app.use(express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/categories", categoryRoute);

app.use("/api/subcategories", subCategoryRoute);

app.use("/api/brands", brandRoute);

app.use("/api/products", productRoute);

app.use("/api/users", userRoute);

app.use("/api/auth", authRoute);

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
