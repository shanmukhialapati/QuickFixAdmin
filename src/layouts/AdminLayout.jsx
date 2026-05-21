import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  CalendarCheck,
  Grid2X2,
  CreditCard,
  Star,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronRight,
  Wrench,
  ChevronDown,
} from "lucide-react";

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Syne:wght@700;800&display=swap');

  :root {
    --bg:          #f0f9ff;
    --sidebar:     #ffffff;
    --accent:      #3b82f6;
    --accent2:     #06b6d4;
    --pastel1:     #e0f2fe;
    --pastel2:     #cffafe;
    --pastel3:     #dbeafe;
    --pastel4:     #d1fae5;
    --text:        #0c2461;
    --muted:       #64a0c8;
    --card:        #fffffff0;
    --border:      #bae6fd;
    --active-glow: 0 4px 24px #3b82f655;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    
    background: var(--bg);
    color: var(--text);
  }

  @keyframes slideIn {
    from { transform: translateX(-100%); opacity: 0; }
    to   { transform: translateX(0);     opacity: 1; }
  }
  @keyframes navPop {
    0%   { transform: scale(0.88); opacity: 0; }
    70%  { transform: scale(1.04); }
    100% { transform: scale(1);    opacity: 1; }
  }
  @keyframes floatBlob {
    0%, 100% { transform: translateY(0) scale(1); }
    50%       { transform: translateY(-18px) scale(1.04); }
  }
  @keyframes pulseDot {
    0%, 100% { box-shadow: 0 0 0 0 #06b6d480; }
    50%       { box-shadow: 0 0 0 6px #06b6d400; }
  }
  @keyframes slideDown {
    from { transform: translateY(-8px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }
  @keyframes gradientShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .admin-sidebar { animation: slideIn 0.45s cubic-bezier(.22,1,.36,1) both; }
  .nav-item      { animation: navPop 0.35s cubic-bezier(.22,1,.36,1) both; }
  .notif-badge   { animation: pulseDot 1.8s ease-in-out infinite; }
  .blob          { animation: floatBlob 6s ease-in-out infinite; }

  .nav-item:nth-child(1) { animation-delay: .05s; }
  .nav-item:nth-child(2) { animation-delay: .10s; }
  .nav-item:nth-child(3) { animation-delay: .15s; }
  .nav-item:nth-child(4) { animation-delay: .20s; }
  .nav-item:nth-child(5) { animation-delay: .25s; }
  .nav-item:nth-child(6) { animation-delay: .30s; }
  .nav-item:nth-child(7) { animation-delay: .35s; }
  .nav-item:nth-child(8) { animation-delay: .40s; }

  .nav-link {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 14px;
    border-radius: 14px;
    font-weight: 700;
    font-size: 14.5px;
    color: #2563eb;
    text-decoration: none;
    transition: background .2s, color .2s, transform .18s, box-shadow .2s;
  }
  .nav-link:hover {
    background: #e0f2fe;
    color: #1d4ed8;
    transform: translateX(4px);
  }
  .nav-link.active {
    background: linear-gradient(135deg, #3b82f6, #06b6d4);
    color: #fff;
    box-shadow: var(--active-glow);
    transform: translateX(0);
  }
  .nav-link.active .nav-icon-wrap {
    background: rgba(255,255,255,.28);
    color: #fff;
  }
  .nav-icon-wrap {
    width: 34px; height: 34px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    background: #e0f2fe;
    color: #3b82f6;
    flex-shrink: 0;
    transition: background .2s, color .2s;
  }
  .nav-link:hover .nav-icon-wrap {
    background: #bae6fd;
    color: #1d4ed8;
  }

  .nav-tooltip {
    position: absolute;
    left: calc(100% + 14px);
    top: 50%;
    transform: translateY(-50%);
    background: linear-gradient(135deg, #3b82f6, #06b6d4);
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    padding: 5px 12px;
    border-radius: 8px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity .2s;
    z-index: 999;
    box-shadow: 0 4px 14px #3b82f644;
  }
  .nav-link:hover .nav-tooltip { opacity: 1; }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #bae6fd; border-radius: 99px; }

  .mobile-overlay {
    position: fixed; inset: 0;
    background: #0c246166;
    backdrop-filter: blur(3px);
    z-index: 39;
    animation: slideDown .2s ease both;
  }

  .breadcrumb-chip {
    background: linear-gradient(135deg, #e0f2fe, #cffafe);
    border: 1px solid #bae6fd;
    padding: 2px 10px;
    border-radius: 99px;
    font-size: 11px;
    font-weight: 800;
    color: #0284c7;
    letter-spacing: .02em;
  }

  .glass-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 20px;
    backdrop-filter: blur(8px);
    box-shadow: 0 8px 32px #3b82f615;
  }

  /* Animated gradient bar at top of sidebar */
  .sidebar-topbar {
    height: 4px;
    background: linear-gradient(90deg, #3b82f6, #06b6d4, #3b82f6);
    background-size: 200% 100%;
    animation: gradientShift 3s ease infinite;
  }

  @media (max-width: 768px) {
    .admin-sidebar {
      position: fixed;
      top: 0; left: 0; bottom: 0;
      z-index: 40;
      width: 260px !important;
    }
    .sidebar-hidden {
      transform: translateX(-110%) !important;
      animation: none !important;
    }
  }
`;

const AdminLayout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e) => {
      setIsMobile(e.matches);
      if (e.matches) setSidebarOpen(false);
    };
    handler(mq);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={17} />,
    },
    {
      name: "Service Providers",
      path: "/service-providers",
      icon: <Briefcase size={17} />,
    },
    { name: "Customers", path: "/customers", icon: <Users size={17} /> },
    { name: "Bookings", path: "/bookings", icon: <CalendarCheck size={17} /> },
    { name: "Categories", path: "/categories", icon: <Grid2X2 size={17} /> },
    { name: "Payments", path: "/payments", icon: <CreditCard size={17} /> },
    { name: "Reviews", path: "/reviews", icon: <Star size={17} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={17} /> },
  ];

  const collapsed = !isMobile && !sidebarOpen;
  const pageTitle =
    location.pathname.split("/")[1]?.replace(/-/g, " ") || "Dashboard";

  return (
    <>
      <style>{globalCSS}</style>

      <div
        style={{
          display: "flex",
          height: "100vh",
          overflow: "hidden",
          background: "var(--bg)",
          position: "relative",
        }}
      >
        {/* Blobs */}
        <div
          className="blob"
          style={{
            position: "fixed",
            top: "-60px",
            right: "-60px",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #bae6fd55 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div
          className="blob"
          style={{
            position: "fixed",
            bottom: "8%",
            left: "35%",
            width: 220,
            height: 220,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #cffafe55 0%, transparent 70%)",
            animationDelay: "2.5s",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Mobile overlay */}
        {isMobile && sidebarOpen && (
          <div
            className="mobile-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ══════════ SIDEBAR ══════════ */}
        <aside
          className={`admin-sidebar ${isMobile && !sidebarOpen ? "sidebar-hidden" : ""}`}
          style={{
            width: collapsed ? 76 : 260,
            background: "#ffffff",
            display: "flex",
            flexDirection: "column",
            transition: "width .3s cubic-bezier(.22,1,.36,1)",
            flexShrink: 0,
            position: isMobile ? "fixed" : "relative",
            zIndex: 40,
            top: 0,
            bottom: 0,
            left: 0,
            boxShadow: "4px 0 24px #3b82f618",
            borderRight: "1px solid #e0f2fe",
            overflow: "hidden",
          }}
        >
          {/* Animated gradient top bar */}
          <div className="sidebar-topbar" />

          {/* Logo */}
          <div
            style={{
              height: 68,
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "space-between",
              padding: collapsed ? "0 12px" : "0 16px",
              borderBottom: "1px solid #e0f2fe",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 11,
                overflow: "hidden",
              }}
            >
              {/* <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 14,
                  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 18px #3b82f655",
                  flexShrink: 0,
                }}
              >
                <Wrench size={18} color="#fff" />
              </div> */}
              {!collapsed && (
                <div style={{ overflow: "hidden" }}>
                  <div
                    style={{
                      //   fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize: 17,
                      background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      letterSpacing: "-.01em",
                      lineHeight: 1.1,
                    }}
                  >
                    QuickFix
                  </div>
                  <div
                    style={{
                      fontSize: 10.5,
                      color: "#64a0c8",
                      fontWeight: 700,
                      letterSpacing: ".08em",
                      textTransform: "uppercase",
                    }}
                  >
                    Admin Panel
                  </div>
                </div>
              )}
            </div>
            {!isMobile && (
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 9,
                  border: "none",
                  background: "#e0f2fe",
                  color: "#3b82f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                  transition: "background .2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#bae6fd")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#e0f2fe")
                }
              >
                {sidebarOpen ? <X size={15} /> : <Menu size={15} />}
              </button>
            )}
          </div>

          {/* Section label */}
          {!collapsed && (
            <div
              style={{
                padding: "16px 18px 4px",
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: ".12em",
                color: "#93c5fd",
                textTransform: "uppercase",
                flexShrink: 0,
              }}
            >
              Main Menu
            </div>
          )}

          {/* Nav */}
          <nav
            style={{
              flex: 1,
              overflowY: "auto",
              padding: collapsed ? "10px 10px" : "4px 12px 12px",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <div
                  key={item.path}
                  className="nav-item"
                  style={{ position: "relative" }}
                >
                  <Link
                    to={item.path}
                    className={`nav-link ${active ? "active" : ""}`}
                    style={
                      collapsed
                        ? { justifyContent: "center", padding: "11px 0" }
                        : {}
                    }
                  >
                    <span className="nav-icon-wrap">{item.icon}</span>
                    {!collapsed && <span>{item.name}</span>}
                    {!collapsed && active && (
                      <span
                        style={{
                          marginLeft: "auto",
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          background: "#fff",
                          boxShadow: "0 0 8px #fff",
                        }}
                      />
                    )}
                    {collapsed && (
                      <span className="nav-tooltip">{item.name}</span>
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Logout */}
          <div
            style={{
              padding: collapsed ? "12px 10px" : "12px",
              borderTop: "1px solid #e0f2fe",
              flexShrink: 0,
            }}
          >
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: collapsed ? "center" : "flex-start",
                gap: 10,
                padding: collapsed ? "11px 0" : "11px 14px",
                borderRadius: 14,
                border: "1px solid #fecdd3",
                background: "#fff1f2",
                color: "#f43f5e",

                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ef444488";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "transparent";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fff1f2";
                e.currentTarget.style.color = "#f43f5e";
                e.currentTarget.style.borderColor = "#fecdd3";
              }}
            >
              <LogOut size={17} />
              {!collapsed && <span>Logout</span>}
            </button>
          </div>
        </aside>

        {/* ══════════ MAIN AREA ══════════ */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Header */}
          <header
            style={{
              height: 68,
              background: "rgba(255,255,255,.90)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid #e0f2fe",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 24px",
              flexShrink: 0,
              boxShadow: "0 2px 20px #3b82f610",
              position: "relative",
              zIndex: 20,
            }}
          >
            {/* Left */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 11,
                    border: "1px solid #bae6fd",
                    background: "#e0f2fe",
                    color: "#3b82f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Menu size={18} />
                </button>
              )}
              <div>
                <h2
                  style={{
                    fontWeight: 800,
                    fontSize: 25,
                    color: "#0c2461",
                    letterSpacing: "-.02em",
                    textTransform: "capitalize",
                    lineHeight: 1.2,
                  }}
                >
                  {pageTitle}
                </h2>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    marginTop: 2,
                  }}
                >
                  <span
                    style={{ fontSize: 11, color: "#64a0c8", fontWeight: 600 }}
                  >
                    QuickFix
                  </span>
                  <ChevronRight size={10} color="#64a0c8" />
                  <span
                    className="breadcrumb-chip"
                    style={{ textTransform: "capitalize" }}
                  >
                    {pageTitle}
                  </span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Notification */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setNotifOpen(!notifOpen)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    border: "1px solid #bae6fd",
                    background: notifOpen ? "#e0f2fe" : "#fff",
                    color: "#3b82f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all .2s",
                    position: "relative",
                  }}
                >
                  <Bell size={18} />
                  <span
                    className="notif-badge"
                    style={{
                      position: "absolute",
                      top: 9,
                      right: 9,
                      width: 9,
                      height: 9,
                      borderRadius: "50%",
                      background: "#06b6d4",
                      border: "2px solid #fff",
                    }}
                  />
                </button>

                {notifOpen && (
                  <div
                    className="glass-card"
                    style={{
                      position: "absolute",
                      top: "calc(100% + 10px)",
                      right: 0,
                      width: 290,
                      padding: 16,
                      zIndex: 99,
                      animation: "slideDown .2s ease both",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 800,
                        fontSize: 13,
                        marginBottom: 12,
                        color: "#0c2461",
                      }}
                    >
                      Notifications
                    </div>
                    {[
                      { t: "New booking #1042", s: "2 min ago", c: "#e0f2fe" },
                      { t: "Payment received", s: "15 min ago", c: "#d1fae5" },
                      { t: "New review posted", s: "1 hour ago", c: "#cffafe" },
                    ].map((n, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "9px 10px",
                          borderRadius: 11,
                          background: n.c,
                          marginBottom: 6,
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg,#3b82f6,#06b6d4)",
                            flexShrink: 0,
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontSize: 12.5,
                              fontWeight: 700,
                              color: "#0c2461",
                            }}
                          >
                            {n.t}
                          </div>
                          <div
                            style={{
                              fontSize: 10.5,
                              color: "#64a0c8",
                              fontWeight: 600,
                            }}
                          >
                            {n.s}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Admin profile */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#f0f9ff",
                  border: "1px solid #bae6fd",
                  borderRadius: 14,
                  padding: "7px 12px 7px 7px",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 11,
                    background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    fontWeight: 800,
                    fontSize: 15,
                    boxShadow: "0 3px 12px #3b82f655",
                  }}
                >
                  A
                </div>
                <div style={{ display: "none" }} className="md-show">
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: "#0c2461",
                      lineHeight: 1.2,
                    }}
                  >
                    Admin
                  </div>
                  <div
                    style={{
                      fontSize: 10.5,
                      color: "#0284c7",
                      fontWeight: 700,
                    }}
                  >
                    Super Admin
                  </div>
                </div>
                <ChevronDown size={13} color="#64a0c8" />
              </div>
            </div>
          </header>

          {/* Page content */}
          <main
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "24px",
              background: "transparent",
            }}
          >
            <Outlet />
          </main>
        </div>
      </div>

      <style>{`
        @media (min-width: 640px) { .md-show { display: block !important; } }
      `}</style>
    </>
  );
};

export default AdminLayout;
