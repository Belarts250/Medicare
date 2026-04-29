import { Link, useNavigate } from "react-router";
import { Shield, Network, Linkedin, Instagram, Facebook, Twitter } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'signup' | 'signin'>('signin');
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "", organization: "", role: "researcher" as 'researcher' | 'hospital' | 'admin' });

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/researcher");
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    const roleRoutes = { researcher: "/researcher", hospital: "/hospital", admin: "/admin" };
    navigate(roleRoutes[signupData.role]);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-8"
      style={{ background: "#E0EAE8" }}
    >
      <div className="w-full max-w-5xl flex rounded-3xl overflow-hidden shadow-2xl" style={{ minHeight: "580px" }}>

        {/* Left Panel */}
        <div
          className="hidden lg:flex w-[45%] flex-col justify-between p-10 relative overflow-hidden"
          style={{ background: "linear-gradient(145deg, #1C3F3A 0%, #0A0C29 100%)" }}
        >
          {/* Decorative blobs */}
          <div className="absolute top-[-60px] right-[-60px] w-64 h-64 rounded-full opacity-10" style={{ background: "#E0EAE8" }} />
          <div className="absolute bottom-[-40px] left-[-40px] w-48 h-48 rounded-full opacity-10" style={{ background: "#EBE8D8" }} />

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-wide">MEDICARE</span>
          </div>

          {/* Center visual */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4">
            <div className="relative w-48 h-48 mb-8">
              <div className="absolute bottom-0 left-4 w-10 h-32 rounded-full rotate-12" style={{ background: "#EBE8D8" }} />
              <div className="absolute bottom-0 left-16 w-10 h-40 rounded-full rotate-6" style={{ background: "#1C3F3A", border: "3px solid #E0EAE8" }} />
              <div className="absolute bottom-0 right-4 w-10 h-28 rounded-full -rotate-12" style={{ background: "#E0EAE8" }} />
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                <Network className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-white text-2xl font-bold mb-3">Welcome Back</h2>
            <p className="text-white/70 text-sm leading-relaxed">
              Sign in to access your secure research dashboard and collaborate safely.
            </p>
          </div>

          {/* Footer */}
          <div className="relative z-10 text-white/40 text-xs text-center">
            Copyright © 2026 MEDICARE. All rights reserved.
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-white flex flex-col items-center justify-between py-12 px-8 sm:px-12">

          {/* Tabs */}
          <div className="w-full max-w-sm mb-8">
            <div className="flex gap-8 border-b border-border pb-0 mb-8">
              <button
                onClick={() => setActiveTab('signup')}
                className={`pb-3 text-base font-semibold transition-colors relative ${activeTab === 'signup' ? 'text-foreground' : 'text-muted-foreground'}`}
              >
                Sign Up
                {activeTab === 'signup' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 rounded-full" style={{ background: "#1C3F3A" }} />
                )}
              </button>
              <button
                onClick={() => setActiveTab('signin')}
                className={`pb-3 text-base font-semibold transition-colors relative ${activeTab === 'signin' ? 'text-foreground' : 'text-muted-foreground'}`}
              >
                Sign In
                {activeTab === 'signin' && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 rounded-full" style={{ background: "#1C3F3A" }} />
                )}
              </button>
            </div>

            {/* Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-border p-8">
              {activeTab === 'signin' ? (
                <form onSubmit={handleSignIn} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold mb-1" style={{ color: "#1C3F3A" }}>Email</label>
                    <input
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      placeholder="Enter your email"
                      required
                      className="w-full border-b border-border bg-transparent pb-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1" style={{ color: "#1C3F3A" }}>Password</label>
                    <input
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      placeholder="••••••••"
                      required
                      className="w-full border-b border-border bg-transparent pb-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded accent-primary" />
                      <span className="text-xs text-muted-foreground">Remember me</span>
                    </label>
                    <a href="#" className="text-xs font-semibold hover:underline" style={{ color: "#1C3F3A" }}>
                      Forgot password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg text-white font-bold hover:opacity-90 transition-opacity"
                    style={{ background: "#1C3F3A" }}
                  >
                    Sign In
                  </button>
                  <p className="text-center text-xs font-semibold" style={{ color: "#1C3F3A" }}>
                    <button type="button" onClick={() => setActiveTab('signup')} className="hover:underline">
                      Don't have an Account?
                    </button>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleSignUp} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold mb-1" style={{ color: "#1C3F3A" }}>Full Name</label>
                    <input
                      type="text"
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                      placeholder="Enter your name"
                      required
                      className="w-full border-b border-border bg-transparent pb-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1" style={{ color: "#1C3F3A" }}>Email</label>
                    <input
                      type="email"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      placeholder="Enter your email"
                      required
                      className="w-full border-b border-border bg-transparent pb-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1" style={{ color: "#1C3F3A" }}>Password</label>
                    <input
                      type="password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      placeholder="••••••••"
                      required
                      className="w-full border-b border-border bg-transparent pb-2 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="flex gap-3 pt-1">
                    {(['researcher', 'hospital', 'admin'] as const).map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setSignupData({ ...signupData, role })}
                        className="flex-1 py-1.5 rounded-full text-xs font-semibold border transition-all"
                        style={signupData.role === role
                          ? { background: "#1C3F3A", color: "#fff", borderColor: "#1C3F3A" }
                          : { background: "transparent", color: "#5A5D75", borderColor: "#E0EAE8" }
                        }
                      >
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </button>
                    ))}
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg text-white font-bold hover:opacity-90 transition-opacity"
                    style={{ background: "#1C3F3A" }}
                  >
                    Sign Up
                  </button>
                  <p className="text-center text-xs font-semibold" style={{ color: "#1C3F3A" }}>
                    <button type="button" onClick={() => setActiveTab('signin')} className="hover:underline">
                      I have an Account?
                    </button>
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex flex-col items-center gap-4 w-full max-w-sm">
            <div className="flex gap-6 text-muted-foreground">
              <Linkedin className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" />
              <Facebook className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 hover:text-primary cursor-pointer transition-colors" />
            </div>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <span>+1 555 000 0000</span>
              <span>info@medicare.io</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
