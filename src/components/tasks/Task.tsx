/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from "react";
import { useGetTasksQuery } from "@/redux/tasks/taskApi";
import TaskHeader from "./TaskHeader";
import TaskStats from "./TaskStats";
import TaskControls from "./TaskControls";
import TaskList from "./TaskList";
import TaskFormModal from "./TaskFormModal";
import type { Task } from "@/types/types";

const Tasks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const { data, isLoading: isFetchingTasks } = useGetTasksQuery();

  const tasks = data?.data|| [];
  
  

  const filteredTasks = useMemo(() => {
    return tasks.filter((task:Task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        filterStatus === "all" ||
        (filterStatus === "completed" && task.completed) ||
        (filterStatus === "pending" && !task.completed);

      return matchesSearch && matchesFilter;
    });
  }, [tasks, searchTerm, filterStatus]);

  // Calculate stats
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task:Task) => task.completed).length;
    const pending = total - completed;
    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pending, completionRate };
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <TaskHeader stats={stats} />
        <TaskStats stats={stats} />
        <TaskControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          setShowCreateForm={setShowCreateForm}
        />
        <TaskList
          tasks={filteredTasks}
          isLoading={isFetchingTasks}
          setEditingTask={setEditingTask}
          setShowCreateForm={setShowCreateForm}
        />
        {(showCreateForm || editingTask) && (
          <TaskFormModal
            task={editingTask}
            onClose={() => {
              setShowCreateForm(false);
              setEditingTask(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Tasks;
