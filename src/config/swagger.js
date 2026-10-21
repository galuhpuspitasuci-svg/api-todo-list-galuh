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
    tags: [
      { name: "Auth", description: "Endpoint untuk autentikasi pengguna" },
      { name: "Todos", description: "Endpoint untuk manajemen todo" },
      { name: "Stats", description: "Endpoint untuk statistik (API Key)" },
    ],
    servers: [
      { url: "/", description: "Current Server (Auto Detect / Vercel)" },
      { url: "http://localhost:3000", description: "Local development server" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
        apiKeyAuth: { type: "apiKey", in: "header", name: "x-api-key" },
      },
      schemas: {
        Todo: {
          type: "object",
          properties: {
            _id: { type: "string", example: "665f1c2e8b1e2a1a2c3d4e5f" },
            title: { type: "string", example: "Belajar Swagger" },
            description: { type: "string", example: "Menulis dokumentasi endpoint todo" },
            completed: { type: "boolean", example: false },
            owner: { type: "string", example: "665f1a2b8b1e2a1a2c3d1111" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        TodoResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Todo created successfully" },
            data: { $ref: "#/components/schemas/Todo" },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Login successful" },
            data: {
              type: "object",
              properties: {
                user: {
                  type: "object",
                  properties: {
                    id: { type: "string", example: "665f1a2b8b1e2a1a2c3d1111" },
                    name: { type: "string", example: "Budi" },
                    email: { type: "string", example: "budi@example.com" },
                    role: { type: "string", example: "user" },
                  },
                },
                token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
              },
            },
          },
        },
      },
    },
  },
  apis: [
    path.join(process.cwd(), "src/routes/auth.routes.js"),
    path.join(process.cwd(), "src/routes/todo.routes.js"),
    path.join(process.cwd(), "src/routes/stats.routes.js"),
  ],
};
 
module.exports = swaggerJSDoc(options);