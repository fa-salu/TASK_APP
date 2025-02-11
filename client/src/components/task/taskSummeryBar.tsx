import { Chip } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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
    <div className="flex flex-wrap justify-between bg-white p-4 rounded-lg shadow-lg mb-4 border border-gray-200">
      <Chip
        icon={<AssignmentIcon />}
        label={`Total: ${totalTasks}`}
        color="primary"
        className="text-lg font-medium"
      />
      <Chip
        icon={<PendingActionsIcon />}
        label={`Pending: ${pendingTasks}`}
        color="warning"
        className="text-lg font-medium"
      />
      <Chip
        icon={<CheckCircleIcon />}
        label={`Completed: ${completedTasks}`}
        color="success"
        className="text-lg font-medium"
      />
    </div>
  );
};

export default TaskSummaryBar;
