'use client'; // Required for client-side hooks and interactivity

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Video, 
  Users, 
  Briefcase, 
  MessageSquare,
  ArrowLeft,
  Settings,
  Search,
  ChevronRight
} from 'lucide-react';
import { usePathname } from 'next/navigation';

const AdminLayout = ({ children, title }) => {
  const pathname = usePathname();
  
  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <div className="min-h-screen mt-6 flex flex-col bg-gradient-to-br from-gray-900 to-gray-950 dark:from-gray-950 dark:to-black text-white">
      {/* Admin Header */}
      <header className="bg-black/50 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-20 rounded-full flex items-center justify-center ">
              <img src="https://res.cloudinary.com/dna3hwzre/image/upload/v1741412694/karv81oea0dngca9xnvn.png" alt="" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Admin Panel</h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* <div className="relative max-w-md w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                type="search" 
                placeholder="Search..." 
                className="pl-9 bg-white/5 border-white/10 focus:border-blue-500 text-white h-9"
              />
            </div> */}
            <Button variant="outline" className="border-white/10 hover:bg-white/10 text-white bg-black dark:bg-background" asChild>
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Main App
              </Link>
            </Button>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Admin Sidebar */}
        <aside className="w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 shadow-lg">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/admin" 
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive("/admin") 
                      ? "bg-gradient-to-r from-blue-600/50 to-purple-600/50 border border-white/20 shadow-md font-medium" 
                      : "hover:bg-white/10"
                  }`}
                >
                  <BarChart3 className={`h-5 w-5 ${isActive("/admin") ? "text-blue-300" : "text-gray-300"}`} />
                  <span>Dashboard</span>
                  {isActive("/admin") && <ChevronRight className="h-4 w-4 ml-auto text-blue-300" />}
                </Link>
              </li>
              <li>
                <Link 
                  href="/AdminVideos" 
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive("/AdminVideos") 
                      ? "bg-gradient-to-r from-blue-600/50 to-purple-600/50 border border-white/20 shadow-md font-medium" 
                      : "hover:bg-white/10"
                  }`}
                >
                  <Video className={`h-5 w-5 ${isActive("/AdminVideos") ? "text-blue-300" : "text-gray-300"}`} />
                  <span>Videos</span>
                  {isActive("/AdminVideos") && <ChevronRight className="h-4 w-4 ml-auto text-blue-300" />}
                </Link>
              </li>
              <li>
                <Link 
                  href="/AdminInfluencers" 
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive("/AdminInfluencers") 
                      ? "bg-gradient-to-r from-blue-600/50 to-purple-600/50 border border-white/20 shadow-md font-medium" 
                      : "hover:bg-white/10"
                  }`}
                >
                  <Users className={`h-5 w-5 ${isActive("/AdminInfluencers") ? "text-blue-300" : "text-gray-300"}`} />
                  <span>Influencers</span>
                  {isActive("/AdminInfluencers") && <ChevronRight className="h-4 w-4 ml-auto text-blue-300" />}
                </Link>
              </li>
              {/* <li>
                <Link 
                  href="/AdminJobs" 
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive("/AdminJobs") 
                      ? "bg-gradient-to-r from-blue-600/50 to-purple-600/50 border border-white/20 shadow-md font-medium" 
                      : "hover:bg-white/10"
                  }`}
                >
                  <Briefcase className={`h-5 w-5 ${isActive("/AdminJobs") ? "text-blue-300" : "text-gray-300"}`} />
                  <span>Jobs</span>
                  {isActive("/AdminJobs") && <ChevronRight className="h-4 w-4 ml-auto text-blue-300" />}
                </Link>
              </li> */}
              <li>
                <Link 
                  href="/AdminCampaigns" 
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive("/AdminCampaigns") 
                      ? "bg-gradient-to-r from-blue-600/50 to-purple-600/50 border border-white/20 shadow-md font-medium" 
                      : "hover:bg-white/10"
                  }`}
                >
                  <MessageSquare className={`h-5 w-5 ${isActive("/AdminCampaigns") ? "text-blue-300" : "text-gray-300"}`} />
                  <span>Campaigns</span>
                  {isActive("/AdminCampaigns") && <ChevronRight className="h-4 w-4 ml-auto text-blue-300" />}
                </Link>
              </li>
            </ul>
            
            {/* <div className="mt-8 pt-6 border-t border-white/10">
              <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">API Routes</h3>
              <div className="bg-black/30 rounded-lg p-3 text-xs font-mono">
                <p className="mb-1 text-green-400 flex items-center"><span className="bg-green-950/50 px-1 mr-2 rounded text-xs">GET</span>/api/v1/admin/stats</p>
                <p className="mb-1 text-blue-400 flex items-center"><span className="bg-blue-950/50 px-1 mr-2 rounded text-xs">GET</span>/api/v1/admin/videos</p>
                <p className="mb-1 text-yellow-400 flex items-center"><span className="bg-yellow-950/50 px-1 mr-2 rounded text-xs">PUT</span>/api/v1/admin/videos/:id</p>
                <p className="mb-1 text-red-400 flex items-center"><span className="bg-red-950/50 px-1 mr-2 rounded text-xs">DEL</span>/api/v1/admin/videos/:id</p>
                <p className="mb-1 text-purple-400 flex items-center"><span className="bg-purple-950/50 px-1 mr-2 rounded text-xs">POST</span>/api/v1/admin/videos/approve/:id</p>
              </div>
            </div> */}
          </nav>
        </aside>
        
        {/* Admin Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">{title}</h1>
            <div className="flex items-center space-x-2">
              <Link href="/account">
              <Button size="sm" variant="outline" className="border-white/10 bg-black dark:bg-background hover:bg-white/10 text-white">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              </Link>
            </div>
          </div>
          <div className="space-y-6 pb-10 ">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;