const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");
const { protect } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const {
  createTodoRules,
  updateTodoRules,
  getTodoByIdRules,
  getAllTodosRules,
} = require("../validators/todo.validator");
 
router.use(protect);
 
/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Membuat todo baru
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title: { type: string, minLength: 3, maxLength: 100, example: Belajar Swagger }
 *               description: { type: string, maxLength: 500, example: Menulis dokumentasi endpoint todo }
 *     responses:
 *       201:
 *         description: Todo berhasil dibuat
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoResponse'
 *       400:
 *         description: Validasi gagal
 *       401:
 *         description: Belum login / token tidak valid
 */
router.post("/", createTodoRules, validate, todoController.createTodo);
 
/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Mengambil daftar todo (pagination, filter, dan sorting)
 *     description: User biasa hanya melihat todo miliknya, admin melihat semua todo.
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1, default: 1 }
 *         description: Nomor halaman
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 100, default: 10 }
 *         description: Jumlah data per halaman
 *       - in: query
 *         name: completed
 *         schema: { type: boolean }
 *         description: Filter berdasarkan status selesai
 *       - in: query
 *         name: sortBy
 *         schema: { type: string, enum: [createdAt, title, completed], default: createdAt }
 *         description: Field yang dipakai untuk pengurutan
 *       - in: query
 *         name: order
 *         schema: { type: string, enum: [asc, desc], default: desc }
 *         description: Arah pengurutan
 *     responses:
 *       200:
 *         description: Daftar todo berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 message: { type: string, example: Todos retrieved successfully }
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Todo'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage: { type: integer, example: 1 }
 *                     totalPages: { type: integer, example: 3 }
 *                     totalItems: { type: integer, example: 25 }
 *                     itemsPerPage: { type: integer, example: 10 }
 *       400:
 *         description: Parameter query tidak valid
 *       401:
 *         description: Belum login / token tidak valid
 */
router.get("/", getAllTodosRules, validate, todoController.getAllTodos);
 
/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Mengambil satu todo berdasarkan ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: ID todo (format ObjectId MongoDB)
 *         example: 665f1c2e8b1e2a1a2c3d4e5f
 *     responses:
 *       200:
 *         description: Todo berhasil ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoResponse'
 *       400:
 *         description: Format ID tidak valid
 *       401:
 *         description: Belum login / token tidak valid
 *       403:
 *         description: Todo ini bukan milik user yang sedang login
 *       404:
 *         description: Todo tidak ditemukan
 */
router.get("/:id", getTodoByIdRules, validate, todoController.getTodoById);
 
/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Mengupdate todo berdasarkan ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: ID todo (format ObjectId MongoDB)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string, minLength: 3, maxLength: 100, example: Belajar Swagger (revisi) }
 *               description: { type: string, maxLength: 500, example: Menambahkan contoh response schema }
 *               completed: { type: boolean, example: true }
 *     responses:
 *       200:
 *         description: Todo berhasil diupdate
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoResponse'
 *       400:
 *         description: Validasi gagal atau format ID tidak valid
 *       401:
 *         description: Belum login / token tidak valid
 *       403:
 *         description: Todo ini bukan milik user yang sedang login
 *       404:
 *         description: Todo tidak ditemukan
 */
router.put("/:id", updateTodoRules, validate, todoController.updateTodo);
 
/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Menghapus todo berdasarkan ID
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: ID todo (format ObjectId MongoDB)
 *     responses:
 *       200:
 *         description: Todo berhasil dihapus
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoResponse'
 *       400:
 *         description: Format ID tidak valid
 *       401:
 *         description: Belum login / token tidak valid
 *       403:
 *         description: Todo ini bukan milik user yang sedang login
 *       404:
 *         description: Todo tidak ditemukan
 */
router.delete("/:id", getTodoByIdRules, validate, todoController.deleteTodo);
 
module.exports = router;
