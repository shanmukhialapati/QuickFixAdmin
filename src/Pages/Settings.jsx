import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { User, Shield, Bell, Palette, Save, Monitor, Globe, Lock, Trash2, Upload, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";

const Settings = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.tab || "profile");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark");
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "system") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.classList.add("dark");
      }
    }
  }, [theme]);

  const [avatar, setAvatar] = useState(null);

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert("File is too large. Maximum size is 1MB.");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  const handleAvatarRemove = () => setAvatar(null);

  const handleProfileSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const [pwdData, setPwdData] = useState({ current: "", new: "", confirm: "" });
  const [pwdVisible, setPwdVisible] = useState({ current: false, new: false, confirm: false });
  const [pwdError, setPwdError] = useState("");
  const [pwdSuccess, setPwdSuccess] = useState(false);
  const [isSubmittingPwd, setIsSubmittingPwd] = useState(false);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPwdError("");
    setPwdSuccess(false);

    if (!pwdData.current || !pwdData.new || !pwdData.confirm) {
      setPwdError("All password fields are required.");
      return;
    }
    if (pwdData.new.length < 8) {
      setPwdError("New password must be at least 8 characters long.");
      return;
    }
    if (pwdData.new !== pwdData.confirm) {
      setPwdError("New passwords do not match.");
      return;
    }

    setIsSubmittingPwd(true);
    setTimeout(() => {
      setIsSubmittingPwd(false);
      if (pwdData.current !== "admin123") {
        setPwdError("Incorrect current password.");
        return;
      }
      setPwdSuccess(true);
      setPwdData({ current: "", new: "", confirm: "" });
      setTimeout(() => setPwdSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 transition-colors">
      <div>
        <h1 className="text-3xl font-black text-purple-950 dark:text-white tracking-tight">Platform Settings</h1>
        <p className="text-sm font-semibold text-[#8e24aa] dark:text-purple-400 mt-1">Manage your account preferences, security, and notifications.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 pt-4">
        <aside className="w-full lg:w-64 flex-shrink-0">
          <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 hide-scrollbar">
            {[
              { id: "profile", label: "General Profile", icon: User },
              { id: "preferences", label: "Preferences", icon: Palette },
              { id: "security", label: "Security & Access", icon: Shield },
              { id: "notifications", label: "Notifications", icon: Bell },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-[#d9b3ff] ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#600080] via-[#600080] to-[#d9b3ff] text-white shadow-lg shadow-[#d9b3ff]/40 dark:shadow-none"
                    : "bg-transparent text-[#600080] dark:text-purple-400 hover:bg-[#f3e5ff] dark:hover:bg-purple-900/50 hover:text-purple-900 dark:hover:text-white"
                }`}
              >
                <tab.icon size={18} className={activeTab === tab.id ? "text-white" : "text-purple-400"} />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1">
          <div className="bg-white/80 backdrop-blur-xl dark:bg-slate-900 rounded-3xl border border-[#f3e5ff] dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
            
            {activeTab === "profile" && (
              <form onSubmit={handleProfileSave} className="p-8">
                <div className="mb-8">
                  <h2 className="text-xl font-black text-purple-950 dark:text-white">General Profile</h2>
                  <p className="text-sm font-semibold text-[#8e24aa] dark:text-slate-400 mt-1">Update your personal information and public profile.</p>
                </div>

                <div className="space-y-6 max-w-2xl">
                  <div className="flex items-center gap-6 pb-6 border-b border-[#f3e5ff] dark:border-slate-800">
                    <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-[#600080] to-purple-400 text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-[#d9b3ff]/50 dark:shadow-none overflow-hidden shrink-0">
                      {avatar ? <img src={avatar} alt="Profile Preview" className="h-full w-full object-cover" /> : "A"}
                    </div>
                    <div>
                      <div className="flex flex-wrap gap-3">
                        <label className="flex items-center gap-2 px-4 py-2 bg-[#faf5ff] dark:bg-slate-800 border border-purple-200 dark:border-slate-700 text-[#600080] dark:text-slate-200 text-sm font-bold rounded-xl hover:bg-[#f3e5ff] dark:hover:bg-slate-700 transition-colors cursor-pointer outline-none">
                          <Upload size={16} /> Upload
                          <input type="file" accept="image/png, image/jpeg, image/gif" className="hidden" onChange={handleAvatarUpload} />
                        </label>
                        <button type="button" onClick={handleAvatarRemove} disabled={!avatar} className="flex items-center gap-2 px-4 py-2 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-sm font-bold rounded-xl hover:bg-rose-100 dark:hover:bg-rose-900/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                          <Trash2 size={16} /> Remove
                        </button>
                      </div>
                      <p className="text-xs font-semibold text-purple-400 mt-3">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#600080] dark:text-slate-300">First Name</label>
                      <input type="text" defaultValue="Super" className="w-full px-4 py-3 bg-[#faf5ff] dark:bg-slate-800 border border-purple-200 dark:border-slate-700 rounded-xl outline-none text-sm font-bold text-purple-950 dark:text-white focus:border-[#7a009f] transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#600080] dark:text-slate-300">Last Name</label>
                      <input type="text" defaultValue="Admin" className="w-full px-4 py-3 bg-[#faf5ff] dark:bg-slate-800 border border-purple-200 dark:border-slate-700 rounded-xl outline-none text-sm font-bold text-purple-950 dark:text-white focus:border-[#7a009f] transition-colors" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#600080] dark:text-slate-300">Email Address</label>
                    <input type="email" defaultValue="admin@quickfix.com" className="w-full px-4 py-3 bg-[#faf5ff] dark:bg-slate-800 border border-purple-200 dark:border-slate-700 rounded-xl outline-none text-sm font-bold text-purple-950 dark:text-white focus:border-[#7a009f] transition-colors" />
                  </div>
                </div>
                
                <div className="mt-10 pt-6 border-t border-[#f3e5ff] dark:border-slate-800 flex items-center justify-between">
                  <span className={`text-sm font-bold text-emerald-600 transition-opacity duration-300 ${isSaved ? 'opacity-100' : 'opacity-0'}`}>
                    ✓ Changes saved successfully
                  </span>
                  <button type="submit" className="flex items-center gap-2 bg-[#600080] hover:bg-[#7a009f] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-colors">
                    <Save size={18} /> Save Changes
                  </button>
                </div>
              </form>
            )}

            {activeTab === "preferences" && (
              <div className="p-8">
                <div className="mb-8">
                  <h2 className="text-xl font-black text-purple-950 dark:text-white">Platform Preferences</h2>
                  <p className="text-sm font-semibold text-[#8e24aa] dark:text-slate-400 mt-1">Customize your workspace experience.</p>
                </div>

                <div className="space-y-8 max-w-2xl">
                  <div className="flex items-start justify-between pb-6 border-b border-[#f3e5ff] dark:border-slate-800">
                    <div className="pr-4">
                      <h3 className="font-bold text-purple-950 dark:text-white flex items-center gap-2"><Globe size={16} className="text-purple-400"/> Language & Region</h3>
                      <p className="text-sm font-semibold text-[#8e24aa] dark:text-slate-400 mt-1">Select your primary language for the dashboard.</p>
                    </div>
                    <select className="px-4 py-2.5 bg-[#faf5ff] dark:bg-slate-800 border border-purple-200 dark:border-slate-700 rounded-xl outline-none text-sm font-bold text-[#600080] dark:text-slate-300 focus:border-[#7a009f] cursor-pointer">
                      <option>English (US)</option>
                      <option>English (UK)</option>
                      <option>Hindi (IN)</option>
                      <option>Spanish (ES)</option>
                    </select>
                  </div>

                  <div className="flex items-start justify-between">
                    <div className="pr-4">
                      <h3 className="font-bold text-purple-950 dark:text-white flex items-center gap-2"><Monitor size={16} className="text-purple-400"/> Appearance</h3>
                      <p className="text-sm font-semibold text-[#8e24aa] dark:text-slate-400 mt-1">Choose how the dashboard looks to you.</p>
                    </div>
                    
                    <div className="flex bg-[#f3e5ff] dark:bg-slate-800 p-1 rounded-xl border border-purple-200 dark:border-slate-700">
                      <button 
                        onClick={() => setTheme("light")}
                        className={`px-4 py-2 text-sm font-bold rounded-lg outline-none transition-colors ${theme === "light" ? "bg-white text-[#600080] shadow-sm" : "text-purple-500 hover:text-[#600080] dark:hover:text-white"}`}
                      >
                        Light
                      </button>
                      <button 
                        onClick={() => setTheme("dark")}
                        className={`px-4 py-2 text-sm font-bold rounded-lg outline-none transition-colors ${theme === "dark" ? "bg-slate-700 text-white shadow-sm" : "text-purple-500 hover:text-[#600080] dark:hover:text-white"}`}
                      >
                        Dark
                      </button>
                      <button 
                        onClick={() => setTheme("system")}
                        className={`px-4 py-2 text-sm font-bold rounded-lg outline-none transition-colors ${theme === "system" ? "bg-white dark:bg-slate-700 text-[#600080] dark:text-white shadow-sm" : "text-purple-500 hover:text-[#600080] dark:hover:text-white"}`}
                      >
                        System
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="p-8">
                <div className="mb-8">
                  <h2 className="text-xl font-black text-purple-950 dark:text-white">Security & Access</h2>
                  <p className="text-sm font-semibold text-[#8e24aa] dark:text-slate-400 mt-1">Manage your passwords and account protection.</p>
                </div>

                <div className="space-y-8 max-w-2xl">
                  <form onSubmit={handlePasswordSubmit} className="space-y-4 pb-8 border-b border-[#f3e5ff] dark:border-slate-800">
                    <h3 className="font-bold text-purple-950 dark:text-white flex items-center gap-2"><Lock size={16} className="text-purple-400"/> Change Password</h3>
                    
                    {pwdError && <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm font-bold rounded-xl"><AlertCircle size={16} /> {pwdError}</div>}
                    {pwdSuccess && <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold rounded-xl"><CheckCircle2 size={16} /> Password updated successfully.</div>}

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#600080] dark:text-slate-300">Current Password</label>
                        <div className="relative">
                          <input type={pwdVisible.current ? "text" : "password"} value={pwdData.current} onChange={(e) => setPwdData({...pwdData, current: e.target.value})} className="w-full pl-4 pr-12 py-3 bg-[#faf5ff] dark:bg-slate-800 border border-purple-200 dark:border-slate-700 rounded-xl outline-none text-sm font-bold text-purple-950 dark:text-white focus:border-[#7a009f]" />
                          <button type="button" onClick={() => setPwdVisible({...pwdVisible, current: !pwdVisible.current})} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-purple-400 hover:text-[#600080]">
                            {pwdVisible.current ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#600080] dark:text-slate-300">New Password</label>
                          <div className="relative">
                            <input type={pwdVisible.new ? "text" : "password"} value={pwdData.new} onChange={(e) => setPwdData({...pwdData, new: e.target.value})} className="w-full pl-4 pr-12 py-3 bg-[#faf5ff] dark:bg-slate-800 border border-purple-200 dark:border-slate-700 rounded-xl outline-none text-sm font-bold text-purple-950 dark:text-white focus:border-[#7a009f]" />
                            <button type="button" onClick={() => setPwdVisible({...pwdVisible, new: !pwdVisible.new})} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-purple-400 hover:text-[#600080]">
                              {pwdVisible.new ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#600080] dark:text-slate-300">Confirm Password</label>
                          <div className="relative">
                            <input type={pwdVisible.confirm ? "text" : "password"} value={pwdData.confirm} onChange={(e) => setPwdData({...pwdData, confirm: e.target.value})} className="w-full pl-4 pr-12 py-3 bg-[#faf5ff] dark:bg-slate-800 border border-purple-200 dark:border-slate-700 rounded-xl outline-none text-sm font-bold text-purple-950 dark:text-white focus:border-[#7a009f]" />
                            <button type="button" onClick={() => setPwdVisible({...pwdVisible, confirm: !pwdVisible.confirm})} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-purple-400 hover:text-[#600080]">
                              {pwdVisible.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <button type="submit" disabled={isSubmittingPwd} className="mt-4 px-6 py-3 bg-[#600080] hover:bg-[#7a009f] text-white text-sm font-bold rounded-xl disabled:opacity-50 transition-colors">
                        {isSubmittingPwd ? "Verifying..." : "Update Password"}
                      </button>
                    </div>
                  </form>

                  <div className="flex items-center justify-between pb-8 border-b border-[#f3e5ff] dark:border-slate-800">
                    <div className="pr-4">
                      <h3 className="font-bold text-purple-950 dark:text-white">Two-Factor Authentication</h3>
                      <p className="text-sm font-semibold text-[#8e24aa] dark:text-slate-400 mt-1">Add an extra layer of security to your account.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-12 h-7 bg-purple-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7a009f]"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="p-8">
                <div className="mb-8">
                  <h2 className="text-xl font-black text-purple-950 dark:text-white">Notification Preferences</h2>
                  <p className="text-sm font-semibold text-[#8e24aa] dark:text-slate-400 mt-1">Control when and how you receive alerts.</p>
                </div>

                <div className="space-y-6 max-w-2xl">
                  {[
                    { title: "New Service Providers", desc: "Alerts when a new provider registers and needs approval.", checked: true },
                    { title: "Customer Reviews", desc: "Get notified when a customer submits a 1-star or 2-star review.", checked: true },
                    { title: "Payment Failures", desc: "Immediate alerts for failed or disputed transactions.", checked: true }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-[#f3e5ff] dark:border-slate-800 rounded-2xl hover:bg-[#faf5ff] dark:hover:bg-slate-800/50 transition-all">
                      <div className="pr-4">
                        <div className="font-bold text-purple-950 dark:text-white text-sm">{item.title}</div>
                        <div className="text-xs font-semibold text-[#8e24aa] dark:text-slate-400 mt-0.5">{item.desc}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                        <input type="checkbox" className="sr-only peer" defaultChecked={item.checked} />
                        <div className="w-11 h-6 bg-purple-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7a009f]"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Settings;