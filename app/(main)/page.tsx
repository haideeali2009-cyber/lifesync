'use client';

import * as React from 'react';
import { useAuth } from '@/components/auth-provider';
import { motion } from 'motion/react';
import { Activity, Flame, Moon, CloudRain, BrainCircuit } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { userData } = useAuth();
  const userName = userData?.name || 'User';

  return (
    <div className="space-y-8 pb-10">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Good morning, <span className="neon-text">{userName}</span></h1>
          <p className="text-muted-foreground mt-1 text-sm">Your LifeSync score is looking great today.</p>
        </div>
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10">
          <div className="w-full h-full bg-cyan-900/40 flex items-center justify-center text-cyan-400 font-bold uppercase">
             {userName.substring(0, 2)}
          </div>
        </div>
      </header>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Life Score" value="94" unit="/ 100" icon={Activity} color="text-cyan-400" />
        <StatCard title="Calories Burned" value="650" unit="kcal" icon={Flame} color="text-orange-400" />
        <StatCard title="Sleep" value="7.2" unit="hrs" icon={Moon} color="text-indigo-400" />
        <StatCard title="Water" value="1.5" unit="L" icon={CloudRain} color="text-blue-400" />
      </div>

      {/* Central Ring and Quick Action */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6 space-y-6 flex flex-col justify-between relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full -mr-20 -mt-20"></div>
           <div>
             <h2 className="text-xl font-display font-semibold mb-2">Today&apos;s Progress</h2>
             <p className="text-sm text-slate-400">You are on track to crush your daily goals.</p>
           </div>
           
           <div className="flex justify-around items-center py-4">
             {/* Circular Progress placeholders */}
             <div className="w-32 h-32 rounded-full border-8 border-cyan-500/20 flex items-center justify-center relative">
               <div className="absolute inset-0 border-8 border-cyan-400 rounded-full border-t-transparent border-l-transparent transform -rotate-45"></div>
               <div className="text-center">
                 <span className="block text-2xl font-bold">75%</span>
                 <span className="block text-xs text-slate-400">Activity</span>
               </div>
             </div>
             
             <div className="w-32 h-32 rounded-full border-8 border-violet-500/20 flex items-center justify-center relative">
               <div className="absolute inset-0 border-8 border-violet-400 rounded-full border-t-transparent border-l-transparent transform rotate-45"></div>
               <div className="text-center">
                 <span className="block text-2xl font-bold">40%</span>
                 <span className="block text-xs text-slate-400">Diet</span>
               </div>
             </div>
           </div>
        </div>

        <Link href="/coach" className="glass-card p-6 flex flex-col items-center justify-center text-center space-y-4 group cursor-pointer hover:bg-white/5 transition-colors">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[2px]">
            <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center group-hover:bg-transparent transition-colors">
               <BrainCircuit className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg">AI Coach</h3>
            <p className="text-sm text-slate-400">Tap to start adjusting your routine</p>
          </div>
          <div className="px-6 py-2 bg-white text-black font-semibold rounded-full text-sm group-hover:scale-105 transition-transform">
            Talk to Coach
          </div>
        </Link>
      </div>
    </div>
  );
}

function StatCard({ title, value, unit, icon: Icon, color }: any) {
  return (
    <div className="glass p-4 rounded-2xl hover:bg-white/5 transition-colors group">
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`w-5 h-5 ${color} drop-shadow-md`} />
        <span className="text-xs font-medium text-slate-400 tracking-wide uppercase">{title}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-display font-bold group-hover:scale-105 transition-transform origin-left">{value}</span>
        <span className="text-sm text-slate-500">{unit}</span>
      </div>
    </div>
  );
}
