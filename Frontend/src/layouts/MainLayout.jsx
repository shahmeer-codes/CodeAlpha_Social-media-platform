import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col">
      <Navbar />

      <div className="mx-auto w-full max-w-7xl flex-1 px-0 sm:px-4 lg:px-8 pt-16 pb-16 lg:pb-0">
        <div className="flex  gap-8 items-start w-full">
          <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-80 border-r border-border bg-surface">
            <Sidebar />
          </aside>

          <main className="flex-1 lg:ml-80 h-full overflow-y-auto bg-background">
            <div className="mx-auto w-full max-w-4xl px-6 py-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default MainLayout;
