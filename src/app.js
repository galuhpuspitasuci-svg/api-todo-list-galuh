const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger"); // Memanggil konfigurasi swagger

const todoRoutes = require("./routes/todo.routes");
const authRoutes = require("./routes/auth.routes");
const statsRoutes = require("./routes/stats.routes");
const categoryRoutes = require("./routes/category.routes");
const activityLogRoutes = require("./routes/activityLog.routes");

const logger = require("./middlewares/logger.middleware");
const notFound = require("./middlewares/notFound.middleware");
const errorHandler = require("./middlewares/errorHandler.middleware");

const app = express();

app.use(logger);
app.use(express.json());

// Mendaftarkan paparan Swagger UI di laluan /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.json({ message: "Todo API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/stats", statsRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/activity-logs", activityLogRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;