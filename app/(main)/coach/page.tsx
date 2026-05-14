'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { useAuth } from '@/components/auth-provider';
import { Send, Bot, User as UserIcon, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export default function CoachPage() {
  const { userData } = useAuth();
  const [messages, setMessages] = React.useState<{ role: 'user' | 'model'; text: string }[]>([
    {
      role: 'model',
      text: "Hello! I'm your LifeSync AI Coach. I can help you with fitness plans, diet advice, productivity tips, or just general wellness. How can I help you optimize your day?",
    },
  ]);
  const [input, setInput] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const context = `You are LifeSync AI, a highly advanced, premium, and motivational fitness, lifestyle, and productivity coach. 
      The user's profile: Name: ${userData?.name || 'User'}, Age: ${userData?.age || 'Unknown'}, Goal: ${userData?.fitnessGoal || 'General wellness'}, Level: ${userData?.workoutLevel || 'Beginner'}.
      Respond with extremely high quality, futuristic, concise advice. Use markdown for formatting. Be highly encouraging.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          { role: 'user', parts: [{ text: context }] },
          { role: 'user', parts: [{ text: "Acknowledge context silently." }] },
          { role: 'model', parts: [{ text: "Understood." }] },
          ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
          { role: 'user', parts: [{ text: userMessage }] }
        ]
      });

      setMessages((prev) => [...prev, { role: 'model', text: response.text || "Sorry, I couldn't process that." }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages((prev) => [...prev, { role: 'model', text: "*Neural link disrupted.* I encountered an error. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] md:h-[calc(100vh-6rem)]">
      <header className="mb-6">
        <h1 className="text-3xl font-display font-bold tracking-tight">AI <span className="neon-text">Coach</span></h1>
        <p className="text-muted-foreground mt-1 text-sm">Your personal hyper-intelligent wellness guide.</p>
      </header>

      <div className="flex-1 glass-card flex flex-col overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <AnimatePresence initial={false}>
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-indigo-500' : 'bg-gradient-to-tr from-cyan-500 to-blue-600'}`}>
                  {msg.role === 'user' ? <UserIcon className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'glass border-white/5 text-slate-200'} prose prose-invert max-w-none`}>
                  {msg.role === 'user' ? (
                    msg.text
                  ) : (
                    <div className="markdown-body">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="p-4 rounded-2xl text-sm glass border-white/5 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                <span className="text-slate-400">Analyzing...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-md">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your diet, workouts, or habits..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-14 outline-none focus:border-cyan-500/50 transition-colors text-white placeholder:text-slate-500"
            />
            <button
              type="submit"
              disabled={isTyping || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-cyan-500 hover:bg-cyan-400 text-black rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5 -ml-0.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
