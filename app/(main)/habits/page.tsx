'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Circle, Trophy, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/components/auth-provider';

export default function HabitsPage() {
  const { userData } = useAuth();
  
  const [habits, setHabits] = React.useState([
    { id: 1, title: 'Morning Meditation', icon: '🧘‍♂️', streak: 12, completed: true },
    { id: 2, title: 'Drink 2L Water', icon: '💧', streak: 5, completed: false },
    { id: 3, title: 'Read 20 pages', icon: '📚', streak: 1, completed: false },
    { id: 4, title: 'Code for 1 hour', icon: '💻', streak: 24, completed: true },
  ]);

  const toggleHabit = (id: number) => {
    setHabits(habits.map(h => 
      h.id === id ? { ...h, completed: !h.completed } : h
    ));
  };

  return (
    <div className="space-y-8 pb-10">
      <header>
        <h1 className="text-3xl font-display font-bold tracking-tight">System <span className="neon-text">Habits</span></h1>
        <p className="text-muted-foreground mt-1 text-sm">Automate your lifestyle. Build your streak.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Today&apos;s Protocols</h2>
            <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors">
              + New Habit
            </button>
          </div>
          
          <div className="grid gap-3">
             {habits.map((habit) => (
               <motion.div 
                 key={habit.id}
                 whileHover={{ scale: 1.01 }}
                 whileTap={{ scale: 0.99 }}
                 onClick={() => toggleHabit(habit.id)}
                 className={`glass p-4 rounded-2xl flex items-center gap-4 cursor-pointer transition-colors ${habit.completed ? 'border-cyan-500/30 bg-cyan-500/5' : 'hover:bg-white/5'}`}
               >
                 <div className="text-3xl">{habit.icon}</div>
                 <div className="flex-1">
                   <h3 className={`font-semibold text-lg ${habit.completed ? 'text-slate-300 line-through decoration-slate-500' : 'text-white'}`}>
                     {habit.title}
                   </h3>
                   <div className="flex items-center gap-1 mt-1 text-sm text-orange-400 font-medium">
                     <Trophy className="w-3 h-3" /> {habit.streak} day streak
                   </div>
                 </div>
                 <div>
                   {habit.completed ? (
                     <CheckCircle2 className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
                   ) : (
                     <Circle className="w-8 h-8 text-slate-600" />
                   )}
                 </div>
               </motion.div>
             ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 border-white/10 text-center">
            <h3 className="font-display font-semibold mb-2">Productivity XP</h3>
            <div className="text-5xl font-black neon-text-purple tracking-tighter mb-4">
              2,450
            </div>
            <div className="w-full bg-black/50 rounded-full h-2 mb-2">
              <div className="bg-purple-500 h-2 rounded-full w-[70%] shadow-[0_0_10px_#a855f7]" />
            </div>
            <p className="text-xs text-slate-400">70% to Level 12</p>
          </div>
          
          <div className="glass p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
               <LayoutDashboard className="w-5 h-5 text-cyan-400" />
               <h3 className="font-semibold text-lg">Focus Mode</h3>
            </div>
            <p className="text-sm text-slate-400 mb-4">Start a 25-minute Pomodoro session to deeply focus.</p>
            <button className="w-full bg-slate-100 hover:bg-white text-black font-bold py-3 rounded-xl transition-colors">
              Start Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
