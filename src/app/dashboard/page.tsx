"use client";

import { useEffect, useState } from "react";

const TIERS = [
  { id: "lite", name: "Lite Shield", price: "₹49", color: "from-blue-500 to-blue-700", icon: "💧", description: "Heavy Rain protection up to ₹2000 payout." },
  { id: "pro", name: "Pro Shield", price: "₹99", color: "from-green-500 to-green-700", icon: "🔥", description: "Rain + Heat + Curfew coverage up to ₹5000." },
  { id: "max", name: "Max Shield", price: "₹149", color: "from-purple-500 to-purple-700", icon: "🛡️", description: "Comprehensive social & weather protection." },
];

export default function WorkerDashboard() {
  const [rainLevel, setRainLevel] = useState(65);
  const [isSpoofingDetected, setIsSpoofingDetected] = useState(false);

  useEffect(() => {
    // Simulate real-time rain level updates
    const interval = setInterval(() => {
      setRainLevel(prev => {
        const next = prev + (Math.random() > 0.5 ? 2 : -1.5);
        return Math.min(100, Math.max(0, next));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const [payoutStatus, setPayoutStatus] = useState<string | null>(null);

  const simulatePayout = async () => {
    setPayoutStatus("processing");
    await new Promise(r => setTimeout(r, 2000));
    setPayoutStatus("success");
    setTimeout(() => setPayoutStatus(null), 5000);
  };

  return (
    <main className="min-h-screen pb-20 bg-netflix-black text-white px-5 pt-8 overflow-x-hidden">
      {/* Payout Notification */}
      {payoutStatus && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm animate-in fade-in slide-in-from-top-4">
          <div className={`p-4 rounded-xl border flex items-center gap-3 glass-card ${payoutStatus === "success" ? "border-zomato-green/50 bg-zomato-green/10" : "border-white/20 bg-white/5"}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${payoutStatus === "success" ? "bg-zomato-green text-netflix-black" : "bg-white/10"}`}>
              {payoutStatus === "success" ? "✓" : "⏳"}
            </div>
            <div>
              <p className="text-sm font-bold">{payoutStatus === "success" ? "Payout Released!" : "Processing Shield Payout"}</p>
              <p className="text-xs text-gray-400">{payoutStatus === "success" ? "₹2000 sent to your wallet." : "Verifying trigger & GPS zone..."}</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-xl font-bold opacity-80">Hello, Rajesh</h2>
          <p className="text-sm text-gray-400">Week of Mar 19 - Mar 25</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-zomato-green/20 flex items-center justify-center border border-zomato-green/30">
          <span className="text-zomato-green text-xs font-bold">AS</span>
        </div>
      </header>

      {/* Zomato-style Progress Tracker Section */}
      <section className="mb-10 animate-in fade-in slide-in-from-left-4 duration-700">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="text-zomato-green">●</span> Active Trigger Status
        </h3>
        <div className="bg-netflix-dark/50 border border-white/10 p-6 rounded-2xl relative overflow-hidden">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Current Rainfall</p>
              <p className="text-3xl font-black">{rainLevel.toFixed(0)}% <span className="text-base font-normal text-gray-500">of 100mm threshold</span></p>
            </div>
            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${rainLevel > 80 ? "bg-zomato-green text-netflix-black animate-pulse" : "bg-white/10 text-gray-400"}`}>
              {rainLevel > 80 ? "Payout Incoming" : "Monitoring"}
            </div>
          </div>
          
          {/* Vertical Progress Bar inspired by Zomato tracker */}
          <div className="zomato-progress-bg h-4 relative">
            <div 
              className="zomato-progress-fill relative overflow-hidden" 
              style={{ width: `${rainLevel}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-shine" />
            </div>
          </div>
          
          <div className="mt-4 flex gap-2">
            <div className="flex-1 p-3 bg-white/5 rounded-lg border border-white/5 flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-sm">📍</div>
               <div>
                 <p className="text-[10px] text-gray-400 font-bold uppercase">Zone Security</p>
                 <p className="text-xs font-medium text-gray-200">Sector 44 • <span className="text-zomato-green">Verified</span></p>
               </div>
            </div>
            <button 
              onClick={() => { setRainLevel(92); simulatePayout(); }}
              className="p-3 bg-zomato-green/20 hover:bg-zomato-green/30 border border-zomato-green/30 rounded-lg text-zomato-green text-[10px] font-black uppercase tracking-tighter"
            >
              Simulate<br/>Trigger
            </button>
          </div>
        </div>
      </section>

      {/* Netflix-style Tiers Section */}
      <section className="mb-10">
        <div className="flex justify-between items-baseline mb-4">
          <h3 className="text-lg font-semibold">Shield Tiers</h3>
          <button className="text-xs text-zomato-green font-bold uppercase tracking-widest">More Details</button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-5 px-5 snap-x">
          {TIERS.map((tier) => (
            <div 
              key={tier.id}
              className={`min-w-[220px] snap-center aspect-[4/5] p-5 rounded-2xl bg-gradient-to-br ${tier.color} relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer netflix-card-shadow`}
            >
              <div className="absolute top-0 right-0 p-4 opacity-30 text-4xl">{tier.icon}</div>
              <div className="h-full flex flex-col justify-end">
                <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">Weekly Plan</span>
                <h4 className="text-2xl font-black mb-1 leading-tight">{tier.name}</h4>
                <p className="text-xs text-white/70 mb-4 line-clamp-2">{tier.description}</p>
                <div className="flex justify-between items-end">
                  <p className="text-xl font-bold">{tier.price}<span className="text-[10px] font-normal opacity-60">/wk</span></p>
                  <button className="bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Exclusions Banner (Explicit Rule) */}
      <section className="bg-netflix-dark rounded-xl p-5 border border-white/10">
        <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-3">Service Scope</h4>
        <div className="grid grid-cols-2 gap-3 opacity-40 grayscale">
          {["No Health", "No Life", "No Accident", "No Repair"].map(item => (
            <div key={item} className="flex items-center gap-2 text-[10px] font-bold">
               <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> {item}
            </div>
          ))}
        </div>
      </section>

      {/* Floating Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-netflix-black/80 backdrop-blur-xl border-t border-white/10 px-8 py-4 flex justify-between items-center z-50">
        <ActionIcon icon="🏠" label="Home" active />
        <ActionIcon icon="📄" label="Policies" />
        <ActionIcon icon="💰" label="Payouts" badge="2" />
        <ActionIcon icon="👤" label="Profile" />
      </nav>
    </main>
  );
}

function ActionIcon({ icon, label, active = false, badge }: { icon: string; label: string; active?: boolean; badge?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-1 transition-all ${active ? "scale-110" : "opacity-40"}`}>
      <div className="relative">
        <span className="text-xl">{icon}</span>
        {badge && <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-zomato-green text-netflix-black text-[9px] font-bold flex items-center justify-center">{badge}</span>}
      </div>
      <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
    </div>
  );
}
