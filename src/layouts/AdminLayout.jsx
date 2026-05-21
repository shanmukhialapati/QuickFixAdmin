import React, { useState, useEffect, useRef } from "react";
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
  ChevronDown,
  CheckCheck,
  Trash2,
  Check,
  CreditCard as PayIcon,
  MessageSquare,
  AlertCircle,
  UserPlus,
  Package,
} from "lucide-react";

const INITIAL_NOTIFS = [
  {
    id: 1,
    type: "booking",
    title: "New booking #1042",
    sub: "Anita Sharma · Pipe Repair",
    time: "2 min ago",
    read: false,
  },
  {
    id: 2,
    type: "payment",
    title: "Payment received",
    sub: "₹1,200 from Rahul Kapoor",
    time: "15 min ago",
    read: false,
  },
  {
    id: 3,
    type: "review",
    title: "New review posted",
    sub: "5★ by Mohan Reddy",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 4,
    type: "user",
    title: "New customer joined",
    sub: "Sneha Tiwari signed up",
    time: "2 hours ago",
    read: true,
  },
  {
    id: 5,
    type: "booking",
    title: "New booking #1042",
    sub: "Anita Sharma · Pipe Repair",
    time: "2 min ago",
    read: false,
  },
];

const NOTIF_META = {
  booking: {
    icon: <Package size={14} />,
    bg: "bg-[#f3e5ff]",
  },
  payment: {
    icon: <PayIcon size={14} />,
    bg: "bg-[#f3e5ff]",
  },
  review: {
    icon: <MessageSquare size={14} />,
    bg: "bg-[#f3e5ff]",
  },
  user: {
    icon: <UserPlus size={14} />,
    bg: "bg-[#f3e5ff]",
  },
  alert: {
    icon: <AlertCircle size={14} />,
    bg: "bg-rose-100",
  },
};

