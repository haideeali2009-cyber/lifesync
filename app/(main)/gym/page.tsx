'use client';

import * as React from 'react';
import { motion } from 'motion/react';
import { Dumbbell, Play, Activity } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { useAuth } from '@/components/auth-provider';
import ReactMarkdown from 'react-markdown';

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

const categories = [
  { name: 'Muscle Gain', color: 'from-orange-400 to-red-500' },
  { name: 'Weight Loss', color: 'from-cyan-400 to-blue-500' },
  { name: 'Endurance', color: 'from-green-400 to-emerald-500' },
  { name: 'Stretching', color: 'from-purple-400 to-violet-500' }
];

export default function GymPage() {
  const { userData } = useAuth();
  const [selectedCat, setSelectedCat] = React.useState('Muscle Gain');
  const [generating, setGenerating] = React.useState(false);
  const [workoutPlan, setWorkoutPlan] = React.useState('');

  const generateWorkout = async (category: string) => {
    setSelectedCat(category);
    setGenerating(true);
    setWorkoutPlan('');

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `Create a futuristic, highly effective 3-step ${category} workout for a ${userData?.workoutLevel || 'beginner'}. Format it nicely in Markdown. Very concise.` }] }
        ]
      });
      setWorkoutPlan(response.text || 'Error generating workout.');
    } catch (err) {
      setWorkoutPlan('Neural link to Gym AI disrupted. Try again.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <header>
        <h1 className="text-3xl font-display font-bold tracking-tight">AI <span className="neon-text-purple">Gym Trainer</span></h1>
        <p className="text-muted-foreground mt-1 text-sm">Select a module to generate your hyper-optimized routine.</p>
      </header>

      {/* Categories */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => generateWorkout(cat.name)}
            className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-lg border ${
              selectedCat === cat.name 
                ? 'bg-white text-black border-white' 
                : 'glass border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Generated Plan */}
      <div className="glass-card p-6 min-h-[300px] border-white/10 relative overflow-hidden">
        {generating ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm z-10">
            <div className="w-16 h-16 rounded-full border-4 border-cyan-500/30 border-t-cyan-400 animate-spin mb-4" />
            <h3 className="text-cyan-400 font-display font-bold tracking-wider animate-pulse">OPTIMIZING ROUTINE</h3>
          </div>
        ) : null}

        {!workoutPlan && !generating && (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 py-12">
            <Dumbbell className="w-12 h-12 mb-4 opacity-50" />
            <p>Select a category to initialize your AI trainer.</p>
          </div>
        )}

        {workoutPlan && !generating && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative z-0">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <h3 className="font-semibold">{selectedCat} Protocol</h3>
                <p className="text-xs text-slate-400">AI Generated</p>
              </div>
              <button className="ml-auto bg-cyan-500 text-black px-4 py-2 rounded-full font-semibold text-sm hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                <Play className="w-4 h-4 fill-current" /> Start
              </button>
            </div>
            
            <div className="prose prose-invert max-w-none text-sm text-slate-300 markdown-body">
               <ReactMarkdown>{workoutPlan}</ReactMarkdown>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
