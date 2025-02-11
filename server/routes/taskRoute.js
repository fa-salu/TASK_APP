import express from "express";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
  updateTaskStatus,
} from "../controllers/taskController.js";
import verifyAuth from "../middleware/verifyAuth.js";

const router = express.Router();

router.post("/", verifyAuth, createTask);
router.get("/", verifyAuth, getTasks);
router.get("/:id", verifyAuth, getTaskById);
router.put("/:id", verifyAuth, updateTask);
router.patch("/:id/status", verifyAuth, updateTaskStatus);
router.delete("/:id", verifyAuth, deleteTask);

export default router;
