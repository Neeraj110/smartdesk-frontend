
import { Calendar, CheckCircle2, Clock, TrendingUp } from "lucide-react";

const TaskStats = ({ stats }: any) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg border border-blue-500/20">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Total Tasks
            </p>
            <p className="text-lg sm:text-2xl font-bold text-slate-800 dark:text-white">
              {stats.total}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg border border-green-500/20">
            <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Completed
            </p>
            <p className="text-lg sm:text-2xl font-bold text-slate-800 dark:text-white">
              {stats.completed}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-lg border border-orange-500/20">
            <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Pending
            </p>
            <p className="text-lg sm:text-2xl font-bold text-slate-800 dark:text-white">
              {stats.pending}
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="p-1.5 sm:p-2 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg border border-purple-500/20">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Progress
            </p>
            <p className="text-lg sm:text-2xl font-bold text-slate-800 dark:text-white">
              {stats.completionRate}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;