const AdminLayout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const notifRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS);

  /* responsive */
  useEffect(() => {
    const mq = window.matchMedia("(max-width:768px)");

    const handler = (e) => {
      setIsMobile(e.matches);

      if (e.matches) {
        setSidebarOpen(false);
      }
    };

    handler(mq);

    mq.addEventListener("change", handler);

    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  /* close notification panel */
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const unreadCount = notifs.filter((n) => !n.read).length;

  const markRead = (id) => {
    setNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const deleteOne = (id) => {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
  };

  const markAllRead = () => {
    setNotifs((prev) =>
      prev.map((n) => ({
        ...n,
        read: true,
      })),
    );
  };

  const deleteAll = () => {
    setNotifs([]);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Service Providers",
      path: "/service-providers",
      icon: <Briefcase size={18} />,
    },
    {
      name: "Customers",
      path: "/customers",
      icon: <Users size={18} />,
    },
    {
      name: "Bookings",
      path: "/bookings",
      icon: <CalendarCheck size={18} />,
    },
    {
      name: "Categories",
      path: "/categories",
      icon: <Grid2X2 size={18} />,
    },
    {
      name: "Payments",
      path: "/payments",
      icon: <CreditCard size={18} />,
    },
    {
      name: "Reviews",
      path: "/reviews",
      icon: <Star size={18} />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={18} />,
    },
  ];

  const collapsed = !isMobile && !sidebarOpen;

  const pageTitle =
    location.pathname.split("/")[1]?.replace(/-/g, " ") || "Dashboard";

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4ecff] relative">
      {/* Ambient blobs */}

      <div className="absolute top-[-80px] right-[-80px] h-[320px] w-[320px] rounded-full bg-[#d9b3ff]/30 blur-3xl animate-pulse" />

      <div className="absolute bottom-[10%] left-[35%] h-[220px] w-[220px] rounded-full bg-purple-200/30 blur-3xl animate-pulse" />

      {/* Mobile overlay */}

      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`
          ${isMobile ? "fixed z-40" : "relative"}
          ${isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"}
          transition-all duration-300
          h-screen
          bg-white
          border-r border-[#f3e5ff]
          shadow-xl
          flex
          flex-col
        `}
        style={{
          width: collapsed ? "80px" : "260px",
        }}
      >
        {/* top gradient */}

        <div className="h-1 bg-gradient-to-r from-[#600080] via-[#8e24aa] to-[#d9b3ff] bg-[length:300%_100%] animate-pulse" />

        {/* logo */}

        <div
          className={`
            h-[70px]
            border-b
            border-[#f3e5ff]
            flex
            items-center
            ${collapsed ? "justify-center px-2" : "justify-between px-4"}
          `}
        >
          {!collapsed && (
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-[#600080] to-[#8d39a7] bg-clip-text text-transparent">
                QuickFix
              </h1>

              <p className="text-[10px] font-bold uppercase tracking-widest text-[#8e24aa]">
                Admin Panel
              </p>
            </div>
          )}

          {!isMobile && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="h-8 w-8 rounded-lg bg-[#f3e5ff] hover:bg-purple-200 text-[#600080] flex items-center justify-center transition"
            >
              {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          )}
        </div>

        {!collapsed && (
          <div className="px-5 pt-5 pb-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#600080]">
            Main Menu
          </div>
        )}

        {/* nav */}

        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
          {navItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  group
                  relative
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  font-bold
                  text-[14px]
                  transition-all
                  duration-200
                  ${collapsed ? "justify-center py-3" : "px-4 py-3"}
                  ${
                    active
                      ? "bg-gradient-to-r from-[#600080] via-[#600080] to-[#d9b3ff] text-white shadow-lg shadow-[#d9b3ff]/40"
                      : "text-[#600080] hover:bg-[#f3e5ff] hover:text-purple-900"
                  }
                `}
              >
                <div
                  className={`
                    h-9
                    w-9
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    transition
                    ${
                      active
                        ? "bg-white/20 text-white"
                        : "bg-[#f3e5ff] text-[#7a009f] group-hover:bg-purple-200"
                    }
                  `}
                >
                  {item.icon}
                </div>

                {!collapsed && (
                  <>
                    <span>{item.name}</span>

                    {active && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-white shadow-md" />
                    )}
                  </>
                )}

                {/* tooltip */}

                {collapsed && (
                  <div className="absolute left-[90px] opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-[#600080] via-[#600080] to-purple-400 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* logout */}

        <div className="p-3 border-t border-[#f3e5ff]">
          <button
            onClick={handleLogout}
            className={`
              w-full
              rounded-2xl
              border
              border-rose-200
              bg-rose-50
              text-rose-600
              font-bold
              text-sm
              flex
              items-center
              gap-3
              transition-all
              duration-200
              hover:bg-rose-600
              hover:text-white
              ${collapsed ? "justify-center py-3" : "px-4 py-3"}
            `}
          >
            <LogOut size={18} />

            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN AREA */}

      <div className="flex flex-1 flex-col overflow-hidden relative z-10">
        {/* HEADER */}

        <header className="h-[70px] shrink-0 bg-white/80 backdrop-blur-xl border-b border-[#f3e5ff] shadow-sm px-6 flex items-center justify-between">
          {/* left */}

          <div className="flex items-center gap-4">
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="h-10 w-10 rounded-xl border border-purple-200 bg-[#f3e5ff] text-[#600080] flex items-center justify-center"
              >
                <Menu size={18} />
              </button>
            )}

            <div>
              <h2 className="text-[28px] font-black capitalize text-purple-950 leading-none">
                {pageTitle}
              </h2>

              <div className="flex items-center gap-1 mt-1">
                <span className="text-[11px] font-semibold text-[#8e24aa]">
                  QuickFix
                </span>

                <ChevronRight size={10} className="text-purple-400" />

                <span className="rounded-full border border-purple-200 bg-[#f3e5ff] px-3 py-[2px] text-[10px] font-extrabold uppercase tracking-wide text-[#600080]">
                  {pageTitle}
                </span>
              </div>
            </div>
          </div>

          {/* right */}

          <div className="flex items-center gap-3">
            {/* notifications */}

            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative h-11 w-11 rounded-2xl border border-purple-200 bg-white hover:bg-[#faf5ff] text-[#600080] flex items-center justify-center transition"
              >
                <Bell size={18} />

                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[18px] h-[18px] rounded-full bg-[#7a009f] text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div className="absolute top-[calc(100%+14px)] -right-48 w-[340px] rounded-3xl border border-[#f3e5ff] bg-white shadow-2xl overflow-hidden">
                  <div className="p-4 border-b border-[#f3e5ff]">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-black text-purple-950">
                        Notifications
                      </h3>

                      {unreadCount > 0 && (
                        <span className="bg-[#7a009f] text-white text-[10px] font-extrabold px-2 py-1 rounded-full">
                          {unreadCount} New
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={markAllRead}
                        className="flex items-center gap-1 rounded-lg bg-[#f3e5ff] hover:bg-[#7a009f] hover:text-white text-[#600080] px-3 py-2 text-[11px] font-bold transition"
                      >
                        <CheckCheck size={12} />
                        Mark all read
                      </button>

                      <button
                        onClick={deleteAll}
                        className="flex items-center gap-1 rounded-lg bg-rose-100 hover:bg-rose-600 hover:text-white text-rose-700 px-3 py-2 text-[11px] font-bold transition"
                      >
                        <Trash2 size={12} />
                        Clear all
                      </button>
                    </div>
                  </div>

                  {/* list */}

                  <div className="max-h-[400px] overflow-y-auto p-3 space-y-2">
                    {notifs.length === 0 ? (
                      <div className="py-10 text-center">
                        <Bell
                          size={28}
                          className="mx-auto text-[#d9b3ff] mb-3"
                        />

                        <p className="font-bold text-purple-400">
                          All caught up!
                        </p>
                      </div>
                    ) : (
                      notifs.map((n) => {
                        const meta = NOTIF_META[n.type];

                        return (
                          <div
                            key={n.id}
                            onClick={() => markRead(n.id)}
                            className={`
                              group
                              rounded-2xl
                              p-3
                              flex
                              items-start
                              gap-3
                              transition
                              cursor-pointer
                              ${
                                n.read
                                  ? "bg-white hover:bg-[#faf5ff]"
                                  : "bg-[#faf5ff] hover:bg-[#f3e5ff]"
                              }
                            `}
                          >
                            <div
                              className={`
                                h-10
                                w-10
                                rounded-xl
                                flex
                                items-center
                                justify-center
                                text-[#600080]
                                ${meta.bg}
                              `}
                            >
                              {meta.icon}
                            </div>

                            <div className="flex-1 min-w-0">
                              <h4
                                className={`
                                  text-sm
                                  truncate
                                  ${n.read ? "font-semibold" : "font-extrabold"}
                                  text-purple-950
                                `}
                              >
                                {n.title}
                              </h4>

                              <p className="text-xs text-[#8e24aa] truncate mt-0.5 font-semibold">
                                {n.sub}
                              </p>

                              <p className="text-[11px] text-[#d9b3ff] font-bold mt-1">
                                {n.time}
                              </p>
                            </div>

                            {!n.read && (
                              <div className="h-2 w-2 rounded-full bg-[#7a009f] mt-2" />
                            )}

                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                              {!n.read && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markRead(n.id);
                                  }}
                                  className="h-7 w-7 rounded-lg bg-[#f3e5ff] hover:bg-[#7a009f] hover:text-white text-[#600080] flex items-center justify-center"
                                >
                                  <Check size={12} />
                                </button>
                              )}

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteOne(n.id);
                                }}
                                className="h-7 w-7 rounded-lg bg-rose-100 hover:bg-rose-600 hover:text-white text-rose-700 flex items-center justify-center"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* footer */}

                  {notifs.length > 0 && (
                    <div className="p-3 border-t border-[#f3e5ff]">
                      <button className="w-full rounded-xl border border-purple-200 bg-[#faf5ff] hover:bg-[#7a009f] hover:text-white text-[#600080] py-2 text-sm font-bold transition">
                        View all notifications
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* profile */}

            <div className="flex items-center gap-3 rounded-2xl border border-purple-200 bg-[#faf5ff] px-3 py-2 cursor-pointer">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-[#600080] to-purple-400 text-white flex items-center justify-center font-black shadow-lg shadow-[#d9b3ff]/50">
                A
              </div>

              <div className="hidden sm:block">
                <h4 className="text-sm font-black text-purple-950 leading-none">
                  Admin
                </h4>

                <p className="text-[11px] font-bold text-[#8e24aa] mt-1">
                  Super Admin
                </p>
              </div>

              <ChevronDown size={14} className="text-purple-400" />
            </div>
          </div>
        </header>

        {/* CONTENT */}

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
