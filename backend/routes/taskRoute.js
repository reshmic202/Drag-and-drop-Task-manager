import express from 'express';
import { createNewTask, deleteTask, editCurrentTask, getAllTasks, getTaskBasedOnDescending, getTaskBasedOnFilter } from '../controller/taskController.js';

const taskRoute = express.Router();

taskRoute.post("/create-new-task",createNewTask);
taskRoute.post("/get-all-task-by-filter",getTaskBasedOnFilter);
taskRoute.get("/get-all-task/:id",getAllTasks);
taskRoute.get("/get-all-task-desc/:id",getTaskBasedOnDescending);
taskRoute.put("/edit-task/:taskId",editCurrentTask);
taskRoute.delete("/delete-task/:taskId",deleteTask);

export default taskRoute;