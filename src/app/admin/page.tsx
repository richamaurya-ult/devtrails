"use client";

import { PieChart, BarChart, Activity, ShieldCheck, Map, AlertTriangle, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-netflix-black text-white p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
             <div className="w-10 h-10 bg-guidewire-blue rounded-lg flex items-center justify-center">
               <ShieldCheck className="text-netflix-black w-6 h-6" />
             </div>
             Antigravity Shield <span className="text-gray-500 font-light underline decoration-guidewire-blue/50">Insurer Panel</span>
          </h1>
        </div>
        <div className="flex gap-4">
           <button className="px-4 py-2 bg-netflix-dark border border-white/10 rounded-lg text-sm font-bold hover:bg-white/5 transition-colors">Export Report</button>
           <button className="px-4 py-2 bg-guidewire-blue text-netflix-black rounded-lg text-sm font-black hover:opacity-90 transition-opacity">Global Adjustments</button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Active Shields" value="12,482" change="+12%" icon={<ShieldCheck />} />
        <StatCard title="Weekly Loss Ratio" value="24.8%" change="-4%" icon={<TrendingUp />} color="text-zomato-green" />
        <StatCard title="Active Rain Triggers" value="18" change="Alert" icon={<Activity />} color="text-zomato-red" />
        <StatCard title="Fraud Shield Blocks" value="142" change="+8% vs LY" icon={<AlertTriangle />} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Analytics */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-netflix-dark/50 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-6">Disruption Forecast (Next 7 Days)</h3>
            <div className="h-64 flex items-end gap-3 px-4">
              {[40, 65, 80, 45, 30, 90, 55].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                   <div 
                     style={{ height: `${val}%` }} 
                     className={`w-full max-w-[40px] rounded-t-lg transition-all ${val > 70 ? "bg-zomato-red/80" : "bg-guidewire-blue/50"} group-hover:brightness-125`}
                   />
                   <span className="text-[10px] text-gray-500 font-bold uppercase">{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-2 gap-8">
             <section className="bg-netflix-dark/50 border border-white/10 rounded-2xl p-6">
               <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Payout Distribution</h3>
               <div className="flex items-center justify-center h-48">
                 <div className="w-32 h-32 rounded-full border-[12px] border-zomato-green border-t-transparent border-l-guidewire-blue/50 flex items-center justify-center">
                    <span className="text-xl font-black">72%</span>
                 </div>
               </div>
               <div className="flex flex-wrap gap-4 mt-6 justify-center">
                  <LegendItem color="bg-zomato-green" label="Rain" />
                  <LegendItem color="bg-guidewire-blue/50" label="Heat" />
                  <LegendItem color="bg-gray-700" label="Curfew" />
               </div>
             </section>

             <section className="bg-netflix-dark/50 border border-white/10 rounded-2xl p-6">
               <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Fraud Shield Efficacy</h3>
               <div className="space-y-4 pt-4">
                  <TrackerRow label="GPS Spoofing" value={98} />
                  <TrackerRow label="Bot Protection" value={92} />
                  <TrackerRow label="Device Integrity" value={85} />
               </div>
             </section>
          </div>
        </div>

        {/* Right Column: Active Triggers List */}
        <section className="bg-netflix-dark/50 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-zomato-red animate-pulse" />
            Live Parametric Triggers
          </h3>
          <div className="space-y-4">
            <TriggerAlert zone="Mumbai Central" type="Heavy Rain" status="88%" active />
            <TriggerAlert zone="Gurugram Cybercity" type="Heatwave" status="42°C" />
            <TriggerAlert zone="Bengaluru ORR" type="Waterlogging" status="72%" active />
            <TriggerAlert zone="Noida Sec-62" type="Social Curfew" status="In Effect" active />
            <TriggerAlert zone="Chennai OMR" type="High Humidity" status="65%" />
          </div>
          <button className="w-full mt-8 py-3 bg-white/5 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
            View All Triggers
          </button>
        </section>
      </div>
    </main>
  );
}

function StatCard({ title, value, change, icon, color = "text-guidewire-blue" }: any) {
  return (
    <div className="bg-netflix-dark border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all cursor-default group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 bg-white/5 rounded-lg ${color} group-hover:scale-110 transition-transform`}>
          {icon}
        </div>
        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded bg-white/5 ${change.includes("-") ? "text-zomato-red" : "text-zomato-green"}`}>
          {change}
        </span>
      </div>
      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-none mb-1">{title}</p>
      <h4 className="text-2xl font-black">{value}</h4>
    </div>
  );
}

function LegendItem({ color, label }: any) {
  return (
    <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-gray-400">
      <div className={`w-2 h-2 rounded-full ${color}`} /> {label}
    </div>
  );
}

function TrackerRow({ label, value }: any) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] uppercase font-bold">
        <span>{label}</span>
        <span className="text-zomato-green">{value}%</span>
      </div>
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-zomato-green transition-all duration-1000" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function TriggerAlert({ zone, type, status, active = false }: any) {
  return (
    <div className={`p-4 rounded-xl border ${active ? "bg-zomato-red/5 border-zomato-red/20" : "bg-white/5 border-white/5"}`}>
      <div className="flex justify-between items-start mb-1">
        <p className="text-xs font-bold text-gray-200">{zone}</p>
        {active && <span className="w-2 h-2 rounded-full bg-zomato-red animate-ping" />}
      </div>
      <div className="flex justify-between items-end">
        <p className="text-[10px] text-gray-500 uppercase font-black">{type}</p>
        <p className={`text-sm font-black ${active ? "text-zomato-red" : "text-gray-400"}`}>{status}</p>
      </div>
    </div>
  );
}
