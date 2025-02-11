"use client";

import { useEffect } from "react";
import { useCreateTask, useUpdateTask } from "@/hooks/useTasks";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Task } from "@/types/task";
import { taskSchema } from "@/validation/taskValidation";

type TaskFormData = z.infer<typeof taskSchema>;

interface AddTaskProps {
  task?: Task | null;
  onClose: () => void;
}

const AddTask = ({ task, onClose }: AddTaskProps) => {
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const isUpdateMode = task && Object.keys(task).length > 0;
  console.log("tod", task);
  console.log("d", isUpdateMode);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: task || {
      title: "",
      description: "",
      deadline: "",
      priority: "low",
    },
  });

  useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("description", task.description);
      setValue("deadline", task.deadline);
      setValue("priority", task.priority);
    }
  }, [task, setValue]);

  const onSubmit = (data: TaskFormData) => {
    if (isUpdateMode) {
      updateTask.mutate({ id: task!._id, data });
    } else {
      createTask.mutate({ ...data, status: "pending" } as Partial<Task>);
    }
    onClose();
    reset();
  };

  return (
    <Dialog open={!!task} onClose={onClose}>
      <DialogTitle>{isUpdateMode ? "Update Task" : "Add Task"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          margin="dense"
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          label="Description"
          fullWidth
          margin="dense"
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <TextField
          label="Deadline"
          type="date"
          fullWidth
          margin="dense"
          {...register("deadline")}
          InputLabelProps={{ shrink: true }}
          error={!!errors.deadline}
          helperText={errors.deadline?.message}
        />
        <FormControl fullWidth margin="dense" error={!!errors.priority}>
          <InputLabel>Priority</InputLabel>
          <Select
            {...register("priority")}
            defaultValue={task?.priority || "low"}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
          {errors.priority && (
            <FormHelperText>{errors.priority.message}</FormHelperText>
          )}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          color="primary"
          variant="contained"
        >
          {isUpdateMode ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTask;
