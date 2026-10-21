const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrasi user baru
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, example: Galuh }
 *               email: { type: string, example: galuh@mail.com }
 *               password: { type: string, example: rahasia123 }
 *     responses:
 *       201:
 *         description: User berhasil dibuat
 */
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
