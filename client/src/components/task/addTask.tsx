"use client";

import { useState } from "react";
import { useCreateTask } from "@/hooks/useTasks";
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

const AddTask = () => {
  const createTask = useCreateTask();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = (data: TaskFormData) => {
    createTask.mutate({ ...data, status: "pending" } as Partial<Task>);
    setOpen(false);
    reset();
  };

  return (
    <div className="mb-4 text-right">
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add New Task
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Task</DialogTitle>
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
            <Select {...register("priority")} defaultValue="low">
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
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            color="primary"
            variant="contained"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTask;
