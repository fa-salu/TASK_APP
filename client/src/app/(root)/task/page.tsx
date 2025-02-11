import Navbar from "@/components/navbar/navbar";
import TaskList from "@/components/task/taskList";
import React from "react";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex flex-col overflow-hidden pt-14 md:pt-16">
        <TaskList />
      </div>
    </div>
  );
}
