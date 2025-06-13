import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckSquare,
  Clock,
  Moon,
  Sparkles,
  Sun,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "@/components/contexts/ThemeContext";
import { Link } from "react-router-dom";

function HomePage() {
  const { toggleTheme, theme } = useTheme();

  const features = [
    {
      icon: CheckSquare,
      title: "Smart Task Management",
      description:
        "Organize and prioritize your tasks with intelligent categorization and progress tracking.",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Brain,
      title: "AI-Powered Notes",
      description:
        "Take notes and get instant AI summaries to capture key insights and information.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Clock,
      title: "Pomodoro Timer",
      description:
        "Stay focused with built-in Pomodoro sessions and productivity time tracking.",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description:
        "Track your productivity patterns with detailed statistics and visual reports.",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  const stats = [
    { label: "Tasks Completed", value: "10K+", icon: CheckSquare },
    { label: "Hours Focused", value: "5K+", icon: Clock },
    { label: "Notes Created", value: "2K+", icon: Brain },
    { label: "Productivity Boost", value: "85%", icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br  dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* NavBar */}
      <nav className="sticky top-2 sm:top-4 z-50 mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-16">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-full shadow-lg">
          <div className="flex h-12 sm:h-14 md:h-16 items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-shrink-0">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 font-bold text-xs sm:text-sm md:text-base text-white shadow-md">
                SD
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm sm:text-lg md:text-xl font-bold text-slate-800 dark:text-white truncate">
                  SmartDesk
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400 hidden md:block sm:block xs:block">
                  AI Productivity Hub
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600 dark:text-slate-300" />
                ) : (
                  <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600 dark:text-slate-300" />
                )}
              </Button>

              <Button
                asChild
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg rounded-full px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <Link to="/dashboard" className="flex items-center">
                  <span className="text-xs sm:text-sm md:text-base font-semibold">
                    <span className=" xs:inline">Get Started</span>
                  </span>
                  <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="overflow-hidden py-20 lg:py-25">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 text-sm font-medium dark:text-white border border-blue-500/20">
                <Sparkles className="h-4 w-4 text-blue-500" />
                AI-Powered Productivity Platform
              </div>
              <h1 className="mb-6 text-4xl font-bold  dark:text-white sm:text-5xl lg:text-6xl">
                Supercharge Your
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Productivity
                </span>
                <p className="my-8 text-lg  sm:text-xl lg:text-2xl max-w-3xl mx-auto">
                  Transform your workflow with SmartDesk's AI-powered tools.
                  Manage tasks, take intelligent notes, track time, and boost
                  your productivity like never before.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-xl text-lg px-8 py-6"
                  >
                    <Link to="/dashboard">
                      Start Your Journey
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="dark:border-slate-500 border-slate-800/50 hover:bg-muted/50 text-lg px-8 py-6"
                  >
                    Learn More
                  </Button>
                </div>
              </h1>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 lg:py-25 dark:text-white dark:bg-[#020817] ">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl mb-4">
                Everything You Need to
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Succeed
                </span>
              </h2>
              <p className="text-lg  sm:text-xl">
                Powerful features designed to streamline your workflow and
                maximize your potential.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group border-slate-800/50  backdrop-blur-sm  transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 dark:bg-slate-800/60"
                >
                  <CardHeader className="pb-4">
                    <div
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl font-semibold  group-hover:text-blue-500 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 lg:py-25  dark:text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 className="text-3xl font-bold  sm:text-4xl mb-4">
                Trusted by Productive People
              </h2>
              <p className="text-lg ">
                Join thousands of users who have transformed their productivity
                with SmartDesk.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 dark:text-white dark:bg-[#020817] ">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <Card className="border-slate-800/50 bg-gradient-to-br dark:from-[#334155] to-slate-50/10 backdrop-blur-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
                <CardContent className=" p-12 lg:p-16 text-center">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 text-sm font-medium  border border-blue-500/20">
                    <Zap className="h-4 w-4 text-blue-500" />
                    Ready to Get Started?
                  </div>
                  <h2 className="text-3xl font-bold sm:text-4xl lg:text-[2.9rem] mb-6">
                    Transform Your Productivity
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                      {" "}
                      Today
                    </span>
                  </h2>
                  <p className="text-lg mb-8 max-w-2xl mx-auto">
                    Join the productivity revolution. Start organizing your
                    tasks, taking smarter notes, and achieving more with
                    AI-powered insights.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-xl text-lg px-8 py-6"
                  >
                    <Link to="/dashboard">
                      Enter Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/50  py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0 dark:text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-sm">
                SD
              </div>
              <span className="text-lg font-semibold ">SmartDesk</span>
            </div>
            <div className="text-sm dark:text-slate-400">
              © 2024 SmartDesk. Empowering productivity with AI.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
