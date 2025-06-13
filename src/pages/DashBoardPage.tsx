import Sidebar from "@/components/sidebar/Sidebar";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useSidebar } from "@/components/contexts/SidebarContext";

function DashBoardPage() {
  const { isOpen } = useSidebar();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar />

      <div
        className={`transition-all duration-300 ${
          isOpen ? "md:ml-72" : "md:ml-20"
        }`}
      >
        <div className="p-4 md:p-6 pb-20 md:pb-6">
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Loading...
                  </p>
                </div>
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default DashBoardPage;
