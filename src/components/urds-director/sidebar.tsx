"use client";

import { Atom, Megaphone, ListTodo, User, LayoutDashboard, Menu, X } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

const sidebarItems = [
  { icon: User, label: 'Profile', color: 'from-emerald-400 to-emerald-600', route: '/URDS/Artnomer/D-PROFILE' },
  { icon: LayoutDashboard, label: 'Main Dashboard', color: 'from-red-500 to-pink-600', route: '/URDS/Mamas/URDS-LP' },
  { icon: Megaphone, label: 'Announcements', color: 'from-cyan-400 to-blue-500', route: '/URDS/Mamas/ANNOUNCEMENTS' },
  { icon: Atom, label: 'Colleges', color: 'from-yellow-400 to-orange-500', route: '/URDS/Artnomer/COLLEGES' },
  { icon: ListTodo, label: 'Proposals', color: 'from-purple-400 to-purple-600', route: '/URDS/Artnomer/PROPOSALS' }
];

export default function URDSSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeTab = sidebarItems.findIndex(item => item.route === pathname);

  const handleNavigation = (route: string) => {
    router.push(route);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Hamburger Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden fixed top-4 right-4 z-[9999] w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center"
      >
        {isMenuOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-16 right-4 z-[9998] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden w-56">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.route)}
              className={`w-full px-4 py-3 flex items-center gap-3 transition-all duration-200 ${
                activeTab === index
                  ? 'bg-gradient-to-r ' + item.color + ' text-white'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Desktop Sidebar - Hidden on Mobile */}
      <div className="hidden md:flex w-20 bg-white py-6 flex-col items-center gap-2 fixed left-4 top-4 bottom-4 z-[9999] shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-3xl border border-gray-100">
        
        <div className="w-16 h-16 bg-linear-to-br rounded-xl flex items-center justify-center mb-6">
          <img 
             src="/images/logo/URDS-logo.png" 
             alt="URDS Logo" 
             className="w-25 h-25 object-contain" 
          />
        </div>

        <div className="flex flex-col gap-3 flex-1 relative">
          {sidebarItems.map((item, index) => (
            <button
              key={index}
              onClick={() => router.push(item.route)}
              className={`relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group -mr-4 ml-auto transform translate-x-4 hover:translate-x-6 ${
                activeTab === index 
                  ? 'bg-linear-to-br ' + item.color + ' shadow-[0_8px_25px_rgba(0,0,0,0.25)] scale-110 z-20' 
                  : 'bg-white shadow-[0_4px_15px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)] z-10'
              }`}
            >
              <item.icon className={`w-7 h-7 ${activeTab === index ? 'text-white' : 'text-gray-500'}`} />
              <div className="absolute left-20 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30">
                {item.label}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-auto">
          <img src="/images/logo/UEPlogo.png" alt="UEP Logo" className="w-16 h-16 -mb-1 object-contain"/>
        </div>
      </div>
    </>
  );
}
