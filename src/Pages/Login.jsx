import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // Validation States
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Email Validation Logic
  const handleEmailChange = (value) => {
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError("Email address is required");
    } else if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  // Password Validation Logic
  const handlePasswordChange = (value) => {
    setPassword(value);
    if (!value) {
      setPasswordError("Password is required");
    } else if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Final check before submission
    if (emailError || passwordError || !email || !password) return;

    if (email === "admin@gmail.com" && password === "admin123") {
      if (setIsAuthenticated) setIsAuthenticated(true);
      navigate("/dashboard");
    } else {
      alert("Invalid Credentials! Try admin@gmail.com / admin123");
    }
  };

  // Check if form is valid to enable/disable button
  const isFormInvalid = emailError || passwordError || !email || !password;

  return (
    <div className="relative min-h-screen w-full bg-[#FAF8FF] font-sans overflow-x-hidden flex items-center justify-center p-4">
      
      {/* ══════════ TOP PURPLE SECTION WITH IMAGE SCROLL & ARCS ══════════ */}
      <div className="absolute top-0 left-0 w-full h-[46vh] bg-[#6E2594] overflow-hidden z-0">
        
        {/* Right-to-Left Infinite Image Scrolling Layer */}
        <div className="absolute inset-0 flex w-[200%] opacity-[0.12] mix-blend-overlay animate-scroll-left">
          {/* Track 1 */}
          <div className="w-1/2 h-full flex justify-around items-center space-x-6 p-4 shrink-0">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" alt="work" className="h-full w-1/3 object-cover rounded-2xl" />
            <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=600&q=80" alt="office" className="h-full w-1/3 object-cover rounded-2xl" />
            <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80" alt="meeting" className="h-full w-1/3 object-cover rounded-2xl" />
          </div>
          {/* Track 2 (Duplicate for Seamless Loop) */}
          <div className="w-1/2 h-full flex justify-around items-center space-x-6 p-4 shrink-0">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" alt="work" className="h-full w-1/3 object-cover rounded-2xl" />
            <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=600&q=80" alt="office" className="h-full w-1/3 object-cover rounded-2xl" />
            <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80" alt="meeting" className="h-full w-1/3 object-cover rounded-2xl" />
          </div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pb-16 text-center px-4">
          <h2 className="text-white text-lg md:text-xl font-medium flex items-center gap-2 opacity-90">
            Hello 👋 Welcome!
          </h2>
        </div>

        {/* EXACT SVG BORDER ARC */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px]">
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V120H0C53.64,117.06,145.41,104,244.33,83.47A912.78,912.78,0,0,1,321.39,56.44Z" 
              className="fill-[#FAF8FF]"
            ></path>
          </svg>
        </div>
      </div>

      {/* ══════════ MAIN CONTENT CARD CONTAINER ══════════ */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row items-stretch justify-center gap-6 mt-[14vh] px-4">
        
        {/* LOGIN FORM CARD */}
        <div className="bg-white rounded-3xl shadow-[0_15px_40px_rgba(110,37,148,0.06)] p-8 md:p-10 w-full max-w-[420px] border border-purple-50/50 flex flex-col justify-center">
          <div className="text-center mb-6">
            {/* New Main Header Style */}
            <h1 className="text-4xl font-black tracking-tight text-[#6E2594] mb-1">
              Quick Fix
            </h1>
            <h3 className="text-2xl font-bold text-gray-800 tracking-tight mt-3">Login</h3>
            <p className="text-xs text-gray-400 mt-1 font-medium">Please login to admin dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 tracking-wide">
                Email/Username*
              </label>
              <input
                type="email"
                required
                className={`w-full px-4 py-3 bg-gray-50/50 border rounded-xl text-sm focus:bg-white focus:ring-2 outline-none transition-all text-gray-700 placeholder-gray-300 ${
                  emailError 
                    ? "border-red-400 focus:ring-red-100 focus:border-red-500" 
                    : "border-gray-200 focus:ring-[#6E2594]/10 focus:border-[#6E2594]"
                }`}
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
              />
              {emailError && (
                <p className="text-[11px] font-semibold text-red-500 pl-1">{emailError}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 tracking-wide">
                Password*
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  className={`w-full px-4 py-3 bg-gray-50/50 border rounded-xl text-sm focus:bg-white focus:ring-2 outline-none transition-all text-gray-700 placeholder-gray-300 ${
                    passwordError 
                      ? "border-red-400 focus:ring-red-100 focus:border-red-500" 
                      : "border-gray-200 focus:ring-[#6E2594]/10 focus:border-[#6E2594]"
                  }`}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                />
              </div>
              {passwordError && (
                <p className="text-[11px] font-semibold text-red-500 pl-1">{passwordError}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs font-semibold pt-1">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[#6E2594] focus:ring-[#6E2594] w-4 h-4"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <a href="#forgot" className="text-purple-500 hover:text-purple-700 transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isFormInvalid}
              className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg mt-4 ${
                isFormInvalid
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                  : "bg-[#6E2594] hover:bg-[#561B75] text-white shadow-[#6E2594]/20 hover:-translate-y-0.5"
              }`}
            >
              Login
            </button>
          </form>
        </div>

        {/* 3D CHARACTER ILLUSTRATION (కార్డ్‌తో పర్ఫెక్ట్ అలైన్‌మెంట్ సెట్ చేశాను) */}
        <div className="hidden md:flex items-center max-h-[380px] self-center ml-2">
          <img 
            src="https://illustrations.popsy.co/purple/creative-work.svg" 
            alt="3d character sketch" 
            className="h-full max-h-[340px] object-contain drop-shadow-2xl animate-float"
          />
        </div>

      </div>

      {/* CSS Styles for Custom Arc Animations */}
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .animate-scroll-left {
          animation: scrollLeft 30s linear infinite;
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
};

export default Login;