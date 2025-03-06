import { Router } from "express";
import {
  addTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../controllers/tasks.controller.js";
import { verifyUserToken } from "../middlewares/AuthMiddleware.js";

const router = Router();

router.get("/health", (req, res) => {
  res.send("User Tasks Service is Healthy!");
});

router.route("/create").post(verifyUserToken, addTask);
router.route("/update/:taskId").put(verifyUserToken, updateTask);
router.route("/delete/:taskId").delete(verifyUserToken, deleteTask);
router.route("/all-tasks").get(verifyUserToken, getAllTasks);
router.route("/single-task/:taskId").get(verifyUserToken, getTaskById);

export default router;
