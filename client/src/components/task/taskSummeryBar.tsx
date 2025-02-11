import { Typography } from "@mui/material";

interface TaskSummaryBarProps {
  totalTasks: number;
  pendingTasks: number;
  completedTasks: number;
}

const TaskSummaryBar = ({
  totalTasks,
  pendingTasks,
  completedTasks,
}: TaskSummaryBarProps) => {
  return (
    <div className="flex justify-between bg-gray-100 p-4 rounded-lg shadow-md mb-4">
      <Typography variant="h6">Total: {totalTasks}</Typography>
      <Typography variant="h6">Pending: {pendingTasks}</Typography>
      <Typography variant="h6">Completed: {completedTasks}</Typography>
    </div>
  );
};

export default TaskSummaryBar;
