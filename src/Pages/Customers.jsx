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
} from "lucide-react";

const CustomersPage = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Active selected segment filter state
  const [activeSegment, setActiveSegment] = useState(null);

  // Recommendations Dropdown States
  const [showRecommendations, setShowRecommendations] = useState(false);
  const searchWrapperRef = useRef(null);

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

  const customers = [
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
  ];

  const analyticsCards = [
    { title: "New Customers Today", value: "245", icon: <Users color="#2563eb" />, bg: "#E0E7FF" },
    { title: "Active Customers", value: "8,420", icon: <Activity color="#16a34a" />, bg: "#DCFCE7" },
    { title: "Repeat Customers", value: "4,280", icon: <Repeat color="#7c3aed" />, bg: "#F3E8FF" },
    { title: "Premium Members", value: "1,240", icon: <Crown color="#ca8a04" />, bg: "#FEF9C3" },
    { title: "High Spending Users", value: "620", icon: <IndianRupee color="#dc2626" />, bg: "#FEE2E2" },
    { title: "Wallet Recharge", value: "₹3.2L", icon: <Wallet color="#0891b2" />, bg: "#E0F2FE" },
    { title: "Average Order Value", value: "₹1,480", icon: <TrendingUp color="#4338ca" />, bg: "#F1F5F9" },
    { title: "Retention Rate", value: "78%", icon: <UserCheck color="#0d9488" />, bg: "#CCFBF1" },
  ];

  // Updated Live Customer Activity with gorgeous pastel colors full-box fill
  const liveActivityItems = [
    {
      value: "2,420",
      label: "Users Currently Online",
      icon: <Users size={18} color="#2563eb" />,
      pulseColor: "#2563eb",
      bg: "#EFF6FF" // Pastel Blue Fill
    },
    {
      value: "480",
      label: "Active Bookings Running",
      icon: <Zap size={18} color="#16a34a" />,
      pulseColor: "#16a34a",
      bg: "#E8FDF0" // Pastel Green Fill
    },
    {
      value: "1,200",
      label: "Users Browsing Services",
      icon: <EyeIcon size={18} color="#7c3aed" />,
      pulseColor: "#7c3aed",
      bg: "#F5F3FF" // Pastel Purple Fill
    },
    {
      value: "₹84,000",
      label: "Wallet Transactions Today",
      icon: <IndianRupee size={18} color="#ea580c" />,
      pulseColor: "#ea580c",
      bg: "#FFF4ED" // Pastel Orange Fill
    }
  ];

  const segmentationBlocks = [
    {
      title: "VIP Customers",
      desc: "Top spending loyal users",
      metric: "1,240 users",
      icon: <Crown color="#ca8a04" size={20} />,
      bg: "#FEF9C3",
      hoverGradient: "linear-gradient(135deg, #fef9c3 0%, #fef08a 100%)",
      accent: "#ca8a04",
      filterKey: "VIP Customer"
    },
    {
      title: "Frequent Users",
      desc: "High order frequency rates",
      metric: "4,280 users",
      icon: <Repeat color="#2563eb" size={20} />,
      bg: "#DBEAFE",
      hoverGradient: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
      accent: "#2563eb",
      filterKey: "Frequent User"
    },
    {
      title: "Inactive Users",
      desc: "No order platform activity recently",
      metric: "2,140 users",
      icon: <Clock3 color="#64748b" size={20} />,
      bg: "#F1F5F9",
      hoverGradient: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
      accent: "#64748b",
      filterKey: "Inactive"
    },
    {
      title: "High Complaint Users",
      desc: "Accounts requiring urgent resolution",
      metric: "182 users",
      icon: <AlertCircle color="#dc2626" size={20} />,
      bg: "#FEE2E2",
      hoverGradient: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
      accent: "#dc2626",
      filterKey: "High Complaint User"
    },
    {
      title: "Fraud Risk Users",
      desc: "Suspicious checkout anomalies flagged",
      metric: "24 accounts",
      icon: <ShieldAlert color="#b91c1c" size={20} />,
      bg: "#FEF2F2",
      hoverGradient: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)",
      accent: "#b91c1c",
      filterKey: "Fraud"
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchWrapperRef.current && !searchWrapperRef.current.contains(event.target)) {
        setShowRecommendations(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f8fafc, #ffffff, #eff6ff)",
        padding: "30px",
      }}
    >
      <style>{`
        @keyframes subtlePulse {
          0% { transform: scale(0.92); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.92); opacity: 0.6; }
        }
      `}</style>

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "35px",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 18px",
              borderRadius: "999px",
              background: "#eff6ff",
              color: "#2563eb",
              border: "1px solid #bfdbfe",
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "18px",
            }}
          >
            <Sparkles size={16} />
            Customers management dashboard
          </div>

          <h1 style={{ fontSize: "42px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>
            Customers Page
          </h1>

          <p style={{ color: "#64748b", fontSize: "15px" }}>
            Manage customer activities, analytics, bookings, wallet details and customer engagement.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div ref={searchWrapperRef} style={{ position: "relative", width: "440px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "#ffffff",
              padding: "16px 24px",
              borderRadius: "20px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)",
            }}
          >
            <Search size={20} color="#64748b" style={{ flexShrink: 0 }} />

            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onFocus={() => setShowRecommendations(true)}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                marginLeft: "14px",
                width: "100%",
                fontSize: "16px",
                color: "#0f172a",
                fontWeight: "400",
                background: "transparent",
              }}
            />
          </div>

          {/* RECOMMENDATIONS DROPDOWN */}
          {showRecommendations && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                left: 0,
                right: 0,
                background: "#ffffff",
                borderRadius: "20px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                padding: "20px",
                zIndex: 999,
              }}
            >
              <div style={{ marginBottom: "18px" }}>
                <span style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "10px" }}>
                  Recommended Filters
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  {recommendedCategories.map((cat, index) => (
                    <div
                      key={index}
                      onClick={() => handleRecommendationClick(cat.value)}
                      style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "10px", cursor: "pointer", fontSize: "14px", color: "#334155", fontWeight: "500" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <Tag size={14} color="#3b82f6" />
                      {cat.label}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "10px" }}>
                  Recent Searches
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {recentSearches.map((search, index) => (
                    <div
                      key={index}
                      onClick={() => handleRecommendationClick(search)}
                      style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#f8fafc", border: "1px solid #e2e8f0", padding: "6px 14px", borderRadius: "999px", fontSize: "13px", color: "#475569", fontWeight: "500", cursor: "pointer" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#eff6ff"; e.currentTarget.style.borderColor = "#bfdbfe"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = "#e2e8f0"; }}
                    >
                      <History size={13} color="#64748b" />
                      {search}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ANALYTICS CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "35px",
        }}
      >
        {analyticsCards.map((card, index) => (
          <div
            key={index}
            style={{
              background: card.bg,
              borderRadius: "24px",
              padding: "24px",
              border: "1px solid rgba(0, 0, 0, 0.04)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.02)",
            }}
          >
            <div
              style={{
                width: "58px",
                height: "58px",
                borderRadius: "16px",
                background: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(4px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "18px",
              }}
            >
              {card.icon}
            </div>

            <h2 style={{ fontSize: "30px", fontWeight: "800", color: "#0f172a" }}>{card.value}</h2>

            <p style={{ color: "#475569", marginTop: "6px", fontSize: "14px", fontWeight: "500" }}>
              {card.title}
            </p>
          </div>
        ))}
      </div>

      {/* ADVANCED FILTERS */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "24px",
          padding: "32px",
          marginBottom: "35px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 12px 30px rgba(0, 0, 0, 0.03)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "26px",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                background: "#eff6ff",
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #dbeafe",
              }}
            >
              <Filter size={20} color="#2563eb" />
            </div>
            <div>
              <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
                Advanced Filters
              </h2>
              <p style={{ fontSize: "13px", color: "#64748b", marginTop: "2px", margin: 0 }}>
                Refine your target workspace dataset criteria
              </p>
            </div>
            {activeFiltersCount > 0 && (
              <span style={{ background: "#2563eb", color: "#fff", fontSize: "12px", fontWeight: "600", padding: "4px 10px", borderRadius: "999px", marginLeft: "4px" }}>
                {activeFiltersCount} Active
              </span>
            )}
          </div>

          {activeFiltersCount > 0 && (
            <button
              onClick={handleClearFilters}
              style={{ display: "flex", alignItems: "center", gap: "6px", background: "#f1f5f9", border: "none", color: "#475569", fontSize: "14px", fontWeight: "600", padding: "10px 16px", borderRadius: "12px", cursor: "pointer", transition: "all 0.2s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#fee2e2"; e.currentTarget.style.color = "#dc2626"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#475569"; }}
            >
              <X size={15} />
              Reset All
            </button>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "20px" }}>
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
            <div key={item.key} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569", paddingLeft: "2px" }}>
                {item.label}
              </label>
              <div style={{ position: "relative" }}>
                <select
                  value={filters[item.key]}
                  onChange={(e) => handleFilterChange(item.key, e.target.value)}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    borderRadius: "14px",
                    border: filters[item.key] ? "1px solid #2563eb" : "1px solid #cbd5e1",
                    background: filters[item.key] ? "#f0f6ff" : "#f8fafc",
                    color: filters[item.key] ? "#1e40af" : "#0f172a",
                    fontSize: "14px",
                    fontWeight: filters[item.key] ? "600" : "400",
                    outline: "none",
                    cursor: "pointer",
                    appearance: "none",
                    WebkitAppearance: "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  <option value="">All {item.label.replace("Filter by ", "")}</option>
                  {item.options.map((opt, oIdx) => (
                    <option key={oIdx} value={opt}>{opt}</option>
                  ))}
                </select>
                <div style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: filters[item.key] ? "5px solid #2563eb" : "5px solid #64748b" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CUSTOMER SEGMENTATION */}
      <div style={{ marginBottom: "40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "22px" }}>
          <div>
            <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", margin: 0 }}>
              Customer Segmentation
            </h2>
            <p style={{ fontSize: "14px", color: "#64748b", marginTop: "4px", margin: 0 }}>
              Click a segment cell matrix card to lock table filters directly
            </p>
          </div>
          {activeSegment && (
            <button
              onClick={() => setActiveSegment(null)}
              style={{ background: "transparent", border: "none", color: "#2563eb", fontSize: "14px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
            >
              Clear Segment Filter <X size={14} />
            </button>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
          {segmentationBlocks.map((seg, idx) => {
            const isSelected = activeSegment === seg.filterKey;
            return (
              <div
                key={idx}
                onClick={() => setActiveSegment(isSelected ? null : seg.filterKey)}
                style={{
                  background: isSelected ? seg.hoverGradient : "#ffffff",
                  borderRadius: "24px",
                  padding: "24px",
                  border: isSelected ? `2px solid ${seg.accent}` : "1px solid #e2e8f0",
                  boxShadow: isSelected ? `0 12px 24px -10px rgba(0,0,0,0.08)` : "0 4px 16px rgba(0, 0, 0, 0.02)",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: isSelected ? "scale(1.02)" : "scale(1)",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = seg.hoverGradient;
                    e.currentTarget.style.borderColor = "#cbd5e1";
                    e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.04)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.background = "#ffffff";
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.02)";
                  }
                }}
              >
                <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "80px", height: "80px", borderRadius: "50%", background: seg.bg, opacity: 0.4, filter: "blur(10px)", zIndex: 0 }} />
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <div style={{ width: "46px", height: "46px", borderRadius: "14px", background: isSelected ? "#ffffff" : seg.bg, display: "flex", alignItems: "center", justifyCenter: "center", display: "flex", justifyContent: "center" }}>
                      {seg.icon}
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: "700", color: isSelected ? "#0f172a" : "#64748b", background: isSelected ? "rgba(255,255,255,0.5)" : "#f8fafc", padding: "4px 10px", borderRadius: "999px" }}>
                      {seg.metric}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", margin: "0 0 4px 0" }}>{seg.title}</h3>
                  <p style={{ fontSize: "13px", color: isSelected ? "#334155" : "#64748b", margin: "0 0 16px 0", lineHeight: "1.4" }}>{seg.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", fontWeight: "700", color: seg.accent }}>
                    {isSelected ? "Active Filter" : "View Accounts"} <ChevronRight size={14} style={{ transform: isSelected ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* HORIZONTAL LIVE CUSTOMER ACTIVITY (NOW WITH PASTEL BACKGROUNDS) */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "24px",
          padding: "32px",
          marginBottom: "35px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.02)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#16a34a", animation: "subtlePulse 2s infinite" }} />
          <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", margin: 0 }}>
            Live Customer Activity
          </h2>
          <span style={{ fontSize: "12px", color: "#16a34a", background: "#dcfce7", padding: "3px 8px", borderRadius: "6px", fontWeight: "700", marginLeft: "6px" }}>
            LIVE FEED
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          {liveActivityItems.map((item, index) => (
            <div
              key={index}
              style={{
                flex: "1 1 210px",
                background: item.bg, // Complete container filled with custom pastel values
                border: "1px solid rgba(0, 0, 0, 0.03)",
                borderRadius: "20px",
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                transition: "all 0.25s ease",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.01)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.01)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <div style={{ width: "38px", height: "38px", background: "rgba(255, 255, 255, 0.7)", backdropFilter: "blur(4px)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {item.icon}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: item.pulseColor, animation: "subtlePulse 1.8s infinite" }} />
                </div>
              </div>

              <div>
                <div style={{ fontSize: "28px", fontWeight: "800", color: "#0f172a", letterSpacing: "-0.02em", lineHeight: "1" }}>
                  {item.value}
                </div>
                <div style={{ fontSize: "13px", color: "#475569", fontWeight: "600", marginTop: "6px", lineHeight: "1.3" }}>
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAP VIEW */}
      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "28px",
          marginBottom: "35px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <MapPin color="#2563eb" />
          <h2 style={{ fontSize: "26px", fontWeight: "700", color: "#0f172a" }}>Customer Map View</h2>
        </div>

        <div
          style={{
            height: "320px",
            borderRadius: "22px",
            background: "linear-gradient(to bottom right,#dbeafe,#bfdbfe,#e0f2fe)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#1e3a8a",
            fontSize: "22px",
            fontWeight: "700",
            marginBottom: "20px",
          }}
        >
          Google Maps Integration Area
        </div>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {["Customer Locations", "Frequently Used Addresses", "Customer Density Heatmap"].map((item, index) => (
            <div key={index} style={{ background: "#f8fafc", padding: "14px 18px", borderRadius: "14px", fontWeight: "600" }}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* CUSTOMERS TABLE */}
      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "28px",
          border: "1px solid #e2e8f0",
          overflowX: "auto",
          boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#0f172a", margin: 0 }}>
            Customers Table
          </h2>
          {activeSegment && (
            <span style={{ fontSize: "14px", color: "#64748b", fontWeight: "500" }}>
              Showing only <strong>{activeSegment}</strong> profiles
            </span>
          )}
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              {[
                "User ID", "Name", "Email", "City", "Orders", "Wallet", "Segment", "Last Active", "Status", "Actions"
              ].map((head) => (
                <th key={head} style={{ padding: "18px", textAlign: "left", fontSize: "14px", color: "#475569" }}>
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <tr key={customer.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "18px", fontWeight: "600" }}>{customer.id}</td>
                  <td style={{ padding: "18px" }}>{customer.name}</td>
                  <td style={{ padding: "18px" }}>{customer.email}</td>
                  <td style={{ padding: "18px" }}>{customer.city}</td>
                  <td style={{ padding: "18px" }}>{customer.orders}</td>
                  <td style={{ padding: "18px" }}>{customer.wallet}</td>
                  <td style={{ padding: "18px" }}>{customer.segment}</td>
                  <td style={{ padding: "18px" }}>{customer.active}</td>
                  <td style={{ padding: "18px" }}>
                    <span
                      style={{
                        padding: "8px 14px",
                        borderRadius: "999px",
                        fontSize: "13px",
                        fontWeight: "600",
                        background: customer.status === "Active" ? "#dcfce7" : "#fee2e2",
                        color: customer.status === "Active" ? "#15803d" : "#dc2626",
                      }}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td style={{ padding: "18px" }}>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        style={{ border: "none", background: "#dbeafe", width: "40px", height: "40px", borderRadius: "12px", cursor: "pointer" }}
                      >
                        <Eye size={18} color="#2563eb" />
                      </button>
                      <button style={{ border: "none", background: "#fee2e2", width: "40px", height: "40px", borderRadius: "12px", cursor: "pointer" }}>
                        <Ban size={18} color="#dc2626" />
                      </button>
                      <button style={{ border: "none", background: "#ede9fe", width: "40px", height: "40px", borderRadius: "12px", cursor: "pointer" }}>
                        <RotateCcw size={18} color="#7c3aed" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" style={{ padding: "30px", textAlign: "center", color: "#94a3b8", fontSize: "15px" }}>
                  No customers found matching your segmented filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CUSTOMER PROFILE */}
      {selectedCustomer && (
        <div
          style={{
            marginTop: "35px",
            background: "#fff",
            borderRadius: "24px",
            padding: "30px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "20px", marginBottom: "25px" }}>
            <div>
              <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#0f172a" }}>Customer Profile</h2>
              <p style={{ color: "#64748b", marginTop: "8px" }}>Complete customer activity and timeline history.</p>
            </div>
            <button
              onClick={() => setSelectedCustomer(null)}
              style={{ border: "none", background: "#f1f5f9", padding: "12px 18px", borderRadius: "12px", cursor: "pointer", fontWeight: "600" }}
            >
              Close Profile
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "20px", marginBottom: "30px" }}>
            <div style={{ background: "#f8fafc", borderRadius: "20px", padding: "24px" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "20px" }}>Personal Information</h3>
              <div style={{ display: "flex", gap: "10px", marginBottom: "14px" }}><Mail size={18} color="#2563eb" /><span>{selectedCustomer.email}</span></div>
              <div style={{ display: "flex", gap: "10px", marginBottom: "14px" }}><Phone size={18} color="#2563eb" /><span>{selectedCustomer.phone}</span></div>
              <div style={{ display: "flex", gap: "10px" }}><MapPin size={18} color="#2563eb" /><span>{selectedCustomer.address}</span></div>
            </div>

            <div style={{ background: "#f8fafc", borderRadius: "20px", padding: "24px" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "20px" }}>Customer Timeline</h3>
              {[
                "10:30 AM - Booking Created", "11:15 AM - Payment Completed", "12:05 PM - Provider Assigned", "2:00 PM - Complaint Raised", "4:30 PM - Refund Processed"
              ].map((timeline, index) => (
                <div key={index} style={{ background: "#fff", padding: "12px", borderRadius: "12px", marginBottom: "12px", borderLeft: "4px solid #2563eb", fontSize: "14px", fontWeight: "600" }}>
                  {timeline}
                </div>
              ))}
            </div>

            <div style={{ background: "#f8fafc", borderRadius: "20px", padding: "24px" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "20px" }}>Complaints & Reviews</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}><AlertCircle size={18} color="#dc2626" /><span>{selectedCustomer.complaints} Complaints Raised</span></div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}><Star size={18} color="#eab308" /><span>{selectedCustomer.rating} Average Rating</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersPage;