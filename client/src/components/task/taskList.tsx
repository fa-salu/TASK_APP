"use client";

import { useState } from "react";
import { useTasks, useDeleteTask, useUpdateTaskStatus } from "@/hooks/useTasks";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  IconButton,
} from "@mui/material";
import TaskSummaryBar from "@/components/task/taskSummeryBar";
import AddTask from "@/components/task/addTask";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import UndoIcon from "@mui/icons-material/Undo";
import { Task } from "@/types/task";

const TaskList = () => {
  const { data: tasks, isLoading } = useTasks();
  const updateTaskStatus = useUpdateTaskStatus();
  const deleteTask = useDeleteTask();
  const [showCompleted, setShowCompleted] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <CircularProgress />
      </div>
    );
  }

  const handleToggleStatus = (
    taskId: string,
    currentStatus: "pending" | "completed"
  ) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";
    updateTaskStatus.mutate({ id: taskId, status: newStatus });
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask.mutate(taskId);
  };

  const getPriorityBorderColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "border-red-500";
      case "medium":
        return "border-yellow-500";
      case "low":
        return "border-green-500";
      default:
        return "border-gray-300";
    }
  };

  return (
    <div className="max-w-2xl mx-auto md:mt-4">
      <TaskSummaryBar
        totalTasks={tasks?.length || 0}
        pendingTasks={
          tasks?.filter((task) => task.status === "pending").length || 0
        }
        completedTasks={
          tasks?.filter((task) => task.status === "completed").length || 0
        }
      />

      <div className="flex  gap-4 my-4 justify-center md:justify-start">
        <Button
          variant={!showCompleted ? "contained" : "outlined"}
          color="warning"
          startIcon={<PendingActionsIcon />}
          onClick={() => setShowCompleted(false)}
          className="rounded-lg"
        >
          Pending
        </Button>

        <Button
          variant={showCompleted ? "contained" : "outlined"}
          color="success"
          startIcon={<TaskAltIcon />}
          onClick={() => setShowCompleted(true)}
          className="rounded-lg"
        >
          Completed
        </Button>

        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
          onClick={() => setSelectedTask({} as Task)}
          className="rounded-lg"
        >
          Add Task
        </Button>
      </div>

      <Card className="shadow-md p-4">
        <CardContent>
          <Typography variant="h6" className="mb-2">
            {showCompleted ? "Completed Tasks" : "Pending Tasks"}
          </Typography>

          <div className="max-h-[400px] overflow-y-auto">
            {(showCompleted
              ? tasks?.filter((t) => t.status === "completed")
              : tasks?.filter((t) => t.status === "pending")
            )?.map((task) => (
              <li
                key={task._id}
                className={`flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow cursor-pointer my-2 border-l-4 ${getPriorityBorderColor(
                  task.priority
                )}`}
              >
                <div onClick={() => setSelectedTask(task)}>
                  <Typography variant="body1">{task.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {task.description}
                  </Typography>
                  <Typography variant="caption" className="text-gray-500">
                    Deadline:{" "}
                    {new Date(task.deadline).toLocaleDateString("en-GB")} |
                    Priority: {task.priority}
                  </Typography>
                </div>
                <div className="flex items-center gap-2">
                  <IconButton
                    onClick={() => handleToggleStatus(task._id, task.status)}
                    color={task.status === "pending" ? "success" : "warning"}
                  >
                    {task.status === "pending" ? (
                      <CheckCircleIcon />
                    ) : (
                      <UndoIcon />
                    )}
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteTask(task._id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </li>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedTask !== undefined && (
        <AddTask
          task={selectedTask}
          onClose={() => setSelectedTask(undefined)}
        />
      )}
    </div>
  );
};

export default TaskList;
