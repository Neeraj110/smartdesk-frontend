import { Search, Plus } from "lucide-react";

const TaskControls = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  setShowCreateForm,
}: any) => {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
      <div className="flex-1 relative">
        <Search className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-3.5 w-3.5 sm:h-4 sm:w-4" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-sm sm:text-base"
        />
      </div>
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-sm sm:text-base"
      >
        <option value="all">All Tasks</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <button
        onClick={() => setShowCreateForm(true)}
        className="flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 text-sm sm:text-base"
      >
        <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        Add Task
      </button>
    </div>
  );
};

export default TaskControls;
