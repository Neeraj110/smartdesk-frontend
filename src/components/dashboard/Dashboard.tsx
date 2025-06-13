import React, { useState, useEffect } from "react";
import {
  BarChart3,
  CheckCircle2,
  Clock,
  FileText,
  Brain,
  Play,
  Pause,
  RotateCcw,
  Timer,
  Target,
  TrendingUp,
  Calendar,
  Zap,
  Settings,
} from "lucide-react";
import { useGetStatsQuery } from "@/redux/user/userApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { StatsData } from "@/types/types";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const { data: statsResponse, isLoading } = useGetStatsQuery();
  const stats: StatsData = statsResponse?.data || {
    totalNotes: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    aiLearnings: 0,
  };
  const navigate = useNavigate();
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [currentSession, setCurrentSession] = useState(1);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime((time) => time - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setIsRunning(false);
      if (!isBreak) {
        setSessions((prev) => prev + 1);
        setCurrentSession((prev) => prev + 1);
        setPomodoroTime(5 * 60);
        setIsBreak(true);
      } else {
        setPomodoroTime(25 * 60);
        setIsBreak(false);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, pomodoroTime, isBreak]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setPomodoroTime(isBreak ? 5 * 60 : 25 * 60);
  };

  const completionRate =
    stats.totalTasks > 0
      ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
      : 0;

  const StatCard = ({
    title,
    value,
    icon: Icon,
    gradient,
    description,
  }: {
    title: string;
    value: number;
    icon: React.ElementType;
    gradient: string;
    description: string;
  }) => (
    <Card className="group bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-300">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${gradient}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          {value}
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {description}
        </p>
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 dark:border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  const actionBtns = [
    {
      title: "Create Note",
      icon: FileText,
      color:
        "border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400",
      handleClick: () => navigate("/dashboard/notes"),
    },
    {
      title: "Add Task",
      icon: Target,
      color:
        "border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-600 dark:text-purple-400",
      handleClick: () => navigate("/dashboard/tasks"),
    },
    {
      title: "AI Learning",
      icon: Brain,
      color:
        "border-green-200 dark:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 text-green-600 dark:text-green-400",
      handleClick: () => navigate("/dashboard/ai-learning"),
    },
    {
      title: "Settings",
      icon: Settings,
      color:
        "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400",
      handleClick: () => toast.info("Settings coming soon!"),
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 sm:p-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 dark:from-purple-500/10 dark:to-pink-600/10 border border-blue-500/20 dark:border-purple-500/20">
              <BarChart3 className="h-6 w-6 text-blue-500 dark:text-purple-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
              Dashboard
            </h1>
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-600/10 dark:from-purple-500/10 dark:to-pink-600/10 px-3 py-1 text-sm font-medium text-blue-600 dark:text-purple-500 border border-blue-500/20 dark:border-purple-500/20">
              <TrendingUp className="h-3 w-3" />
              Analytics Overview
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Track your productivity and manage your time effectively
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <StatCard
            title="Total Notes"
            value={stats.totalNotes}
            icon={FileText}
            gradient="bg-gradient-to-r from-blue-500 to-blue-600"
            description="AI-powered summaries"
          />
          <StatCard
            title="Total Tasks"
            value={stats.totalTasks}
            icon={Target}
            gradient="bg-gradient-to-r from-purple-500 to-purple-600"
            description="All your tasks"
          />
          <StatCard
            title="Completed Tasks"
            value={stats.completedTasks}
            icon={CheckCircle2}
            gradient="bg-gradient-to-r from-green-500 to-green-600"
            description={`${completionRate}% completion rate`}
          />
          <StatCard
            title="AI Learning Guides"
            value={stats.aiLearnings}
            icon={Brain}
            gradient="bg-gradient-to-r from-pink-500 to-pink-600"
            description="Personalized learning"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
                <TrendingUp className="h-5 w-5 text-blue-500 dark:text-purple-500" />
                Progress Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Task Completion
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {stats.completedTasks}/{stats.totalTasks}
                  </span>
                </div>
                <Progress
                  value={completionRate}
                  className="h-2 bg-slate-800 dark:bg-slate-100"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {completionRate}% of tasks completed
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700/50">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {stats.completedTasks}
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-400">
                    Completed
                  </div>
                </div>
                <div className="text-center p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50">
                  <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {stats.pendingTasks}
                  </div>
                  <div className="text-xs text-yellow-600 dark:text-yellow-400">
                    Pending
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pomodoro Timer */}
          <Card className="bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
                <Timer className="h-5 w-5 text-red-500" />
                Pomodoro Timer
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="relative">
                <div className="w-32 h-32 mx-auto rounded-full border-8 border-slate-200 dark:border-slate-700 flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                      {formatTime(pomodoroTime)}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {isBreak ? "Break Time" : "Focus Time"}
                    </div>
                  </div>
                </div>
                {isRunning && (
                  <div className="absolute inset-0 rounded-full border-8 border-red-500 animate-pulse"></div>
                )}
              </div>

              <div className="flex items-center justify-center gap-3">
                <Button
                  onClick={handlePlayPause}
                  className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
                    isRunning
                      ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                      : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  } text-white transition-all duration-200`}
                >
                  {isRunning ? (
                    <>
                      <Pause className="h-4 w-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Start
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="px-4 py-2 rounded-lg flex items-center gap-2 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </Button>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="text-center">
                  <div className="font-semibold text-slate-800 dark:text-slate-100">
                    {sessions}
                  </div>
                  <div className="text-slate-500 dark:text-slate-400">
                    Sessions
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-slate-800 dark:text-slate-100">
                    {currentSession}
                  </div>
                  <div className="text-slate-500 dark:text-slate-400">
                    Current
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-slate-800 dark:text-slate-100">
                    25:00
                  </div>
                  <div className="text-slate-500 dark:text-slate-400">
                    Duration
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
              <Zap className="h-5 w-5 text-yellow-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {actionBtns.map((btn, index) => (
                <Button
                  key={index}
                  className={`h-16 flex flex-col items-center gap-2 border ${btn.color} 
                  hover:shadow-lg transition-all duration-200 rounded-lg`}
                  onClick={btn.handleClick}
                >
                  <btn.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{btn.title}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
              <Calendar className="h-5 w-5 text-indigo-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400">
                Your recent activity will appear here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
