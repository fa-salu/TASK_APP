export interface Task {
  _id: string;
  title: string;
  description: string;
  deadline: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "completed";
  userId: string;
}
