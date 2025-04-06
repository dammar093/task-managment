import { Router } from "express";
import veryfyJwt from "../middlewares/veryfyJwt";
import { createTask, deleteTask, getAllTasks } from "./../controllers/task.controller"


const taskRoutes = Router();

// create task route
taskRoutes.post("/create", veryfyJwt, createTask);
// get all tasks route
taskRoutes.get("/", veryfyJwt, getAllTasks);
// delete task route
taskRoutes.delete("/:id", veryfyJwt, deleteTask);

export default taskRoutes;