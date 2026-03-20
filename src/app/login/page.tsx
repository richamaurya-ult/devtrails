"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === "admin@shield.com") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-netflix-black">
      <div className="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Antigravity <span className="text-zomato-green">Shield</span>
          </h1>
          <p className="text-gray-400">Protective coverage for India's gig economy</p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <div className="relative group">
            <input
              type="email"
              required
              className="w-full px-4 py-4 bg-netflix-dark border border-gray-700 rounded-lg focus:ring-2 focus:ring-zomato-green focus:border-transparent outline-none transition-all placeholder-gray-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="absolute inset-0 rounded-lg bg-zomato-green/10 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity" />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-zomato-green hover:bg-green-600 text-netflix-black font-bold rounded-lg transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-netflix-black/30 border-t-netflix-black rounded-full animate-spin" />
            ) : (
              "Get Shielded"
            )}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-8 leading-relaxed">
          * Standard credentials for demo:<br/>
          Admin: <span className="text-gray-300">admin@shield.com</span><br/>
          Worker: <span className="text-gray-300">any-other@email.com</span>
        </p>
      </div>
    </main>
  );
}
