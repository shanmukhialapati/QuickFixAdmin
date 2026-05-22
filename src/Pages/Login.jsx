import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // Make sure to install lucide-react or change to your custom icons

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for toggle
  
  // Validation States
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Email Validation RegExp
  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!input) return "Email is required*";
    if (!emailRegex.test(input)) return "Please enter a valid email address*";
    return "";
  };

  // Password Validation
  const validatePassword = (input) => {
    if (!input) return "Password is required*";
    if (input.length < 6) return "Password must be at least 6 characters long*";
    return "";
  };

  // Live Input Handler
  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    setErrors((prev) => ({ ...prev, email: validateEmail(val) }));
  };

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    setErrors((prev) => ({ ...prev, password: validatePassword(val) }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Trigger Final Validation
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    if (emailErr || passwordErr) {
      setErrors({ email: emailErr, password: passwordErr });
      return;
    }

    // Checking credentials
    if (email === "admin@gmail.com" && password === "admin123") {
      if (setIsAuthenticated) setIsAuthenticated(true);
      navigate("/dashboard");
    } else {
      alert("Invalid Credentials! Try admin@gmail.com / admin123");
    }
  };

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

        {/* Content Overlay - Beautiful Styled Outer Title */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pb-24 text-center px-4">
          <h1 className="text-white text-5xl font-extrabold tracking-tight drop-shadow-md bg-clip-text mb-2">
            Quick<span className="text-purple-300">Fix</span>
          </h1>
          <h2 className="text-purple-100 text-sm md:text-base font-medium tracking-wide flex items-center gap-2 opacity-90">
            Hello 👋 Welcome! Please login to admin dashboard
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
      <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between mt-[16vh] px-6 lg:px-12 gap-12">
        
        {/* LEFT/CENTERED LOGIN FORM CARD */}
        <div className="bg-white rounded-3xl shadow-[0_15px_40px_rgba(110,37,148,0.06)] p-8 md:p-10 w-full max-w-[420px] border border-purple-50/50 mx-auto md:mx-0 shrink-0">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-800 tracking-tight">Sign In</h3>
            <p className="text-xs text-gray-400 mt-1">Enter your credentials to manage panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4" noValidate>
            {/* Username Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 tracking-wide">
                Email/Username*
              </label>
              <input
                type="email"
                required
                className={`w-full px-4 py-3 bg-gray-50/50 border rounded-xl text-sm focus:bg-white outline-none transition-all text-gray-700 placeholder-gray-300 ${
                  errors.email ? "border-red-400 focus:ring-2 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-2 focus:ring-[#6E2594]/10 focus:border-[#6E2594]"
                }`}
                placeholder="admin@gmail.com"
                value={email}
                onChange={handleEmailChange}
              />
              {errors.email && (
                <p className="text-[11px] text-red-500 font-medium pl-1 animate-pulse">{errors.email}</p>
              )}
            </div>

            {/* Password Field with Eye Icon Logic */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 tracking-wide">
                Password*
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className={`w-full pl-4 pr-12 py-3 bg-gray-50/50 border rounded-xl text-sm focus:bg-white outline-none transition-all text-gray-700 placeholder-gray-300 ${
                    errors.password ? "border-red-400 focus:ring-2 focus:ring-red-100 focus:border-red-500" : "border-gray-200 focus:ring-2 focus:ring-[#6E2594]/10 focus:border-[#6E2594]"
                  }`}
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#6E2594] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] text-red-500 font-medium pl-1 animate-pulse">{errors.password}</p>
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
              className="w-full bg-[#6E2594] hover:bg-[#561B75] text-white py-3.5 rounded-xl font-bold text-sm tracking-wide transition-colors shadow-lg shadow-[#6E2594]/20 mt-3"
            >
              Login
            </button>
          </form>
        </div>

        {/* ══════════ RIGHT SIDE: IMAGE-1 STYLE SERVICE DIAGRAM WITH PURPLE THEMING ══════════ */}
        <div className="hidden md:block relative w-[500px] h-[500px] absolute left-[16%] right-0 mx-auto scale-90 lg:scale-100 animate-float">
          
          {/* Centered Main Image (Admin Dashboard Guy) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full bg-white p-2 shadow-xl border-4 border-[#6E2594] z-10 flex items-center justify-center overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1762341122023-3aac65b1d787?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODd8fGFkbWlufGVufDB8fDB8fHww" 
              alt="Admin Central" 
              className="w-[90%] h-[90%] object-contain"
            />
          </div>

          {/* Surrounding Circles (Service Categories based on Image 2 & 3) */}
          
          {/* Top - AC Service */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-white p-1.5 shadow-lg border-2 border-purple-100 flex items-center justify-center overflow-hidden hover:scale-110 transition-transform">
            <img 
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=150&q=80" 
              alt="AC Service" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Top Right - Cleaning / Tools */}
          <div className="absolute top-16 right-4 w-32 h-32 rounded-full bg-white p-1.5 shadow-lg border-2 border-purple-100 flex items-center justify-center overflow-hidden hover:scale-110 transition-transform">
            <img 
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=150&q=80" 
              alt="Cleaning" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Bottom Right - Appliance Repair (Washing Machine / Chimney) */}
          <div className="absolute bottom-16 right-4 w-32 h-32 rounded-full bg-white p-1.5 shadow-lg border-2 border-purple-100 flex items-center justify-center overflow-hidden hover:scale-110 transition-transform">
            <img 
              src="https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=150&q=80" 
              alt="Appliance Repair" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Bottom - Salon / Massage Service */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-white p-1.5 shadow-lg border-2 border-purple-100 flex items-center justify-center overflow-hidden hover:scale-110 transition-transform">
            <img 
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=150&q=80" 
              alt="Spa Salon" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Bottom Left - Electrician / Repair */}
          <div className="absolute bottom-16 left-4 w-32 h-32 rounded-full bg-white p-1.5 shadow-lg border-2 border-purple-100 flex items-center justify-center overflow-hidden hover:scale-110 transition-transform">
            <img 
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RWxlY3RyaWNpYW58ZW58MHx8MHx8fDA%3D" 
              alt="Electrician" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Top Left - Intense Bathroom/Home Cleaning */}
          <div className="absolute top-16 left-4 w-32 h-32 rounded-full bg-white p-1.5 shadow-lg border-2 border-purple-100 flex items-center justify-center overflow-hidden hover:scale-110 transition-transform">
            <img 
              src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=150&q=80" 
              alt="Home Deep Cleaning" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Connecting SVG Dotted Lines Background Effect */}
          {/*<svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 animate-spin-slow" viewBox="0 0 500 500">
            <circle cx="250" cy="250" r="180" fill="none" stroke="#6E2594" strokeWidth="2" strokeDasharray="6 8" />
          </svg>*/}
        </div>

      </div>

      {/* Custom Keyframe Animations */}
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
          animation: float 5s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
};

export default Login;