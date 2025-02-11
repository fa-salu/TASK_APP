import Navbar from "@/components/navbar/navbar";
import TaskList from "@/components/task/taskList";
import React from "react";

export default function Page() {
  return (
    <div>
      <Navbar />
      <TaskList />
    </div>
  );
}
