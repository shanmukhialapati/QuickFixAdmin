import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Users,
  Wallet,
  Ban,
  RotateCcw,
  Eye,
  MapPin,
  Mail,
  Phone,
  Star,
  AlertCircle,
  Crown,
  Activity,
  Repeat,
  IndianRupee,
  Filter,
  Clock3,
  ShieldAlert,
  UserCheck,
  TrendingUp,
  Sparkles,
  History,
  Tag,
  X,
  ChevronRight,
  EyeIcon,
  Zap,
  Navigation,
  Layers,
  Locate,
  CheckCircle,
  Loader2,
  ShieldCheck,
  Bell,
  ArrowUpRight,
  MousePointerClick,
  Sliders
} from "lucide-react";

const CustomersPage = () => {
  // Main Data States
  const [customers, setCustomers] = useState([
    {
      id: "CUS-1001",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "+91 9876543210",
      city: "Mumbai",
      orders: 24,
      wallet: "₹2,400",
      status: "Active",
      rating: 4.8,
      address: "Andheri West, Mumbai",
      complaints: 1,
      segment: "VIP Customer",
      active: "Online",
    },
    {
      id: "CUS-1002",
      name: "Priya Mehta",
      email: "priya@gmail.com",
      phone: "+91 9876543211",
      city: "Delhi",
      orders: 18,
      wallet: "₹1,100",
      status: "Blocked",
      rating: 4.5,
      address: "Dwarka Sector 12, Delhi",
      complaints: 3,
      segment: "High Complaint User",
      active: "1 hour ago",
    },
    {
      id: "CUS-1003",
      name: "Arjun Patel",
      email: "arjun@gmail.com",
      phone: "+91 9876543212",
      city: "Ahmedabad",
      orders: 31,
      wallet: "₹3,800",
      status: "Active",
      rating: 4.9,
      address: "Navrangpura, Ahmedabad",
      complaints: 0,
      segment: "Frequent User",
      active: "2 mins ago",
    },
    {
      id: "CUS-1004",
      name: "Ananya Iyer",
      email: "ananya.i@outlook.com",
      phone: "+91 9123456789",
      city: "Mumbai",
      orders: 42,
      wallet: "₹7,200",
      status: "Active",
      rating: 4.9,
      address: "Bandra West, Mumbai",
      complaints: 0,
      segment: "VIP Customer",
      active: "Online",
    },
    {
      id: "CUS-1005",
      name: "Vikram Malhotra",
      email: "vikram.m@gmail.com",
      phone: "+91 9811223344",
      city: "Delhi",
      orders: 7,
      wallet: "₹450",
      status: "Blocked",
      rating: 3.2,
      address: "Connaught Place, Delhi",
      complaints: 5,
      segment: "Fraud Risk Profile",
      active: "3 days ago",
    }
  ]);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSegment, setActiveSegment] = useState(null);
  const [activeHubTab, setActiveHubTab] = useState("live-stream");
  const [showRecommendations, setShowRecommendations] = useState(false);
  const searchWrapperRef = useRef(null);

  // Simplified and Naturalized System Event Log
  const [systemEvents, setSystemEvents] = useState([
    { id: 1, time: "Just Now", type: "order", text: "Rahul Sharma (CUS-1001) placed a new service booking order.", badge: "New Order", color: "bg-blue-600 text-white" },
    { id: 2, time: "2 mins ago", type: "wallet", text: "Ananya Iyer updated available account wallet credits.", badge: "Wallet", color: "bg-emerald-600 text-white" },
    { id: 3, time: "7 mins ago", type: "alert", text: "Security gateway flagged verification warning for Vikram Malhotra.", badge: "Alert", color: "bg-rose-600 text-white" },
    { id: 4, time: "14 mins ago", type: "review", text: "Arjun Patel submitted user feedback rating confirmation.", badge: "Feedback", color: "bg-amber-600 text-white" },
  ]);

  // Administrative Action Context States
  const [activeBanId, setActiveBanId] = useState(null);
  const [banForm, setBanForm] = useState({ reason: "Policy Violation", duration: "7 Days" });
  const [loadingRowAction, setLoadingRowAction] = useState({ id: null, type: null });
  const [successBanner, setSuccessBanner] = useState(null);

  // Advanced Filters State
  const [filters, setFilters] = useState({
    city: "",
    status: "",
    bookingCount: "",
    walletBalance: "",
    registrationDate: "",
    lastActive: "",
    ratings: "",
    premium: "",
  });

  const recommendedCategories = [
    { label: "Search by City (e.g., Mumbai, Delhi)", value: "Mumbai" },
    { label: "Find Active Premium Members", value: "status:Active segment:VIP" },
    { label: "High Complaint Accounts", value: "High Complaint" },
    { label: "Check Blocked Users", value: "Blocked" },
  ];

  const recentSearches = ["Rahul Sharma", "Ahmedabad", "CUS-1002"];

  const analyticsCards = [
    { title: "New Customers Today", value: "245", icon: <Users className="text-blue-600" />, bg: "bg-indigo-50 text-indigo-950" },
    { title: "Active Customers", value: "8,420", icon: <Activity className="text-green-600" />, bg: "bg-emerald-50 text-emerald-950" },
    { title: "Repeat Customers", value: "4,280", icon: <Repeat className="text-purple-600" />, bg: "bg-purple-50 text-purple-950" },
    { title: "Premium Members", value: "1,240", icon: <Crown className="text-yellow-600" />, bg: "bg-yellow-50 text-yellow-950" },
    { title: "High Spending Users", value: "620", icon: <IndianRupee className="text-red-600" />, bg: "bg-red-50 text-red-950" },
    { title: "Wallet Recharge", value: "₹3.2L", icon: <Wallet className="text-cyan-600" />, bg: "bg-sky-50 text-sky-950" },
    { title: "Average Order Value", value: "₹1,480", icon: <TrendingUp className="text-indigo-700" />, bg: "bg-slate-100 text-slate-900" },
    { title: "Retention Rate", value: "78%", icon: <UserCheck className="text-teal-600" />, bg: "bg-teal-50 text-teal-950" },
  ];

  const liveActivityItems = [
    { value: "2,420", label: "Users Currently Online", icon: <Users size={18} className="text-blue-600" />, pulseBg: "bg-blue-500", bg: "bg-blue-50/60" },
    { value: "480", label: "Active Bookings Running", icon: <Zap size={18} className="text-green-600" />, pulseBg: "bg-green-500", bg: "bg-emerald-50/60" },
    { value: "1,200", label: "Users Browsing Services", icon: <EyeIcon size={18} className="text-purple-600" />, pulseBg: "bg-purple-500", bg: "bg-purple-50/60" },
    { value: "₹84,000", label: "Wallet Transactions Today", icon: <IndianRupee size={18} className="text-orange-600" />, pulseBg: "bg-orange-500", bg: "bg-orange-50/60" }
  ];

  const segmentationBlocks = [
    {
      title: "VIP Customers",
      desc: "Top spending loyal users",
      metric: "1,240 users",
      icon: <Crown className="text-yellow-600" size={20} />,
      bg: "bg-yellow-50",
      hoverBg: "hover:bg-gradient-to-br hover:from-yellow-50 hover:to-yellow-100",
      accentBorder: "border-yellow-600",
      accentText: "text-yellow-600",
      filterKey: "VIP Customer"
    },
    {
      title: "Frequent Users",
      desc: "High order frequency rates",
      metric: "4,280 users",
      icon: <Repeat className="text-blue-600" size={20} />,
      bg: "bg-blue-50",
      hoverBg: "hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100",
      accentBorder: "border-blue-600",
      accentText: "text-blue-600",
      filterKey: "Frequent User"
    },
    {
      title: "Inactive Users",
      desc: "No platform activity recently",
      metric: "2,140 users",
      icon: <Clock3 className="text-slate-500" size={20} />,
      bg: "bg-slate-100",
      hoverBg: "hover:bg-gradient-to-br hover:from-slate-100 hover:to-slate-200",
      accentBorder: "border-slate-500",
      accentText: "text-slate-600",
      filterKey: "Inactive"
    },
    {
      title: "High Complaint Users",
      desc: "Accounts requiring urgent resolution",
      metric: "182 users",
      icon: <AlertCircle className="text-red-600" size={20} />,
      bg: "bg-red-50",
      hoverBg: "hover:bg-gradient-to-br hover:from-red-50 hover:to-red-100",
      accentBorder: "border-red-600",
      accentText: "text-red-600",
      filterKey: "High Complaint User"
    },
    {
      title: "Fraud Risk Users",
      desc: "Suspicious checkout anomalies flagged",
      metric: "24 accounts",
      icon: <ShieldAlert className="text-red-700" size={20} />,
      bg: "bg-red-100/50",
      hoverBg: "hover:bg-gradient-to-br hover:from-red-100/50 hover:to-red-200/60",
      accentBorder: "border-red-700",
      accentText: "text-red-700",
      filterKey: "Fraud"
    }
  ];

  // Auto-Dispatching Naturalized Stream Worker 
  useEffect(() => {
    const interval = setInterval(() => {
      const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
      const events = [
        { type: "order", badge: "Update", message: "refreshed active page menu layouts.", color: "bg-purple-600 text-white" },
        { type: "wallet", badge: "Activity", message: "changed search filter criteria adjustments.", color: "bg-indigo-600 text-white" },
        { type: "review", badge: "Inspect", message: "viewed account summary information details.", color: "bg-purple-700 text-white" }
      ];
      const selectedEvent = events[Math.floor(Math.random() * events.length)];
      
      const newEvent = {
        id: Date.now(),
        time: "Just Now",
        type: selectedEvent.type,
        text: `${randomCustomer.name} (${randomCustomer.id}) ${selectedEvent.message}`,
        badge: selectedEvent.badge,
        color: selectedEvent.color
      };

      setSystemEvents(prev => [newEvent, ...prev.slice(0, 4)]);
    }, 6000);

    return () => clearInterval(interval);
  }, [customers]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
        setShowRecommendations(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Action Resets & Handlers
  const handleToggleBlockStatus = (id, targetStatus) => {
    setLoadingRowAction({ id, type: "status" });
    setActiveBanId(null);

    setTimeout(() => {
      setCustomers(prev => prev.map(c => c.id === id ? { ...prev.find(x => x.id === id), status: targetStatus } : c));
      setLoadingRowAction({ id: null, type: null });
      triggerBanner(`User account ${id} has been marked successfully as ${targetStatus}.`);
    }, 1200);
  };

  const handleResetTokens = (id) => {
    setLoadingRowAction({ id, type: "reset" });

    setTimeout(() => {
      setLoadingRowAction({ id: null, type: null });
      triggerBanner(`Authentication payload configurations successfully cleared for user proxy ${id}.`);
    }, 1500);
  };

  const triggerBanner = (message) => {
    setSuccessBanner(message);
    setTimeout(() => setSuccessBanner(null), 4000);
  };

  const handleRecommendationClick = (val) => {
    setSearchTerm(val);
    setShowRecommendations(false);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      city: "",
      status: "",
      bookingCount: "",
      walletBalance: "",
      registrationDate: "",
      lastActive: "",
      ratings: "",
      premium: "",
    });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  const filteredCustomers = customers.filter((customer) => {
    const term = searchTerm.toLowerCase();
    
    if (term === "status:active segment:vip") {
      if (customer.status !== "Active" || !customer.segment.includes("VIP")) return false;
    } else if (term) {
      const matchSearch = (
        customer.name.toLowerCase().includes(term) ||
        customer.email.toLowerCase().includes(term) ||
        customer.id.toLowerCase().includes(term) ||
        customer.city.toLowerCase().includes(term) ||
        customer.status.toLowerCase().includes(term) ||
        customer.segment.toLowerCase().includes(term)
      );
      if (!matchSearch) return false;
    }

    if (activeSegment && !customer.segment.toLowerCase().includes(activeSegment.toLowerCase())) {
      if (activeSegment === "Inactive" && customer.status === "Active") return false;
      if (activeSegment === "Fraud" && customer.status !== "Blocked") return false;
      if (activeSegment !== "Inactive" && activeSegment !== "Fraud") return false;
    }

    if (filters.city && customer.city !== filters.city) return false;
    if (filters.status && customer.status !== filters.status) return false;
    if (filters.premium === "Premium" && !customer.segment.includes("VIP")) return false;
    if (filters.premium === "Regular" && customer.segment.includes("VIP")) return false;

    return true;
  });

return (
  <div className="min-h-screen p-4 sm:p-8 antialiased relative">
    {/* Global Pastel Purple Canvas Overlay */}
    <div className="fixed inset-0 pointer-events-none bg-gradient-to-br from-purple-50/60 via-white to-purple-100/40 -z-10" />
      
      {/* GLOBAL SYSTEM STATUS BANNER */}
      {successBanner && (
        <div className="fixed top-6 right-6 z-[100] max-w-md bg-slate-900 text-white rounded-2xl px-5 py-4 shadow-2xl flex items-start gap-3 border border-slate-800 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle className="text-emerald-400 shrink-0 mt-0.5" size={18} />
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">System Core Response</h5>
            <p className="text-sm font-medium mt-0.5 text-slate-100">{successBanner}</p>
          </div>
          <button onClick={() => setSuccessBanner(null)} className="text-slate-500 hover:text-slate-300 ml-auto">
            <X size={15} />
          </button>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-9 gap-5">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-purple-50 text-purple-600 border border-purple-200 text-sm font-semibold mb-4 shadow-sm">
            <Sparkles size={16} className="animate-spin [animation-duration:8s]" />
            Customers management dashboard
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Customers</h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl">
            Manage customer activities, analytics, bookings, wallet details and customer engagement.
          </p>
        </div>

        {/* SEARCH BAR PANEL */}
        <div ref={searchWrapperRef} className="relative w-full md:w-[440px]">
          <div className="flex items-center bg-white px-5 py-3.5 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 focus-within:!border-purple-600 focus-within:ring-4 focus-within:ring-purple-100 transition-all duration-300">
            <Search size={20} className="text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onFocus={() => setShowRecommendations(true)}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-none outline-none ml-3 w-full text-base text-slate-900 placeholder-slate-400 bg-transparent font-medium"
            />
          </div>

          {/* RECOMMENDATIONS DROPDOWN */}
          {showRecommendations && (
            <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-2xl border border-slate-200 shadow-xl p-5 z-50 animate-in fade-in slide-in-from-top-3 duration-200 ease-out">
              <div className="mb-4">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Recommended Filters</span>
                <div className="flex flex-col gap-1">
                  {recommendedCategories.map((cat, index) => (
                    <div
                      key={index}
                      onClick={() => handleRecommendationClick(cat.value)}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl cursor-pointer text-sm text-slate-700 font-medium hover:bg-slate-50 transition-colors"
                    >
                      <Tag size={14} className="text-purple-500" />
                      {cat.label}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">Recent Searches</span>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <div
                      key={index}
                      onClick={() => handleRecommendationClick(search)}
                      className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full text-xs sm:text-sm text-slate-600 font-medium cursor-pointer hover:bg-purple-50 hover:border-purple-200 hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <History size={13} className="text-slate-400" />
                      {search}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ANALYTICS CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-9">
        {analyticsCards.map((card, index) => (
          <div
            key={index}
            className={`${card.bg} rounded-3xl p-6 border border-slate-100 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-md cursor-default group`}
          >
            <div className="w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300">
              {card.icon}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{card.value}</h2>
            <p className="opacity-80 mt-1 text-sm font-semibold tracking-wide">{card.title}</p>
          </div>
        ))}
      </div>

      {/* ADVANCED FILTERS PANEL */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 mb-9 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-purple-50 w-11 h-11 rounded-xl flex items-center justify-center border border-purple-100">
              <Filter size={20} className="text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Advanced Filters</h2>
              <p className="text-xs text-slate-500 mt-0.5">Refine your target workspace dataset criteria</p>
            </div>
            {activeFiltersCount > 0 && (
              <span className="bg-purple-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full ml-1 animate-in zoom-in-75 duration-200">
                {activeFiltersCount} Active
              </span>
            )}
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={handleClearFilters}
              className="flex items-center gap-1.5 bg-slate-100 text-slate-600 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-red-50 hover:text-red-600 active:scale-95 transition-all duration-200 w-fit"
            >
              <X size={15} /> Reset All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { key: "city", label: "Filter by City", options: ["Mumbai", "Delhi", "Ahmedabad"] },
            { key: "status", label: "Filter by Status", options: ["Active", "Blocked"] },
            { key: "bookingCount", label: "Filter by Booking Count", options: ["1-10 Orders", "11-25 Orders", "25+ Orders"] },
            { key: "walletBalance", label: "Filter by Wallet Balance", options: ["Below ₹1,000", "₹1,000 - ₹3,000", "Above ₹3,000"] },
            { key: "registrationDate", label: "Filter by Registration Date", options: ["Today", "This Week", "This Month"] },
            { key: "lastActive", label: "Filter by Last Active", options: ["Online", "1 hour ago", "2 mins ago"] },
            { key: "ratings", label: "Filter by Ratings Given", options: ["4.5 & above", "4.0 - 4.5", "Below 4.0"] },
            { key: "premium", label: "Filter by Premium Users", options: ["Premium", "Regular"] },
          ].map((item) => (
            <div key={item.key} className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-600 px-0.5">{item.label}</label>
              <div className="relative">
                <select
                  value={filters[item.key]}
                  onChange={(e) => handleFilterChange(item.key, e.target.value)}
                  className={`w-full p-3.5 rounded-xl border text-sm outline-none cursor-pointer appearance-none transition-all duration-200 focus:border-purple-600 focus:ring-4 focus:ring-purple-50/60
                    ${filters[item.key] 
                      ? "border-purple-600 bg-purple-50/40 text-purple-900 font-semibold" 
                      : "border-slate-200 bg-slate-50 text-slate-900 font-medium hover:border-slate-300"
                    }`}
                >
                  <option value="">All {item.label.replace("Filter by ", "")}</option>
                  {item.options.map((opt, oIdx) => (
                    <option key={oIdx} value={opt}>{opt}</option>
                  ))}
                </select>
                <div className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent 
                  ${filters[item.key] ? "border-t-purple-600" : "border-t-slate-500"}`} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CUSTOMER SEGMENTATION COMPONENT */}
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-5 gap-3">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">Customer Segmentation</h2>
            <p className="text-sm text-slate-500 mt-1">Click a segment cell matrix card to lock table filters directly</p>
          </div>
          {activeSegment && (
            <button
              onClick={() => setActiveSegment(null)}
              className="text-purple-600 text-sm font-semibold flex items-center gap-1 hover:text-purple-700 active:scale-95 transition-all duration-200"
            >
              Clear Segment Filter <X size={14} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {segmentationBlocks.map((seg, idx) => {
            const isSelected = activeSegment === seg.filterKey;
            return (
              <div
                key={idx}
                onClick={() => setActiveSegment(isSelected ? null : seg.filterKey)}
                className={`group relative overflow-hidden rounded-3xl p-5 border cursor-pointer transition-all duration-300 ease-out
                  ${isSelected 
                    ? `${seg.bg} ${seg.accentBorder} border-2 scale-[1.02] shadow-md` 
                    : "bg-white border-slate-200 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-sm"
                  } ${seg.hoverBg}`}
              >
                <div className={`absolute -top-5 -right-5 w-20 h-20 rounded-full ${seg.bg} opacity-40 blur-lg pointer-events-none`} />
                
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-300 ${isSelected ? "bg-white shadow-sm" : seg.bg}`}>
                        {seg.icon}
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isSelected ? "bg-white/60 text-slate-900 shadow-sm" : "bg-slate-50 text-slate-500"}`}>
                        {seg.metric}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 mb-1">{seg.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">{seg.desc}</p>
                  </div>
                  
                  <div className={`flex items-center gap-1 text-xs font-bold ${seg.accentText}`}>
                    {isSelected ? "Active Filter" : "View Accounts"} 
                    <ChevronRight size={14} className={`transition-transform duration-200 ${isSelected ? "rotate-90" : "group-hover:translate-x-0.5"}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LIVE CUSTOMER ACTIVITY TIMELINE */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 mb-9 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2.5 mb-7">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <h2 className="text-xl font-extrabold text-slate-900">Live Customer Activity</h2>
          <span className="text-[10px] tracking-wider text-green-700 bg-green-100 px-2 py-0.5 rounded font-bold ml-1.5">LIVE FEED</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {liveActivityItems.map((item, index) => (
            <div
              key={index}
              className={`${item.bg} border border-slate-100 rounded-2xl p-5 flex flex-col justify-between relative shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 group`}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="w-9 h-9 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm">
                  {item.icon}
                </div>
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${item.pulseBg} opacity-75`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${item.pulseBg}`}></span>
                </span>
              </div>

              <div>
                <div className="text-2xl font-black text-slate-900 tracking-tight leading-none">{item.value}</div>
                <div className="text-xs font-semibold text-slate-600 mt-2 leading-snug">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PASTEL PURPLE OPERATIONS HUB CONSOLE */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 mb-9 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-5 gap-3">
          <div className="flex items-center gap-2.5">
            <Sliders className="text-purple-600" size={22} />
            <div>
              <h2 className="text-xl font-bold text-slate-900">Live System Operations Console</h2>
              <p className="text-xs text-slate-400 mt-0.5">Real-time platform events dispatch terminal</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-purple-600 text-white px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
              <Bell size={13} className="animate-bounce" /> Streaming Active
            </span>
          </div>
        </div>

        {/* Console Box */}
        <div className="h-[320px] rounded-2xl bg-purple-50/50 p-6 relative overflow-hidden shadow-inner font-mono flex flex-col justify-between border border-purple-100">
          
          {/* Background Digital Grid Watermark */}
          <div className="absolute inset-0 opacity-[0.4] pointer-events-none bg-[radial-gradient(#c084fc_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Conditional Layout Content Switches */}
          {activeHubTab === "live-stream" && (
            <div className="flex flex-col gap-3 overflow-y-auto max-h-[220px] pr-2 scrollbar-none animate-in fade-in duration-300 z-10">
              {systemEvents.map((event) => (
                <div key={event.id} className="flex items-start justify-between border-b border-purple-100/80 pb-2 gap-4 text-xs sm:text-sm hover:bg-white/50 p-1.5 rounded transition-all">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded shrink-0 shadow-sm ${event.color}`}>
                      {event.badge}
                    </span>
                    <span className="text-purple-950 font-medium font-sans">{event.text}</span>
                  </div>
                  <span className="text-purple-400 text-xs shrink-0 font-mono font-semibold">{event.time}</span>
                </div>
              ))}
            </div>
          )}

          {activeHubTab === "frequent-addresses" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in duration-300 p-2 z-10">
              <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-purple-100 shadow-sm">
                <p className="text-xs text-purple-400 font-bold tracking-wide">🏢 MAIN CORPORATE HOTSPOT</p>
                <p className="text-sm text-purple-950 mt-1 font-sans font-semibold">Bandra Kurla Complex (BKC), Mumbai</p>
                <div className="mt-3 flex justify-between text-xs text-indigo-600 font-bold"><span>Active Delivery Nodes</span> <span>184 Proxies</span></div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-purple-100 shadow-sm">
                <p className="text-xs text-purple-400 font-bold tracking-wide">🏡 DENSE RESIDENTIAL HUB</p>
                <p className="text-sm text-purple-950 mt-1 font-sans font-semibold">Dwarka Sector 12 Complex, New Delhi</p>
                <div className="mt-3 flex justify-between text-xs text-purple-700 font-bold"><span>Active Delivery Nodes</span> <span>342 Proxies</span></div>
              </div>
            </div>
          )}

          {activeHubTab === "density-heatmap" && (
            <div className="flex flex-col gap-3.5 animate-in fade-in duration-300 font-sans z-10">
              <div className="flex justify-between items-center bg-white/70 backdrop-blur-sm p-3 rounded-xl border border-purple-100 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-sm font-semibold text-purple-950">Mumbai Metro Region</span>
                </div>
                <span className="text-xs bg-rose-50 text-rose-700 px-2.5 py-1 rounded-md font-mono font-bold border border-rose-100">CRITICAL DEPLOY VELOCITY (92%)</span>
              </div>
              <div className="flex justify-between items-center bg-white/70 backdrop-blur-sm p-3 rounded-xl border border-purple-100 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-sm font-semibold text-purple-950">Delhi NCR Zone</span>
                </div>
                <span className="text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md font-mono font-bold border border-amber-100">HIGH DEPLOY VELOCITY (74%)</span>
              </div>
            </div>
          )}

          {/* FLOATING HUD METRICS METADATA BLOCK */}
          <div className="bg-white/80 backdrop-blur-md border border-purple-100 p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs gap-3 font-sans mt-auto shadow-sm z-10">
            <div className="flex items-center gap-2 text-purple-700 font-medium">
              <MousePointerClick size={14} className="text-purple-600" />
              <span>Active Workspace Metric Parameters:</span>
            </div>
            <div className="flex gap-5 font-mono font-bold text-purple-950">
              <div>System Nodes: <span className="text-purple-600">42 Regions</span></div>
              <div>Buffer Latency: <span className="text-indigo-600">14.2ms</span></div>
            </div>
          </div>
        </div>

        {/* CONSOLE CONTEXT SWITCH CONTROLS */}
        <div className="flex flex-wrap gap-3 mt-4">
          {[
            { id: "live-stream", label: "Live System Event Log" },
            { id: "frequent-addresses", label: "Address Cluster Vectors" },
            { id: "density-heatmap", label: "Activity Velocity Profiles" }
          ].map((tab) => {
            const isActive = activeHubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveHubTab(tab.id)}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-[0.98] 
                  ${isActive 
                    ? "bg-purple-50 border border-purple-200 text-purple-600 shadow-sm -translate-y-0.5" 
                    : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* RE-ENGINEERED TABLE WITH CONTROL ACTIONS UI */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-100/50 overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-500">
        
        {/* TABLE HEADER PANEL */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-8 py-6 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50/50 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Customer Repository</h2>
            <p className="text-xs text-slate-500 mt-1">
              Showing {filteredCustomers.length} client profiles out of total database roster
            </p>
          </div>
          {activeSegment && (
            <div className="inline-flex items-center gap-2 bg-purple-50/70 border border-purple-100 rounded-xl px-4 py-2 text-sm text-purple-700 font-semibold shadow-sm animate-in slide-in-from-top-2 duration-200">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              Filtered by Segment: <strong className="text-purple-900 font-bold">{activeSegment}</strong>
            </div>
          )}
        </div>

        {/* RESPONSIVE SCROLL WRAPPER */}
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200/60 text-xs font-bold text-slate-500 uppercase tracking-wider select-none">
                <th className="px-6 py-4.5 font-semibold">User ID</th>
                <th className="px-6 py-4.5 font-semibold">Profile Name</th>
                <th className="px-6 py-4.5 font-semibold">Email Destination</th>
                <th className="px-6 py-4.5 font-semibold">City Hub</th>
                <th className="px-6 py-4.5 font-semibold text-center">Orders</th>
                <th className="px-6 py-4.5 font-semibold">Wallet Float</th>
                <th className="px-6 py-4.5 font-semibold">Behavior Tag</th>
                <th className="px-6 py-4.5 font-semibold">Last Seen</th>
                <th className="px-6 py-4.5 font-semibold text-center">Status</th>
                <th className="px-8 py-4.5 font-semibold text-right">Control Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-600">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => {
                  const avatarColors = [
                    "bg-blue-100 text-blue-700",
                    "bg-purple-100 text-purple-700",
                    "bg-emerald-100 text-emerald-700",
                    "bg-amber-100 text-amber-700"
                  ];
                  const colorIdx = customer.name.length % avatarColors.length;
                  const isRowLoading = loadingRowAction.id === customer.id;

                  return (
                    <tr 
                      key={customer.id} 
                      className={`hover:bg-slate-50/60 group transition-all duration-150 ease-in-out border-l-2 border-l-transparent hover:border-l-purple-600 relative
                        ${isRowLoading ? "opacity-60 bg-slate-50/40 pointer-events-none" : ""}`}
                    >
                      <td className="px-6 py-4 font-mono text-xs font-bold text-slate-400 group-hover:text-purple-600 transition-colors">
                        {customer.id}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full ${avatarColors[colorIdx]} flex items-center justify-center font-bold text-xs shadow-inner`}>
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-slate-900 font-semibold tracking-tight group-hover:text-purple-950">
                            {customer.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-slate-500 font-normal whitespace-nowrap">
                        {customer.email}
                      </td>

                      <td className="px-6 py-4 text-slate-700 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-slate-400" />
                          {customer.city}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center text-slate-900 font-mono font-bold whitespace-nowrap">
                        {customer.orders}
                      </td>

                      <td className="px-6 py-4 text-slate-900 font-semibold font-mono whitespace-nowrap">
                        {customer.wallet}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold tracking-wide shadow-sm
                          ${customer.segment.includes('VIP') ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 text-amber-700' :
                            customer.segment.includes('Frequent') ? 'bg-purple-50 border border-purple-100 text-purple-700' :
                            customer.segment.includes('Complaint') ? 'bg-orange-50 border border-orange-100 text-orange-700' :
                            'bg-slate-50 border border-slate-200/60 text-slate-600'
                          }`}
                        >
                          {customer.segment}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
                        {customer.active}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm min-w-[84px] justify-center border
                          ${customer.status === "Active" ? "bg-emerald-50/80 border-emerald-200 text-emerald-700" : 
                            customer.status === "Blocked" ? "bg-rose-50 border-rose-200 text-rose-600" :
                            "bg-amber-50 border-amber-200 text-amber-700"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${customer.status === "Active" ? "bg-emerald-500" : "bg-rose-500"}`} />
                          {customer.status}
                        </span>
                      </td>

                      {/* FRONTEND ACTION CONTROLS */}
                      <td className="px-8 py-4 whitespace-nowrap text-right relative">
                        <div className="flex justify-end items-center gap-2">
                          
                          {/* Row Feedback Activity Spinner */}
                          {isRowLoading && (
                            <div className="flex items-center gap-1 text-xs text-slate-400 font-semibold mr-2 animate-pulse">
                              <Loader2 size={13} className="animate-spin text-purple-600" />
                              Syncing...
                            </div>
                          )}

                          {/* Inspect / View Button */}
                          <button 
                            onClick={() => setSelectedCustomer(customer)}
                            title="Inspect Profile"
                            disabled={isRowLoading}
                            className="bg-slate-50 hover:bg-purple-50 text-slate-500 hover:text-purple-600 border border-slate-200/60 hover:border-purple-200 p-2.5 rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 transition-all shadow-sm"
                          >
                            <Eye size={16} />
                          </button>

                          {/* Dynamic Account Ban Toggle Button */}
                          {customer.status === "Blocked" ? (
                            <button 
                              onClick={() => handleToggleBlockStatus(customer.id, "Active")}
                              title="Unblock Account"
                              disabled={isRowLoading}
                              className="bg-emerald-50 text-emerald-600 border border-emerald-200 p-2.5 rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 transition-all shadow-sm hover:bg-emerald-100"
                            >
                              <ShieldCheck size={16} />
                            </button>
                          ) : (
                            <button 
                              onClick={() => setActiveBanId(activeBanId === customer.id ? null : customer.id)}
                              title="Restrict Access"
                              disabled={isRowLoading}
                              className={`border p-2.5 rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 transition-all shadow-sm
                                ${activeBanId === customer.id 
                                  ? "bg-slate-900 text-white border-slate-900 hover:bg-slate-800" 
                                  : "bg-slate-50 hover:bg-rose-50 text-slate-500 hover:text-rose-600 border-slate-200/60 hover:border-rose-200"
                                }`}
                            >
                              <Ban size={16} />
                            </button>
                          )}

                          {/* Reset Sync Token Button */}
                          <button 
                            onClick={() => handleResetTokens(customer.id)}
                            title="Reset Tokens"
                            disabled={isRowLoading}
                            className="bg-slate-50 hover:bg-purple-50 text-slate-500 hover:text-purple-600 border border-slate-200/60 hover:border-purple-200 p-2.5 rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 transition-all shadow-sm"
                          >
                            <RotateCcw size={16} className={`${loadingRowAction.id === customer.id && loadingRowAction.type === 'reset' ? 'animate-spin' : ''}`} />
                          </button>
                        </div>

                        {/* BAN CONTEXTUAL MODAL POPUP DROPDOWN */}
                        {activeBanId === customer.id && (
                          <div className="absolute right-8 top-[calc(100%-4px)] mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl p-4.5 z-40 w-64 text-left animate-in fade-in zoom-in-95 duration-200">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                                <ShieldAlert size={14} className="text-rose-500" /> Restriction Protocol
                              </h4>
                              <button onClick={() => setActiveBanId(null)} className="text-slate-400 hover:text-slate-600">
                                <X size={14} />
                              </button>
                            </div>

                            <div className="space-y-3">
                              <div>
                                <label className="block text-[11px] font-bold text-slate-500 mb-1">Reason Group</label>
                                <select 
                                  value={banForm.reason}
                                  onChange={(e) => setBanForm({ ...banForm, reason: e.target.value })}
                                  className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-purple-600 outline-none"
                                >
                                  <option value="Policy Violation">Policy Violation</option>
                                  <option value="Fraud Risk Flags">Fraud Risk Flags</option>
                                  <option value="Harassment Check">Harassment Check</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-[11px] font-bold text-slate-500 mb-1">Duration Block</label>
                                <select 
                                  value={banForm.duration}
                                  onChange={(e) => setBanForm({ ...banForm, duration: e.target.value })}
                                  className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-slate-50 focus:border-purple-600 outline-none"
                                >
                                  <option value="7 Days">7 Days Temporary</option>
                                  <option value="30 Days">30 Days Cycle</option>
                                  <option value="Permanent">Permanent Exclusion</option>
                                </select>
                              </div>

                              <button
                                onClick={() => handleToggleBlockStatus(customer.id, "Blocked")}
                                className="w-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-2 rounded-xl transition-colors mt-2 shadow-sm shadow-rose-100"
                              >
                                Execute Account Restriction
                              </button>
                            </div>
                          </div>
                        )}

                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="10" className="p-12 text-center text-slate-400 font-medium bg-slate-50/30">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <span className="text-2xl">🔍</span>
                      <p className="text-slate-500 font-semibold">No clear directory metrics found</p>
                      <p className="text-xs text-slate-400 max-w-xs -mt-1">Try resetting your segment categories or modifying advanced query rules.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CUSTOMER PROFILE DETAIL PANEL */}
      {selectedCustomer && (
        <div className="mt-9 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md animate-in fade-in slide-in-from-top-5 duration-300 ease-out">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Customer Profile</h2>
              <p className="text-slate-500 text-sm mt-1">Complete customer activity and timeline history.</p>
            </div>
            <button 
              onClick={() => setSelectedCustomer(null)} 
              className="bg-slate-100 text-slate-700 font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-200 active:scale-95 transition-all w-fit"
            >
              Close Profile
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Personal Information</h3>
              <div className="flex flex-col gap-3.5 text-sm font-medium text-slate-700">
                <div className="flex gap-2.5 items-center"><Mail size={17} className="text-purple-600 shrink-0" /><span>{selectedCustomer.email}</span></div>
                <div className="flex gap-2.5 items-center"><Phone size={17} className="text-purple-600 shrink-0" /><span>{selectedCustomer.phone}</span></div>
                <div className="flex gap-2.5 items-start"><MapPin size={17} className="text-purple-600 shrink-0 mt-0.5" /><span className="leading-snug">{selectedCustomer.address}</span></div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Customer Timeline</h3>
              <div className="flex flex-col gap-2.5">
                {["10:30 AM - Booking Created", "11:15 AM - Payment Completed", "12:05 PM - Provider Assigned", "2:00 PM - Complaint Raised", "4:30 PM - Refund Processed"].map((timeline, index) => (
                  <div 
                    key={index} 
                    className="bg-white p-3 rounded-xl border-l-4 border-purple-600 text-xs sm:text-sm font-bold text-slate-800 shadow-sm hover:translate-x-1.5 transition-transform duration-200 cursor-default"
                  >
                    {timeline}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Complaints & Reviews</h3>
              <div className="flex flex-col gap-4 text-sm font-semibold text-slate-700">
                <div className="flex items-center gap-2.5 bg-white p-3.5 rounded-xl shadow-sm border border-slate-100">
                  <AlertCircle size={18} className="text-red-500" />
                  <span>{selectedCustomer.complaints} Complaints Raised</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-3.5 rounded-xl shadow-sm border border-slate-100">
                  <Star size={18} className="text-yellow-500 fill-yellow-500" />
                  <span>{selectedCustomer.rating} Average Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;