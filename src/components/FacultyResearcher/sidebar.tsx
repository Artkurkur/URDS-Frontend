"use client";

import { 
  LayoutDashboard, 
  Megaphone, 
  FileStack,      // Files 
  MessageCircle,  // Feedback
  User            // Profile
} from 'lucide-react';

import { useRouter, usePathname } from 'next/navigation';

// === UPDATED SIDEBAR ITEMS ===
const sidebarItems = [
  { icon: User, label: 'Profile', color: 'from-emerald-400 to-emerald-600', route: '/URDS/Artnomer/FR-PROFILE' },
  { icon: LayoutDashboard, label: 'Main Dashboard', color: 'from-red-500 to-pink-600', route: '/URDS/Gerald/FRD-MAIN' },
  { icon: Megaphone, label: 'Announcements', color: 'from-cyan-400 to-blue-500', route: '/URDS/Gerald/FRD-ANNOUNCEMENT' },
  { icon: FileStack, label: 'Files', color: 'from-yellow-400 to-orange-500', route: '/URDS/Gerald/FRD-FILES' },
  { icon: MessageCircle, label: 'Feedback', color: 'from-purple-400 to-purple-600', route: '/URDS/Artnomer/FEEDBACK' },
];

export default function URDSSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const activeTab = sidebarItems.findIndex(item => item.route === pathname);

  return (
    <div className="w-20 bg-white py-6 flex flex-col items-center gap-2 fixed left-4 top-4 bottom-4 z-10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-3xl border border-gray-100">

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
        <img src="/images/logo/UEPlogo.png" alt="URDS Logo" className="w-16 h-16 -mb-1 object-contain"/>
      </div>
    </div>
  );
}
