import { NavLink } from "react-router-dom";
import {
  BookOpen,
  CheckSquare,
  User,
  LayoutDashboard,
  Menu,
  Sun,
  Moon,
  Sparkles,
} from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { useTheme } from "@/components/contexts/ThemeContext";
import { useSidebar } from "@/components/contexts/SidebarContext";

const navItems = [
  {
    path: "/dashboard/overview",
    label: "Home",
    icon: <LayoutDashboard className="h-5 w-5" />,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
  },
  {
    path: "/dashboard/notes",
    label: "Notes",
    icon: <BookOpen className="h-5 w-5" />,
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
  },
  {
    path: "/dashboard/tasks",
    label: "Tasks",
    icon: <CheckSquare className="h-5 w-5" />,
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "bg-gradient-to-br from-green-500/10 to-emerald-500/10",
  },
  {
    path: "/dashboard/ai-learning",
    label: "AI",
    icon: <Sparkles className="h-5 w-5" />,
    gradient: "from-yellow-500 to-orange-500",
    bgGradient: "bg-gradient-to-br from-yellow-500/10 to-orange-500/10",
  },
  {
    path: "/dashboard/profile",
    label: "Profile",
    icon: <User className="h-5 w-5" />,
    gradient: "from-slate-600 to-slate-800",
    bgGradient: "bg-gradient-to-br from-slate-500/10 to-slate-700/10",
  },
];

function Sidebar() {
  const { user } = useSelector((state: RootState) => state.user);
  const { isOpen, setIsOpen } = useSidebar();
  const { toggleTheme, theme } = useTheme();

  return (
    <>
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav
        className={`hidden md:flex flex-col h-screen fixed top-0 left-0 transition-all duration-300 z-40 ${
          isOpen ? "w-72" : "w-20"
        } bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 shadow-xl`}
      >
        <div className="p-4 border-b border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 border border-blue-500/20 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 hover:scale-105"
            >
              <Menu className="h-5 w-5" />
            </button>

            {isOpen && (
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-sm shadow-lg flex-shrink-0">
                  SD
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-lg font-bold text-slate-800 dark:text-white truncate">
                    SmartDesk
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    AI Productivity Hub
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {isOpen && (
          <div className="px-4 py-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 border border-blue-500/20">
              <Sparkles className="h-3 w-3 text-blue-500" />
              AI-Powered
            </div>
          </div>
        )}

        <div className="flex-1 px-4 py-2 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                      isOpen ? "justify-start" : "justify-center"
                    } ${
                      isActive
                        ? `bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 scale-[1.02]`
                        : `text-slate-700 dark:text-slate-200 hover:bg-gradient-to-br ${item.bgGradient} hover:shadow-md hover:scale-[1.01] border border-transparent hover:border-slate-200/50 dark:hover:border-slate-600/50`
                    }`
                  }
                >
                  <div
                    className={`flex items-center justify-center flex-shrink-0 ${
                      !isOpen ? "w-full" : ""
                    }`}
                  >
                    {item.label === "Profile" ? (
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="bg-gradient-to-br from-slate-600 to-slate-800 text-white text-xs">
                          {user?.name?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <span className="group-hover:scale-110 transition-transform duration-200">
                        {item.icon}
                      </span>
                    )}
                  </div>
                  {isOpen && (
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium truncate">
                        {item.label}
                      </span>
                    </div>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50 space-y-3">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-xl bg-gradient-to-br from-slate-100/50 to-slate-200/50 dark:from-slate-700/50 dark:to-slate-600/50 hover:from-slate-200/80 hover:to-slate-300/80 dark:hover:from-slate-600/80 dark:hover:to-slate-500/80 border border-slate-200/50 dark:border-slate-600/50 transition-all duration-200 hover:scale-105 ${
              isOpen ? "w-full justify-start" : "w-10 h-10 justify-center"
            }`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <div
              className={`flex items-center ${
                isOpen ? "gap-2" : "justify-center"
              }`}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-500 flex-shrink-0" />
              ) : (
                <Moon className="h-4 w-4 text-slate-600 flex-shrink-0" />
              )}
              {isOpen && (
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </span>
              )}
            </div>
          </Button>

          {isOpen && (
            <div className="p-3 rounded-xl bg-gradient-to-br from-slate-100/50 to-slate-200/50 dark:from-slate-700/50 dark:to-slate-600/50 border border-slate-200/50 dark:border-slate-600/50">
              <div className="flex items-center gap-3 min-w-0">
                <Avatar className="h-8 w-8 border-2 border-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-slate-800 dark:text-white truncate">
                    {user?.name || "User"}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Premium User
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-700/50 z-50 shadow-lg">
        <div className="flex justify-around py-2 px-5 ">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 w-[3.5rem] ${
                  isActive
                    ? `bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105`
                    : `text-slate-600 dark:text-slate-300 hover:bg-gradient-to-br ${item.bgGradient} hover:scale-105`
                }`
              }
            >
              <div className="mb-1">
                {item.label === "Profile" ? (
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="bg-gradient-to-br from-slate-600 to-slate-800 text-white text-xs">
                      {user?.name?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  item.icon
                )}
              </div>
              <span className="text-xs font-medium truncate max-w-[40px]">
                {item.label}
              </span>
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
