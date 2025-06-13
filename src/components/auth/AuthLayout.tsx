"use client";

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/components/contexts/ThemeContext";
import {
  Moon,
  Sun,
  Sparkles,
  Shield,
  Zap,
  BarChart3,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface AuthLayoutProps {
  formSide: "left" | "right";
  form: ReactNode;
  title: string;
  subtitle: string;
  description: string;
}

export function AuthLayout({
  formSide,
  form,
  title,
  subtitle,
  description,
}: AuthLayoutProps) {
  const { theme, toggleTheme } = useTheme();

  const BrandSection = () => (
    <div className="flex flex-col items-center justify-center p-8 lg:p-12 text-center relative ">
      <div className="relative z-10 mb-8">
        <div className="mx-auto mb-6 flex items-center justify-center">
          <div className=" flex h-20 w-20 items-center  justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-2xl transform  transition-transform duration-300">
            <span className="text-2xl font-bold">SD</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent lg:text-4xl mb-2">
          SmartDesk
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 font-medium">
          {subtitle}
        </p>
      </div>

      <div className="relative z-10 max-w-md space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 border border-blue-200 dark:border-blue-700/50 shadow-sm">
          <Sparkles className="h-4 w-4 text-blue-500 animate-pulse" />
          AI-Powered Productivity
        </div>

        <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
          {description}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50">
                <Shield className="h-3 w-3 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                Smart Tasks
              </span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/50">
                <Zap className="h-3 w-3 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                AI Summaries
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/50">
                <Clock className="h-3 w-3 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                Pomodoro
              </span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/50">
                <BarChart3 className="h-3 w-3 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-slate-700 dark:text-slate-300 font-medium">
                Analytics
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const FormSection = () => (
    <div className="flex flex-col justify-center p-8 lg:p-12">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8 text-center lg:text-left">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent lg:text-3xl mb-2">
            {title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            {subtitle}
          </p>
        </div>
        {form}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 ">
      <nav className="sticky top-0 left-0 right-0 z-50 p-4 lg:p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-sm opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                SD
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              SmartDesk
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => toggleTheme()}
            className="rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-slate-700 dark:text-slate-300" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700 dark:text-slate-300" />
            )}
          </Button>
        </div>
      </nav>

      <div className="min-h-screen pt-5 lg:pt-0">
        <div className="flex flex-col w-full lg:hidden ">
          <div className="p-4">
            <Card className="border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-xl">
              <FormSection />
            </Card>
          </div>
        </div>

        <div className="hidden w-full lg:flex min-h-screen">
          {formSide === "left" ? (
            <>
              <div className="flex w-1/2 items-center justify-center bg-white dark:bg-slate-900 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800"></div>
                <Card className="relative z-10 m-8 w-full max-w-lg border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-2xl">
                  <FormSection />
                </Card>
              </div>

              <div className="flex w-1/2 items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-indigo-900/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50 dark:from-blue-900/30 dark:to-purple-900/30"></div>
                <div className="relative z-10">
                  <BrandSection />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex w-1/2 items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-indigo-900/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50 dark:from-blue-900/30 dark:to-purple-900/30"></div>
                <div className="relative z-10">
                  <BrandSection />
                </div>
              </div>

              <div className="flex w-1/2 items-center justify-center bg-white dark:bg-slate-900 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800"></div>
                <Card className="relative z-10 m-8 w-full max-w-lg border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm shadow-2xl">
                  <FormSection />
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
