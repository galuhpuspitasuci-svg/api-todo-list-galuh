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

router.post("/", createTodoRules, validate, todoController.createTodo);
router.get("/", getAllTodosRules, validate, todoController.getAllTodos);
router.get("/:id", getTodoByIdRules, validate, todoController.getTodoById);
router.put("/:id", updateTodoRules, validate, todoController.updateTodo);
router.delete("/:id", getTodoByIdRules, validate, todoController.deleteTodo);

module.exports = router;