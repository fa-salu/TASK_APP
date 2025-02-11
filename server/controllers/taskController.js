import Task from "../models/taskModel.js";
import { taskSchema } from "../validators/taskValidator.js";

export const createTask = async (req, res) => {
  try {
    const validation = taskSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.error.errors,
      });
    }
    const { title, description, deadline, priority } = req.body;
    const userId = req.user.id;

    const task = new Task({ title, description, deadline, priority, userId });
    await task.save();

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating task", error: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({ userId }).sort({ deadline: 1 });

    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tasks", error: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.status(200).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching task", error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    console.log("req", req.body);
    const validation = taskSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validation.error.errors,
      });
    }
    console.log("val");
    const { title, description, deadline, priority, status } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this task" });
    }

    task.title = title;
    task.description = description;
    task.deadline = deadline;
    task.priority = priority;
    if (status) task.status = status;
    await task.save();

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating task", error: error.message });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    console.log("req", req.body);

    const statusValidation = taskSchema.shape.status.safeParse(req.body.status);
    if (!statusValidation.success) {
      return res.status(400).json({
        message: "Validation failed for status",
        errors: statusValidation.error.errors,
      });
    }

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this task" });
    }

    task.status = req.body.status;
    await task.save();

    res.status(200).json({ message: "Task status updated successfully", task });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating task status", error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this task" });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: error.message });
  }
};
