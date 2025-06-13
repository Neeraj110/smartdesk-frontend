/* eslint-disable @typescript-eslint/no-explicit-any */
import { Target, Sparkles } from "lucide-react";

const TaskHeader = ({ stats }: any) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-2">
        <div className="p-1.5 sm:p-2 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
          <Target className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">
          Task Manager
        </h1>
        <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-blue-700 dark:text-blue-300 border border-blue-500/20">
          <Sparkles className="h-3 w-3 sm:h-3 sm:w-3" />
          {stats.completionRate}% Complete
        </div>
      </div>
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
        Organize your tasks and boost productivity
      </p>
    </div>
  );
};

export default TaskHeader;
