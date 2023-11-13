const express = require("express");
const route = express.Router();

const {
  getAllTodo,
  getTodoById,
  createTodo,
  updateTodoStatus,
  updateTodoTask,
  deleteTodo
} = require("../controllers/todo-controller");
const verifyToken = require("../middleware/auth");

route.get("/", verifyToken, getAllTodo);
route.get("/:id", verifyToken, getTodoById);
route.post("/", createTodo);
route.put("/status/:id", updateTodoStatus);
route.put("/task/:id", updateTodoTask);
route.delete("/:id", deleteTodo);

module.exports = route;