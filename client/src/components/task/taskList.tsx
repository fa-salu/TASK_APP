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
import UndoIcon from "@mui/icons-material/Undo";

const TaskList = () => {
  const { data: tasks, isLoading } = useTasks();
  const updateTaskStatus = useUpdateTaskStatus();
  const deleteTask = useDeleteTask();
  const [showCompleted, setShowCompleted] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <CircularProgress />
      </div>
    );
  }

  const totalTasks = tasks?.length || 0;
  const pendingTasks = tasks?.filter((task) => task.status === "pending") || [];
  const completedTasks =
    tasks?.filter((task) => task.status === "completed") || [];

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

  return (
    <div className="max-w-2xl mx-auto">
      <TaskSummaryBar
        totalTasks={totalTasks}
        pendingTasks={pendingTasks.length}
        completedTasks={completedTasks.length}
      />

      <AddTask />

      <div className="flex gap-4 mb-4">
        <Button
          variant={!showCompleted ? "contained" : "outlined"}
          color="warning"
          onClick={() => setShowCompleted(false)}
        >
          Pending Tasks
        </Button>
        <Button
          variant={showCompleted ? "contained" : "outlined"}
          color="success"
          onClick={() => setShowCompleted(true)}
        >
          Completed Tasks
        </Button>
      </div>

      <Card className="shadow-md p-4">
        <CardContent>
          <Typography variant="h6" className="mb-2">
            {showCompleted ? "Completed Tasks" : "Pending Tasks"}
          </Typography>
          {(showCompleted ? completedTasks : pendingTasks).length === 0 ? (
            <Typography variant="body2" color="textSecondary">
              No {showCompleted ? "completed" : "pending"} tasks
            </Typography>
          ) : (
            <ul className="space-y-3">
              {(showCompleted ? completedTasks : pendingTasks).map((task) => (
                <li
                  key={task._id}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow"
                >
                  <div>
                    <Typography variant="body1">{task.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {task.description}
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
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskList;
