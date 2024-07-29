import express from 'express';
import * as todosController from "../controllers/todos.js";
const router = express.Router()

router.get("/profile", todosController.getTodoPage)

router.post("/addTodo", todosController.addTodo)

router.post('/updateTodo/:todoId', todosController.updateTodo)

router.post("/deleteTodo/:todoId", todosController.deleteTodo)


export default router;