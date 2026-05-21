import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, User, Heart } from "lucide-react";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "admin123") {
      setIsAuthenticated(true);
      navigate("/dashboard");
    } else {
      alert("Invalid Credentials! Try admin@gmail.com / admin123");
    }
  };

  return (
    <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-rose-100">
        {/* Login Header */}
        <div className="bg-rose-800 p-8 text-center">
          <h2 className="text-2xl font-bold text-white">QuickFix Admin</h2>
          <p className="text-rose-200 text-sm mt-1">
            Please login to your account
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <User size={18} />
              </div>
              <input
                type="email"
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Lock size={18} />
              </div>
              <input
                type="password"
                required
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-rose-800 text-white py-3 rounded-xl font-bold hover:bg-rose-900 transition-colors shadow-lg shadow-rose-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
