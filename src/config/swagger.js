module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Todo List API",
    version: "1.0.0",
    description: "Dokumentasi API Todo List — dibangun bertahap dari seri artikel backend Node.js",
  },
  servers: [
    {
      url: "/",
      description: "Current Server (Auto Detect / Vercel)",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
      apiKeyAuth: {
        type: "apiKey",
        in: "header",
        name: "x-api-key",
      },
    },
    schemas: {
      Todo: {
        type: "object",
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          completed: { type: "boolean" },
        },
      },
      Category: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          description: { type: "string" },
        },
      },
    },
  },
  paths: {
    "/api/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Mendaftarkan user baru",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: { 201: { description: "User berhasil terdaftar" } },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login dan mendapatkan JWT token",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Login berhasil" } },
      },
    },
    "/api/categories": {
      get: {
        tags: ["Categories"],
        summary: "Mengambil semua kategori",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Berhasil mengambil kategori" } },
      },
      post: {
        tags: ["Categories"],
        summary: "Membuat kategori baru",
        security: [{ bearerAuth: [] }],
        responses: { 201: { description: "Kategori berhasil dibuat" } },
      },
    },
    "/api/categories/{id}": {
      put: {
        tags: ["Categories"],
        summary: "Mengupdate kategori berdasarkan ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: { 200: { description: "Kategori berhasil diupdate" } },
      },
      delete: {
        tags: ["Categories"],
        summary: "Menghapus kategori berdasarkan ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: { 204: { description: "Kategori berhasil dihapus" } },
      },
    },
    "/api/stats/summary": {
      get: {
        tags: ["Stats"],
        summary: "Mengambil ringkasan statistik todo (total, selesai, belum selesai)",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Berhasil mengambil statistik" } },
      },
    },
    "/api/activity-logs": {
      get: {
        tags: ["Activity Logs"],
        summary: "Mengambil semua riwayat activity log",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Berhasil mengambil activity log" } },
      },
    },
    "/api/todos": {
      post: {
        tags: ["Todos"],
        summary: "Membuat todo baru (wajib login)",
        security: [{ bearerAuth: [] }],
        responses: { 201: { description: "Todo berhasil dibuat" } },
      },
      get: {
        tags: ["Todos"],
        summary: "Mengambil daftar todo milik user yang sedang login (dengan pagination & search)",
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: "Berhasil mengambil daftar todo" } },
      },
    },
    "/api/todos/{id}": {
      get: {
        tags: ["Todos"],
        summary: "Mengambil satu todo berdasarkan ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: { 200: { description: "Berhasil mengambil todo" } },
      },
      put: {
        tags: ["Todos"],
        summary: "Mengupdate todo berdasarkan ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: { 200: { description: "Todo berhasil diupdate" } },
      },
      delete: {
        tags: ["Todos"],
        summary: "Menghapus todo berdasarkan ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: { 204: { description: "Todo berhasil dihapus" } },
      },
    },
  },
};