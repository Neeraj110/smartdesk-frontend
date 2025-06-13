import { CheckCircle2, Circle, Edit3, Trash2, User, Clock } from "lucide-react";
import {
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "@/redux/tasks/taskApi";
import { toast } from "sonner";

const TaskCard = ({ task, setEditingTask }: any) => {
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleToggleCompletion = async () => {
    try {
      await updateTask({
        taskId: task._id,
        completed: !task.completed,
      }).unwrap();
      toast.success(
        `Task marked as ${task.completed ? "pending" : "completed"}`
      );
    } catch (error) {
      toast.error("Failed to update task status");
      console.error("Error updating task status:", error);
    }
  };

  const handleDeleteTask = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask({ taskId: task._id }).unwrap();
      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 overflow-hidden ${
        task.completed
          ? "border-green-200/50 dark:border-green-800/50 bg-green-50/30 dark:bg-green-900/10"
          : "border-slate-200/50 dark:border-slate-700/50"
      }`}
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-start gap-3 sm:gap-4">
          <button
            onClick={handleToggleCompletion}
            disabled={isUpdating}
            className={`flex-shrink-0 mt-0.5 sm:mt-1 transition-all duration-200 hover:scale-110 ${
              task.completed
                ? "text-green-600 dark:text-green-400"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            } ${isUpdating ? "opacity-50" : ""}`}
          >
            {task.completed ? (
              <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <Circle className="h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </button>
          <div className="flex-1 min-w-0">
            <h3
              className={`text-base sm:text-lg font-semibold transition-all mb-1 sm:mb-2 ${
                task.completed
                  ? "text-slate-500 dark:text-slate-400 line-through"
                  : "text-slate-800 dark:text-white"
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p
                className={`text-xs sm:text-sm mb-2 sm:mb-3 ${
                  task.completed
                    ? "text-slate-400 dark:text-slate-500"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                {task.description}
              </p>
            )}
            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-xs text-slate-500 dark:text-slate-500">
              <span className="flex items-center gap-1">
                <User className="h-3 w-3 sm:h-3 sm:w-3" />
                {task.userId.name}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3 sm:h-3 sm:w-3" />
                {formatDate(task.createdAt)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setEditingTask(task)}
              className="p-1.5 sm:p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Edit3 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
            <button
              onClick={handleDeleteTask}
              className="p-1.5 sm:p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-600 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
