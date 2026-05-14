import { Home, BrainCircuit, Dumbbell, Utensils, LayoutDashboard } from "lucide-react";
import Link from 'next/link';

export function Navigation() {
  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "AI Coach", href: "/coach", icon: BrainCircuit },
    { name: "Gym", href: "/gym", icon: Dumbbell },
    { name: "Diet", href: "/diet", icon: Utensils },
    { name: "Habits", href: "/habits", icon: LayoutDashboard },
  ];

  return (
    <>
      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full glass border-t border-white/10 pb-safe pt-2 px-2 z-50">
        <ul className="flex items-center justify-around h-16">
          {navItems.map((item) => (
            <li key={item.name} className="flex-1">
              <Link href={item.href} className="flex flex-col items-center justify-center space-y-1 w-full h-full text-slate-400 hover:text-cyan-400 transition-colors">
                <item.icon className="w-6 h-6" />
                <span className="text-[10px] uppercase font-medium tracking-wider">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop Sidebar */}
      <nav className="hidden md:flex ml-4 my-4 rounded-2xl w-24 lg:w-64 glass-card border-white/10 flex-col py-8 px-4 z-50 fixed h-[calc(100vh-2rem)]">
        <div className="flex items-center justify-center lg:justify-start gap-3 mb-10 px-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <span className="hidden lg:block font-display font-bold text-xl tracking-wide neon-text">LifeSync AI</span>
        </div>
        
        <ul className="flex flex-col space-y-4 flex-1 mt-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className="flex items-center justify-center lg:justify-start gap-4 p-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all group">
                <item.icon className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
                <span className="hidden lg:block font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
