const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo List API",
      version: "1.0.0",
      description: "Dokumentasi API Todo List",
    },
    servers: [
      { url: "/", description: "Current Server (Auto Detect / Vercel)" },
      { url: "http://localhost:3000", description: "Local development server" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
        apiKeyAuth: { type: "apiKey", in: "header", name: "x-api-key" },
      },
    },
  },
  apis: [
    path.join(process.cwd(), "src/routes/todo.routes.js"),
    path.join(process.cwd(), "src/routes/auth.routes.js"),
    path.join(process.cwd(), "src/routes/stats.routes.js"),
  ],
};

module.exports = swaggerJSDoc(options);