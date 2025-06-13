"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Ghost } from "lucide-react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 dark:text-white">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border border-border backdrop-blur-md">
          <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-muted shadow-inner hover:scale-105 transition-transform duration-300">
              <Ghost className="h-8 w-8 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
            <p className="text-muted-foreground">
              Sorry, the page you are looking for does not exist.
            </p>
            <Button onClick={() => navigate("/")} className="mt-2">
              Go Back Home
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
