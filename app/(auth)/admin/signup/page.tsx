"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLightOn, setIsLightOn] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: username, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('adminName', name);
        localStorage.setItem('adminEmail', username);
        router.push("/admin/login");
      } else {
        setError(data.error || "Failed to sign up");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen w-full relative overflow-hidden transition-colors duration-1000 flex flex-col lg:flex-row items-center justify-center ${isLightOn ? "bg-[#0f0f0f]" : "bg-[#030303]"}`}>
      
      {/* --- LAMP SECTION --- */}
      <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen flex justify-center lg:justify-start items-center pointer-events-none z-10 lg:pl-[15%]">
        <div className="relative w-[300px] h-[600px] flex justify-center pointer-events-auto scale-75 lg:scale-100 origin-center lg:origin-left mt-10 lg:-mt-12">
          
          {/* Base */}
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[160px] h-[14px] rounded-t-2xl z-20 shadow-lg transition-colors duration-500 ${isLightOn ? 'bg-[#2a2a2a]' : 'bg-[#111]'}`}></div>
          
          {/* Vertical Rod */}
          <div className={`absolute bottom-[14px] left-1/2 -translate-x-1/2 w-[14px] h-[450px] z-20 transition-colors duration-500 ${isLightOn ? 'bg-[#2a2a2a]' : 'bg-[#111]'}`}></div>
          
          {/* Horizontal Top Bar */}
          <div className={`absolute top-[124px] left-1/2 -translate-x-1/2 w-[200px] h-[14px] rounded-full z-30 transition-colors duration-500 ${isLightOn ? 'bg-[#2a2a2a]' : 'bg-[#111]'}`}></div>

          {/* Light Bulb Area */}
          <div className={`absolute top-[138px] left-1/2 -translate-x-1/2 w-[70px] h-[25px] rounded-b-[30px] transition-all duration-300 z-20 ${isLightOn ? "bg-[#fffce0] shadow-[0_5px_40px_15px_rgba(255,252,224,0.6)]" : "bg-[#1a1a1a]"}`}></div>
          {/* Pull Label */}
          <motion.div 
            animate={{ opacity: isLightOn ? 0.3 : 0.8 }}
            className="absolute top-[95px] left-[calc(50%+65px)] -translate-x-1/2 z-10 text-slate-400 text-xs font-black uppercase tracking-[0.2em] pointer-events-none select-none flex flex-col items-center gap-1"
          >
            PULL
          </motion.div>
          
          {/* Pull Cord Container */}
          <div className="absolute top-[138px] left-[calc(50%+65px)] -translate-x-1/2 w-[40px] h-[250px] z-10 overflow-hidden">
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 60 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.y > 40) setIsLightOn(prev => !prev);
              }}
              className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-full flex flex-col items-center cursor-grab active:cursor-grabbing"
            >
              {/* String */}
              <div className={`w-[2px] h-[200px] transition-colors duration-500 ${isLightOn ? 'bg-[#555]' : 'bg-[#222]'}`}></div>
              {/* Handle */}
              <div className={`w-[16px] h-[40px] rounded-full transition-all duration-500 ${isLightOn ? 'bg-[#eab308] shadow-[0_0_15px_rgba(234,179,8,0.4)]' : 'bg-[#92400e]'}`}></div>
            </motion.div>
          </div>

          {/* Light Cone */}
          <motion.div 
            initial={false}
            animate={{ opacity: isLightOn ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute top-[138px] left-1/2 -translate-x-1/2 w-[800px] h-[550px] z-0 pointer-events-none"
            style={{ 
              background: 'linear-gradient(to bottom, rgba(253, 224, 71, 0.12) 0%, rgba(253, 224, 71, 0.02) 60%, transparent 100%)',
              clipPath: 'polygon(45.6% 0%, 54.4% 0%, 100% 100%, 0% 100%)' 
            }}
          />

          {/* Innoveity Logo at bottom (illuminated) */}
          <motion.div 
            initial={{ opacity: 0.05 }}
            animate={{ opacity: isLightOn ? 1 : 0.05 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 flex items-center justify-center z-20 pointer-events-none w-full"
          >
            <img src="/innvlog2.png" alt="Innoveity" className="h-24 w-auto object-contain drop-shadow-2xl brightness-125" />
          </motion.div>
        </div>
      </div>

      {/* --- FORM SECTION --- */}
      <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen flex items-center justify-center lg:justify-start pointer-events-none z-20 lg:pl-10">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isLightOn ? 1 : 0, x: isLightOn ? 0 : 20 }}
          transition={{ duration: 0.6, delay: isLightOn ? 0.2 : 0 }}
          className={`w-full max-w-md p-8 bg-[#151515]/90 backdrop-blur-2xl rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-[#2a2a2a] mx-4 lg:mx-0 ${isLightOn ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black tracking-tight mb-2" style={{ color: 'white' }}>Create Account</h1>
            <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>Join us to get access to the admin portal.</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm font-bold px-4 py-3 rounded-xl mb-6 text-center"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1.5 ml-1" style={{ color: '#cbd5e1' }}>Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-slate-500" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-[#222] border border-[#333] rounded-xl outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium placeholder-slate-500"
                  style={{ color: 'white' }}
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-1.5 ml-1" style={{ color: '#cbd5e1' }}>Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-slate-500" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-[#222] border border-[#333] rounded-xl outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium placeholder-slate-500"
                  style={{ color: 'white' }}
                  placeholder="admin"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold mb-1.5 ml-1" style={{ color: '#cbd5e1' }}>Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-slate-500" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-[#222] border border-[#333] rounded-xl outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium placeholder-slate-500"
                  style={{ color: 'white' }}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 py-3.5 bg-primary hover:bg-[#124634] text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>SIGN UP</>
              )}
            </button>

            <div className="text-center mt-6 text-sm text-slate-400 font-medium">
              Already have an account?{" "}
              <Link href="/admin/login" className="text-primary hover:text-primary/80 font-bold transition-colors">
                Sign in
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
