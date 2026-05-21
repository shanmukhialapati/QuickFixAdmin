import React, { useState } from "react";
import {
  Users,
  UserCheck,
  CalendarCheck,
  IndianRupee,
  Wallet,
  TrendingUp,
  Star,
  Clock3,
  ShieldAlert,
  Briefcase,
  CreditCard,
  Server,
  Eye,
  MessageSquare,
  X,
  Plus,
  Send,
  Download,
  CheckCircle,
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardPage = () => {
  // --- UI Interactivity States ---
  const [activeAction, setActiveAction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New States for Success Popup Tracking
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Form State Triggers
  const [providerForm, setProviderForm] = useState({ name: "", service: "", email: "", phone: "" });
  const [couponForm, setCouponForm] = useState({ code: "", discount: "", expiry: "" });
  const [notificationText, setNotificationText] = useState("");
  const [categoryForm, setCategoryForm] = useState({ name: "", desc: "" });

  const revenueData = [
    { name: "Mon", revenue: 1.2 }, { name: "Tue", revenue: 1.8 }, { name: "Wed", revenue: 1.5 },
    { name: "Thu", revenue: 2.9 }, { name: "Fri", revenue: 2.4 }, { name: "Sat", revenue: 3.8 }, { name: "Sun", revenue: 3.2 },
  ];

  const bookingData = [
    { name: "Mon", bookings: 120 }, { name: "Tue", bookings: 210 }, { name: "Wed", bookings: 180 },
    { name: "Thu", bookings: 340 }, { name: "Fri", bookings: 310 }, { name: "Sat", bookings: 480 }, { name: "Sun", bookings: 410 },
  ];

  const analyticsCards = [
    { title: "Total Customers", value: "12,580", icon: <Users color="#A855F7" />, bg: "#F3E8FF" },
    { title: "Active Providers", value: "2,480", icon: <UserCheck color="#EC4899" />, bg: "#FCE7F3" },
    { title: "Total Bookings", value: "28,450", icon: <CalendarCheck color="#8B5CF6" />, bg: "#F5F3FF" },
    { title: "Monthly Revenue", value: "₹24.8L", icon: <IndianRupee color="#D946EF" />, bg: "#FAE8FF" },
    { title: "Wallet Transactions", value: "₹8.2L", icon: <Wallet color="#C084FC" />, bg: "#F3E8FF" },
    { title: "Customer Rating", value: "4.8", icon: <Star color="#EC4899" />, bg: "#FCE7F3" },
    { title: "Pending Bookings", value: "480", icon: <Clock3 color="#A855F7" />, bg: "#F5F3FF" },
    { title: "Fraud Alerts", value: "24", icon: <ShieldAlert color="#DB2777" />, bg: "#FAE8FF" },
  ];

  const quickActions = [
    { id: "add-provider", label: "Add Provider" },
    { id: "create-coupon", label: "Create Coupon" },
    { id: "send-notification", label: "Send Notification" },
    { id: "export-reports", label: "Export Reports" },
    { id: "add-category", label: "Add Category" },
    { id: "view-complaints", label: "View Complaints" },
    { id: "system-logs", label: "System Logs" },
    { id: "manage-payouts", label: "Manage Payouts" },
  ];

  const handleActionClick = (actionId) => {
    setActiveAction(actionId);
    setIsModalOpen(true);
  };

  // Generic Submit Processor that displays the success notification
  const handleActionSubmit = (customMsg) => {
    setIsModalOpen(false); // Close original action form
    setSuccessMessage(customMsg || "Action completed successfully!");
    setShowSuccessPopup(true); // Fire up success popup
    
    // Auto-reset form inputs
    setProviderForm({ name: "", service: "", email: "", phone: "" });
    setCouponForm({ code: "", discount: "", expiry: "" });
    setNotificationText("");
    setCategoryForm({ name: "", desc: "" });
  };

  return (
    <div
      className="dashboard-container"
      style={{
        minHeight: "100vh",
        padding: "35px",
        boxSizing: "border-box",
        overflowX: "hidden",
        WebkitOverflowScrolling: "touch",
        position: "relative"
      }}
    >
      {/* Global Fixed Canvas Background */}
      <div 
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          background: "linear-gradient(to bottom right, #FAF8FF, #FFFFFF, #FDF4FF)",
          zIndex: -10
        }} 
      />

      <style>
        {`
          * { box-sizing: border-box; }
          html { scroll-behavior: smooth; }
          body {
            overflow-x: hidden;
            background: #FAF8FF;
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          }
          .dashboard-container { width: 100%; overflow-x: hidden; will-change: auto; }

          .quick-action-btn {
            background: #73518C;
            color: #ffffff;
            border: none;
            padding: 24px 16px;
            border-radius: 18px;
            font-weight: 700;
            font-size: 16px;
            cursor: pointer;
            letter-spacing: -0.2px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            width: 100%;
            box-shadow: 0 4px 12px rgba(115, 81, 140, 0.15);
            transition: background 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;
          }
          .quick-action-btn:hover {
            background: #5E3F75;
            box-shadow: 0 6px 16px rgba(115, 81, 140, 0.25);
            transform: translateY(-1px);
          }
          .quick-action-btn:active { transform: translateY(1px); }

          .action-input {
            width: 100%;
            padding: 14px 18px;
            border: 1px solid #E2D9EE;
            border-radius: 14px;
            font-size: 15px;
            color: #2D1B69;
            background: #FFFFFF;
            outline: none;
            margin-top: 8px;
            transition: border-color 0.2s ease;
          }
          .action-input:focus { border-color: #A855F7; }
          
          .modal-submit-btn {
            background: #A855F7;
            color: #fff;
            border: none;
            padding: 14px 28px;
            border-radius: 14px;
            font-weight: 700;
            font-size: 15px;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            transition: background 0.2s ease;
          }
          .modal-submit-btn:hover { background: #9333EA; }

          .animated-table-row { transition: background-color 0.18s ease; }
          .animated-table-row:hover { background-color: #FDF4FF !important; }
          .pulse-monitor-card { transition: box-shadow 0.2s ease, border-color 0.2s ease; transform: translateZ(0); backface-visibility: hidden; }
          .pulse-monitor-card:hover { box-shadow: 0 8px 22px rgba(168,85,247,0.12) !important; border-color: #D8B4FE; }
          .stable-card { contain: layout paint; transform: translateZ(0); backface-visibility: hidden; }
        `}
      </style>

      {/* HEADER */}
      <div style={{ marginBottom: "35px" }}>
        <h1 style={{ fontSize: "38px", fontWeight: "800", color: "#2D1B69", margin: 0 }}>
          Dashboard Overview
        </h1>
        <p style={{ color: "#7C6A9A", fontSize: "15px", marginTop: "8px" }}>
          Monitor platform performance, analytics, bookings and realtime activities.
        </p>
      </div>

      {/* TOP GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 540px", gap: "30px", marginBottom: "35px", alignItems: "stretch" }}>
        
        {/* ANALYTICS */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#7C6A9A", margin: "0 0 18px 0", textTransform: "uppercase" }}>
            Real-time Metrics
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", flexGrow: 1 }}>
            {analyticsCards.map((card, index) => (
              <div key={index} className="stable-card" style={{ background: "#FFFFFF", borderRadius: "22px", padding: "20px", border: "1px solid #EEE6FF", display: "flex", alignItems: "center", gap: "18px", boxShadow: "0 8px 30px rgba(168,85,247,0.08)" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {card.icon}
                </div>
                <div>
                  <p style={{ color: "#7C6A9A", margin: 0, fontSize: "13px", fontWeight: "600" }}>{card.title}</p>
                  <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#2D1B69", margin: "4px 0 0 0" }}>{card.value}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK ACTIONS SECTION */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ height: "33px" }} /> 
          <div
            className="stable-card"
            style={{
              background: "#F9F6FC",
              borderRadius: "45px",
              padding: "45px 40px",
              border: "1px solid #EFE9F5",
              boxShadow: "0 10px 40px rgba(147, 51, 234, 0.04)",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "center"
            }}
          >
            <h2 style={{ fontSize: "32px", fontWeight: "900", color: "#1E0E52", margin: "0 0 35px 5px", letterSpacing: "-0.5px" }}>
              Quick Actions
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "22px" }}>
              {quickActions.map((action) => (
                <button 
                  key={action.id} 
                  className="quick-action-btn"
                  onClick={() => handleActionClick(action.id)}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- FORM WORKFLOW MODALS --- */}
      {isModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(30, 14, 82, 0.4)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" }}>
          <div style={{ background: "#FFFFFF", borderRadius: "32px", width: "100%", maxWidth: "550px", boxShadow: "0 20px 50px rgba(45,27,105,0.15)", border: "1px solid #EEE6FF", overflow: "hidden" }}>
            
            <div style={{ padding: "24px 32px", background: "#FAF8FF", borderBottom: "1px solid #EEE6FF", display: "flex", alignItems: "center", justifyContent: "between" }}>
              <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#2D1B69", margin: 0 }}>
                {quickActions.find(a => a.id === activeAction)?.label}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", color: "#7C6A9A" }}>
                <X size={22} />
              </button>
            </div>

            <div style={{ padding: "32px" }}>
              {/* 1. Add Provider */}
              {activeAction === "add-provider" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <label style={{ fontSize: "14px", fontWeight: "700", color: "#4C1D95" }}>Full Name
                    <input type="text" className="action-input" placeholder="e.g. Rahul Sharma" value={providerForm.name} onChange={e => setProviderForm({...providerForm, name: e.target.value})} />
                  </label>
                  <label style={{ fontSize: "14px", fontWeight: "700", color: "#4C1D95" }}>Service Speciality
                    <input type="text" className="action-input" placeholder="e.g. AC Repair Expert" value={providerForm.service} onChange={e => setProviderForm({...providerForm, service: e.target.value})} />
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <label style={{ fontSize: "14px", fontWeight: "700", color: "#4C1D95" }}>Email Address
                      <input type="email" className="action-input" placeholder="rahul@example.com" value={providerForm.email} onChange={e => setProviderForm({...providerForm, email: e.target.value})} />
                    </label>
                    <label style={{ fontSize: "14px", fontWeight: "700", color: "#4C1D95" }}>Phone Number
                      <input type="text" className="action-input" placeholder="+91 98765..." value={providerForm.phone} onChange={e => setProviderForm({...providerForm, phone: e.target.value})} />
                    </label>
                  </div>
                  <div style={{ marginTop: "12px", textAlign: "right" }}>
                    <button className="modal-submit-btn" onClick={() => handleActionSubmit("New service provider successfully registered inside system databases.")}><Plus size={18} /> Register Provider</button>
                  </div>
                </div>
              )}

              {/* 2. Create Coupon */}
              {activeAction === "create-coupon" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <label style={{ fontSize: "14px", fontWeight: "700", color: "#4C1D95" }}>Coupon Code
                    <input type="text" className="action-input" placeholder="e.g. FIX2026" style={{ textTransform: "uppercase" }} value={couponForm.code} onChange={e => setCouponForm({...couponForm, code: e.target.value})} />
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <label style={{ fontSize: "14px", fontWeight: "700", color: "#4C1D95" }}>Discount Percentage (%)
                      <input type="number" className="action-input" placeholder="15" value={couponForm.discount} onChange={e => setCouponForm({...couponForm, discount: e.target.value})} />
                    </label>
                    <label style={{ fontSize: "14px", fontWeight: "700", color: "#4C1D95" }}>Expiry Date
                      <input type="date" className="action-input" value={couponForm.expiry} onChange={e => setCouponForm({...couponForm, expiry: e.target.value})} />
                    </label>
                  </div>
                  <div style={{ marginTop: "12px", textAlign: "right" }}>
                    <button className="modal-submit-btn" onClick={() => handleActionSubmit("Promo offer discount code generated and enabled for platform customers.")}>Generate Discount</button>
                  </div>
                </div>
              )}

              {/* 3. Send Notification */}
              {activeAction === "send-notification" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <label style={{ fontSize: "14px", fontWeight: "700", color: "#4C1D95" }}>Broadcast Message
                    <textarea className="action-input" rows={4} placeholder="Type copy here..." value={notificationText} onChange={e => setNotificationText(e.target.value)} style={{ resize: "none" }} />
                  </label>
                  <div style={{ marginTop: "12px", textAlign: "right" }}>
                    <button className="modal-submit-btn" onClick={() => handleActionSubmit("Global system push notification dispatched to app clients.")}><Send size={16} /> Dispatch Message</button>
                  </div>
                </div>
              )}

              {/* 4. Export Reports */}
              {activeAction === "export-reports" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <p style={{ color: "#7C6A9A", fontSize: "14px", margin: 0 }}>Choose a compiled telemetry stream option to output:</p>
                  {["System Revenue Stream Ledger (.CSV)", "Active Provider Performance Audit (.PDF)"].map((report, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", padding: "14px 20px", background: "#FAF8FF", borderRadius: "12px", border: "1px solid #EEE6FF", justifyContent: "space-between" }}>
                      <span style={{ fontWeight: "600", color: "#2D1B69" }}>{report}</span>
                      <button className="modal-submit-btn" style={{ padding: "8px 14px", fontSize: "13px" }} onClick={() => handleActionSubmit("Platform tracking telemetry compilation compiled down successfully.")}><Download size={14} /> Fetch</button>
                    </div>
                  ))}
                </div>
              )}

              {/* 5. Add Category */}
              {activeAction === "add-category" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <label style={{ fontSize: "14px", fontWeight: "700", color: "#4C1D95" }}>Category Catalog Label
                    <input type="text" className="action-input" placeholder="e.g. Smart Home Installation" value={categoryForm.name} onChange={e => setCategoryForm({...categoryForm, name: e.target.value})} />
                  </label>
                  <label style={{ fontSize: "14px", fontWeight: "700", color: "#4C1D95" }}>Description Meta
                    <input type="text" className="action-input" placeholder="Brief statement regarding catalog scope" value={categoryForm.desc} onChange={e => setCategoryForm({...categoryForm, desc: e.target.value})} />
                  </label>
                  <div style={{ marginTop: "12px", textAlign: "right" }}>
                    <button className="modal-submit-btn" onClick={() => handleActionSubmit("New ecosystem service structural node committed to production.")}>Commit Category</button>
                  </div>
                </div>
              )}

              {/* 6. View Complaints */}
              {activeAction === "view-complaints" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ padding: "16px", background: "#FFF5F5", borderRadius: "14px", borderLeft: "4px solid #EF4444" }}>
                    <span style={{ fontWeight: "700", color: "#DC2626" }}>CMP-4412</span>
                    <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#7F1D1D" }}>Delayed assignment update on cleaning workflow structural path.</p>
                  </div>
                  <div style={{ marginTop: "12px", textAlign: "right" }}>
                    <button className="modal-submit-btn" onClick={() => handleActionSubmit("Platform complaint logs audited and flag tokens updated.")}>Acknowledge Tickets</button>
                  </div>
                </div>
              )}

              {/* 7. System Logs */}
              {activeAction === "system-logs" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ fontFamily: "monospace", fontSize: "13px", padding: "12px", background: "#1E1E24", color: "#A7F3D0", borderRadius: "8px" }}>
                    [19:34:12] AUTH: Session state verified safely.
                  </div>
                  <div style={{ marginTop: "12px", textAlign: "right" }}>
                    <button className="modal-submit-btn" onClick={() => handleActionSubmit("Production server event loop snapshots flushed and cleared.")}>Flush Log Streams</button>
                  </div>
                </div>
              )}

              {/* 8. Manage Payouts */}
              {activeAction === "manage-payouts" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", textAlign: "center" }}>
                  <h4 style={{ margin: 0, fontSize: "28px", fontWeight: "800", color: "#14532D" }}>₹4,82,500</h4>
                  <p style={{ fontSize: "14px", color: "#7C6A9A", margin: 0 }}>Pending balance settlements ready for transfer batch runs.</p>
                  <div style={{ marginTop: "12px" }}>
                    <button className="modal-submit-btn" style={{ background: "#16A34A" }} onClick={() => handleActionSubmit("Direct electronic node bank fund transactions scheduled cleanly.")}>Clear Balance Transmit</button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* --- REUSABLE GLOBAL SUCCESS POPUP COMPONENT --- */}
      {showSuccessPopup && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(30, 14, 82, 0.25)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1100, padding: "20px" }}>
          <div style={{ background: "#FFFFFF", borderRadius: "28px", width: "100%", maxWidth: "420px", padding: "40px 30px", textAlign: "center", boxShadow: "0 20px 60px rgba(147,51,234,0.15)", border: "1px solid #EFE9F5" }}>
            <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "#F3E8FF", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px auto" }}>
              <CheckCircle size={40} color="#A855F7" />
            </div>
            <h3 style={{ fontSize: "24px", fontWeight: "800", color: "#2D1B69", margin: "0 0 10px 0" }}>
              Success!
            </h3>
            <p style={{ color: "#7C6A9A", fontSize: "15px", lineHeight: "1.5", margin: "0 0 28px 0" }}>
              {successMessage}
            </p>
            <button 
              onClick={() => setShowSuccessPopup(false)}
              style={{ background: "#73518C", color: "#fff", border: "none", width: "100%", padding: "14px 0", borderRadius: "14px", fontWeight: "700", fontSize: "16px", cursor: "pointer", transition: "background 0.2s" }}
              onMouseEnter={(e) => e.target.style.background = "#5E3F75"}
              onMouseLeave={(e) => e.target.style.background = "#73518C"}
            >
              Great, Continue
            </button>
          </div>
        </div>
      )}

      {/* --- CHARTS --- */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "25px", marginBottom: "35px" }}>
        {/* REVENUE */}
        <div className="stable-card" style={{ background: "#FFFFFF", borderRadius: "24px", padding: "28px", border: "1px solid #EEE6FF", boxShadow: "0 8px 30px rgba(168,85,247,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <TrendingUp color="#A855F7" />
            <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#2D1B69" }}>Revenue Analytics</h2>
          </div>
          <div style={{ height: "260px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C084FC" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#C084FC" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3E8FF" />
                <XAxis dataKey="name" stroke="#A78BFA" />
                <YAxis stroke="#A78BFA" />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#A855F7" strokeWidth={3} fillOpacity={1} fill="url(#revenueGrad)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BOOKINGS */}
        <div className="stable-card" style={{ background: "#FFFFFF", borderRadius: "24px", padding: "28px", border: "1px solid #EEE6FF", boxShadow: "0 8px 30px rgba(168,85,247,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <Briefcase color="#EC4899" />
            <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#2D1B69" }}>Booking Analytics</h2>
          </div>
          <div style={{ height: "260px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bookingData}>
                <defs>
                  <linearGradient id="bookingGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F472B6" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#F472B6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#FCE7F3" />
                <XAxis dataKey="name" stroke="#EC4899" />
                <YAxis stroke="#EC4899" />
                <Tooltip />
                <Area type="monotone" dataKey="bookings" stroke="#EC4899" strokeWidth={3} fillOpacity={1} fill="url(#bookingGrad)" isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* LIVE ACTIVITY */}
      <div className="stable-card" style={{ background: "#FFFFFF", borderRadius: "24px", padding: "30px", border: "1px solid #EEE6FF", boxShadow: "0 8px 30px rgba(168,85,247,0.08)", marginBottom: "35px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#2D1B69", marginBottom: "22px" }}>Live Platform Activity</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {[
            { text: "New booking created by Rahul Sharma", color: "#C084FC" },
            { text: "Provider accepted AC Repair booking", color: "#EC4899" },
            { text: "Payment completed successfully", color: "#A855F7" },
            { text: "Refund request raised", color: "#F472B6" },
          ].map((item, index) => (
            <div key={index} style={{ background: "#FDF4FF", padding: "18px", borderRadius: "16px", borderLeft: `5px solid ${item.color}`, fontWeight: "600", color: "#4C1D95" }}>
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="stable-card" style={{ background: "#FFFFFF", borderRadius: "24px", padding: "30px", border: "1px solid #EEE6FF", overflowX: "auto", boxShadow: "0 8px 30px rgba(168,85,247,0.08)", marginBottom: "35px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#2D1B69", marginBottom: "22px" }}>Recent System Bookings</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F5F3FF" }}>
              {["Booking ID", "Customer", "Provider", "Service", "Status", "Amount", "Date"].map((head) => (
                <th key={head} style={{ padding: "16px", textAlign: "left", color: "#7C6A9A", borderBottom: "1px solid #EEE6FF" }}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { id: "BK-1021", cust: "Rahul Sharma", prov: "Amit Kumar", serv: "AC Repair", status: "Completed", amt: "₹1,800", date: "21 May", badgeBg: "#F3E8FF", badgeColor: "#9333EA" },
              { id: "BK-1022", cust: "Priya Mehta", prov: "Suresh Patel", serv: "Salon Service", status: "Pending", amt: "₹2,200", date: "21 May", badgeBg: "#FCE7F3", badgeColor: "#DB2777" },
              { id: "BK-1023", cust: "Arjun Patel", prov: "Ravi Sharma", serv: "Cleaning", status: "Cancelled", amt: "₹1,200", date: "21 May", badgeBg: "#FAE8FF", badgeColor: "#A21CAF" },
            ].map((row, index) => (
              <tr key={index} className="animated-table-row" style={{ background: index % 2 === 0 ? "#FFFFFF" : "#FDFBFF" }}>
                <td style={{ padding: "16px", color: "#9333EA", borderBottom: "1px solid #EEE6FF" }}>{row.id}</td>
                <td style={{ padding: "16px", color: "#2D1B69", borderBottom: "1px solid #EEE6FF" }}>{row.cust}</td>
                <td style={{ padding: "16px", color: "#7C6A9A", borderBottom: "1px solid #EEE6FF" }}>{row.prov}</td>
                <td style={{ padding: "16px", color: "#2D1B69", borderBottom: "1px solid #EEE6FF" }}>{row.serv}</td>
                <td style={{ padding: "16px", borderBottom: "1px solid #EEE6FF" }}>
                  <span style={{ background: row.badgeBg, color: row.badgeColor, padding: "6px 14px", borderRadius: "10px", fontWeight: "700", fontSize: "12px" }}>{row.status}</span>
                </td>
                <td style={{ padding: "16px", color: "#2D1B69", borderBottom: "1px solid #EEE6FF" }}>{row.amt}</td>
                <td style={{ padding: "16px", color: "#7C6A9A", borderBottom: "1px solid #EEE6FF" }}>{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MONITOR CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "20px" }}>
        {[
          { title: "Support Tickets", value: "128 Open Tickets", icon: <MessageSquare color="#A855F7" />, accent: "#A855F7", bg: "#F3E8FF" },
          { title: "Payment Monitoring", value: "24 Failed Payments", icon: <CreditCard color="#EC4899" />, accent: "#EC4899", bg: "#FCE7F3" },
          { title: "System Performance", value: "99.8% Server Uptime", icon: <Server color="#C084FC" />, accent: "#C084FC", bg: "#FAE8FF" },
          { title: "Review Monitoring", value: "182 New Reviews", icon: <Eye color="#D946EF" />, accent: "#D946EF", bg: "#F3E8FF" },
        ].map((card, index) => (
          <div key={index} className="pulse-monitor-card stable-card" style={{ background: "#FFFFFF", borderRadius: "24px", padding: "24px", border: "1px solid #EEE6FF", boxShadow: "0 8px 30px rgba(168,85,247,0.08)", position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "5px", background: card.accent, borderTopLeftRadius: "24px", borderTopRightRadius: "24px" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
              <div>
                <h3 style={{ fontSize: "15px", fontWeight: "600", color: "#7C6A9A", marginBottom: "6px" }}>{card.title}</h3>
                <p style={{ color: "#2D1B69", fontWeight: "800", fontSize: "18px" }}>{card.value}</p>
              </div>
              <div className="icon-wrapper" style={{ width: "48px", height: "48px", borderRadius: "14px", background: card.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div style={{ marginTop: "45px", textAlign: "center", color: "#9F7AEA", fontSize: "14px", fontWeight: "600" }}>
        © 2026 QuickFix Admin Dashboard. All rights reserved.
      </div>
    </div>
  );
};

export default DashboardPage;