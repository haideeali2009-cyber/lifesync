'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { Apple, Utensils, Droplets, Target } from 'lucide-react';
import { useAuth } from '@/components/auth-provider';

export default function DietPage() {
  const { userData } = useAuth();
  
  return (
    <div className="space-y-8 pb-10">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Nutrition <span className="neon-text">Core</span></h1>
          <p className="text-muted-foreground mt-1 text-sm">Monitor your metabolic fuel.</p>
        </div>
      </header>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MacroCard title="Calories" current={1450} target={2200} unit="kcal" color="bg-cyan-500" icon={Utensils} />
        <MacroCard title="Protein" current={85} target={140} unit="g" color="bg-violet-500" icon={Apple} />
        <MacroCard title="Carbs" current={120} target={200} unit="g" color="bg-orange-500" icon={Target} />
        <MacroCard title="Fat" current={45} target={70} unit="g" color="bg-blue-500" icon={Droplets} />
      </div>

      {/* Meals Log */}
      <div className="glass-card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-display font-semibold">Today&apos;s Log</h2>
          <button className="text-xs font-semibold text-cyan-400 hover:text-cyan-300">+ Log Meal</button>
        </div>
        
        <div className="space-y-4">
           {/* Placeholder Meals */}
           <MealItem name="Cyberpunk Protein Shake" calories={320} macros="30g P • 20g C • 5g F" time="08:00 AM" />
           <MealItem name="Grilled Salmon Bowl" calories={540} macros="45g P • 50g C • 18g F" time="01:30 PM" />
           
           <div className="border border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-500 hover:bg-white/5 transition-colors cursor-pointer group">
             <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
               <span className="text-xl">+</span>
             </div>
             <span className="text-sm">Scan food with AI</span>
           </div>
        </div>
      </div>
    </div>
  );
}

function MacroCard({ title, current, target, unit, color, icon: Icon }: any) {
  const percentage = Math.min(100, Math.round((current / target) * 100));
  
  return (
    <div className="glass p-5 rounded-2xl relative overflow-hidden group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
           <Icon className="w-5 h-5 text-slate-400" />
           <span className="font-semibold tracking-wide text-sm">{title}</span>
        </div>
        <span className="text-2xl font-bold tracking-tight">{current}<span className="text-sm text-slate-500 font-normal">/{target}</span></span>
      </div>
      
      {/* Progress Bar */}
      <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: `${percentage}%` }} 
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full ${color} shadow-[0_0_10px_currentColor]`} 
        />
      </div>
    </div>
  );
}

function MealItem({ name, calories, macros, time }: any) {
  return (
    <div className="glass flex items-center justify-between p-4 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
      <div>
        <h3 className="font-semibold text-slate-200">{name}</h3>
        <p className="text-xs text-slate-400 mt-1">{macros}</p>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold text-cyan-400">{calories} <span className="text-xs text-slate-500 font-normal uppercase">kcal</span></div>
        <div className="text-xs text-slate-500">{time}</div>
      </div>
    </div>
  )
}
