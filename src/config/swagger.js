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
      description: "- Current Server (Auto Detect / Vercel)",
    },
  ],
  tags: [
    {
      name: "Auth",
      description: "Endpoint untuk autentikasi pengguna",
    },
    {
      name: "Categories",
      description: "Endpoint untuk manajemen kategori",
    },
    {
      name: "Stats",
      description: "Endpoint untuk statistik sistem",
    },
    {
      name: "Activity Logs",
      description: "Endpoint untuk log aktivitas",
    },
    {
      name: "Todos",
      description: "Endpoint untuk manajemen todo",
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
          id: { type: "string", example: "64a7f2c1b92a3c0012345678" },
          title: { type: "string", example: "Belajar Backend Node.js" },
          description: { type: "string", example: "Menyelesaikan project API Todo List" },
          completed: { type: "boolean", example: false },
          category: { type: "string", example: "Pelajaran" },
        },
      },
      Category: {
        type: "object",
        properties: {
          id: { type: "string", example: "64a7f2c1b92a3c0087654321" },
          name: { type: "string", example: "Pelajaran" },
          description: { type: "string", example: "Kategori untuk tugas sekolah dan coding" },
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
                  name: { type: "string", example: "Budi" },
                  email: { type: "string", example: "budi@gmail.com" },
                  password: { type: "string", example: "rahasia123" },
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
                  email: { type: "string", example: "budi@gmail.com" },
                  password: { type: "string", example: "rahasia123" },
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
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Pelajaran" },
                  description: { type: "string", example: "Tugas-tugas sekolah" },
                },
              },
            },
          },
        },
        responses: { 201: { description: "Kategori berhasil dibuat" } },
      },
    },
    "/api/categories/{id}": {
      put: {
        tags: ["Categories"],
        summary: "Mengupdate kategori berdasarkan ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string", example: "64a7f2c1b92a3c0087654321" } },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Pelajaran Update" },
                  description: { type: "string", example: "Update deskripsi kategori" },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Kategori berhasil diupdate" } },
      },
      delete: {
        tags: ["Categories"],
        summary: "Menghapus kategori berdasarkan ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string", example: "64a7f2c1b92a3c0087654321" } },
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
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", example: "Belajar Express.js" },
                  description: { type: "string", example: "Membuat REST API Todo List" },
                  category: { type: "string", example: "Pelajaran" },
                  completed: { type: "boolean", example: false },
                },
              },
            },
          },
        },
        responses: { 201: { description: "Todo berhasil dibuat" } },
      },
      get: {
        tags: ["Todos"],
        summary: "Mengambil daftar todo milik user yang sedang login (dengan pagination & search)",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "search", in: "query", required: false, schema: { type: "string", example: "Belajar" } },
          { name: "page", in: "query", required: false, schema: { type: "integer", example: 1 } },
          { name: "limit", in: "query", required: false, schema: { type: "integer", example: 10 } },
        ],
        responses: { 200: { description: "Berhasil mengambil daftar todo" } },
      },
    },
    "/api/todos/{id}": {
      get: {
        tags: ["Todos"],
        summary: "Mengambil satu todo berdasarkan ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string", example: "64a7f2c1b92a3c0012345678" } },
        ],
        responses: { 200: { description: "Berhasil mengambil todo" } },
      },
      put: {
        tags: ["Todos"],
        summary: "Mengupdate todo berdasarkan ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string", example: "64a7f2c1b92a3c0012345678" } },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", example: "Belajar Express.js Lanjutan" },
                  description: { type: "string", example: "Menyelesaikan revisi mentor" },
                  category: { type: "string", example: "Pelajaran" },
                  completed: { type: "boolean", example: true },
                },
              },
            },
          },
        },
        responses: { 200: { description: "Todo berhasil diupdate" } },
      },
      delete: {
        tags: ["Todos"],
        summary: "Menghapus todo berdasarkan ID",
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string", example: "64a7f2c1b92a3c0012345678" } },
        ],
        responses: { 204: { description: "Todo berhasil dihapus" } },
      },
    },
  },
};