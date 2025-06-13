import { Target, Plus } from "lucide-react";
import TaskCard from "./TaskCard";
import type { Task } from "@/types/types";

const TaskList = ({
  tasks,
  isLoading,
  setEditingTask,
  setShowCreateForm,
}: any) => {
  if (isLoading) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2">
          Loading tasks...
        </p>
      </div>
    );
  }

  return (
    <>
      {tasks.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 mb-3 sm:mb-4">
            <Target className="h-6 w-6 sm:h-8 sm:w-8 text-slate-500" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-white mb-1 sm:mb-2">
            No tasks found
          </h3>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-3 sm:mb-4">
            Create your first task to get started
          </p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-sm sm:text-base"
          >
            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Create Task
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {tasks.map((task: Task) => (
            <TaskCard
              key={task._id}
              task={task}
              setEditingTask={setEditingTask}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default TaskList;
