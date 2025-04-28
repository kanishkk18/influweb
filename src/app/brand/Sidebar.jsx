"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Video } from 'lucide-react';


const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  

  return (
    <aside className={`h-screen z-50 sticky top-5 border-r pt-6 flex flex-col ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-in-out animate-slide-in-right`}>
      <div className="p-4 flex items-center justify-between border-b">
        {!collapsed && <span className="font-bold">Dashboard</span>}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          )}
        </Button>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {[
            { name: 'Dashboard', icon: 'layout', path: '/jobs' },
            { name: 'My Campaigns', icon: 'shopping-bag', path: '/campaigns' },
            { name: 'Influencers', icon: 'users', path: '/influencers' },
            // { name: 'Payments', icon: 'bar-chart-2', path: '/brand/payments' },
            // { name: 'Analytics', icon: 'bar-chart-2', path: '/brand/analytics' },
            { name: 'Videos', icon: 'Video', path: '/videos' },
           
            { name: 'Grading System', icon: 'bar-chart-2', path: '/grading' }, 
            { name: 'Settings', icon: 'settings', path: '/account' },
          ].map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors ${
                  pathname === item.path ? 'bg-muted' : ''
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 bg-blue-500 rounded-full p-1">
                  {item.icon === 'layout' && (
                    <>
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M3 9h18" />
                      <path d="M9 21V9" />
                    </>
                  )}
                  {item.icon === 'shopping-bag' && (
                    <>
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><polyline points="11 3 11 11 14 8 17 11 17 3"/>
                    </>
                  )}
                  {item.icon === 'users' && (
                    <>
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </>
                  )}
                  {item.icon === 'bar-chart-2' && (
                    <>
                      <path d="M18 20V10" />
                      <path d="M12 20V4" />
                      <path d="M6 20v-6" />
                    </>
                  )}
                  {item.icon === 'Video' && (
                    <>
                     <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>
                    </>
                  )}
                  {item.icon === 'settings' && (
                    <>
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                      <circle cx="12" cy="12" r="3" />
                    </>
                  )}
                </svg>
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <Link href="/create" className="p-4 border-t">
        <Button 
          variant="outline" 
          className={`w-full ${collapsed ? 'px-2' : ''}`}
        
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
          {!collapsed && <span>Create Order</span>}
        </Button>
      </Link>
    </aside>
  );
};

export default Sidebar;