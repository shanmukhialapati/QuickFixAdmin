import React from "react";
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
  const revenueData = [
    { name: "Mon", revenue: 1.2 },
    { name: "Tue", revenue: 1.8 },
    { name: "Wed", revenue: 1.5 },
    { name: "Thu", revenue: 2.9 },
    { name: "Fri", revenue: 2.4 },
    { name: "Sat", revenue: 3.8 },
    { name: "Sun", revenue: 3.2 },
  ];

  const bookingData = [
    { name: "Mon", bookings: 120 },
    { name: "Tue", bookings: 210 },
    { name: "Wed", bookings: 180 },
    { name: "Thu", bookings: 340 },
    { name: "Fri", bookings: 310 },
    { name: "Sat", bookings: 480 },
    { name: "Sun", bookings: 410 },
  ];

  const analyticsCards = [
    {
      title: "Total Customers",
      value: "12,580",
      icon: <Users color="#A855F7" />,
      bg: "#F3E8FF",
    },
    {
      title: "Active Providers",
      value: "2,480",
      icon: <UserCheck color="#EC4899" />,
      bg: "#FCE7F3",
    },
    {
      title: "Total Bookings",
      value: "28,450",
      icon: <CalendarCheck color="#8B5CF6" />,
      bg: "#F5F3FF",
    },
    {
      title: "Monthly Revenue",
      value: "₹24.8L",
      icon: <IndianRupee color="#D946EF" />,
      bg: "#FAE8FF",
    },
    {
      title: "Wallet Transactions",
      value: "₹8.2L",
      icon: <Wallet color="#C084FC" />,
      bg: "#F3E8FF",
    },
    {
      title: "Customer Rating",
      value: "4.8",
      icon: <Star color="#EC4899" />,
      bg: "#FCE7F3",
    },
    {
      title: "Pending Bookings",
      value: "480",
      icon: <Clock3 color="#A855F7" />,
      bg: "#F5F3FF",
    },
    {
      title: "Fraud Alerts",
      value: "24",
      icon: <ShieldAlert color="#DB2777" />,
      bg: "#FAE8FF",
    },
  ];

  const quickActions = [
    "Add Provider",
    "Create Coupon",
    "Send Notification",
    "Export Reports",
    "Add Category",
    "View Complaints",
    "System Logs",
    "Manage Payouts",
  ];

  const boxBgColor = "#FAF8FF";

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
      {/* Global Fixed Canvas Background Component Injection */}
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
          * {
            box-sizing: border-box;
          }

          html {
            scroll-behavior: smooth;
          }

          body {
            overflow-x: hidden;
            background: #FAF8FF;
            margin: 0;
            padding: 0;
          }

          .dashboard-container {
            width: 100%;
            overflow-x: hidden;
            will-change: auto;
          }

          .quick-action-btn {
            background: #3b0660b5;
            color: #fff;
            border: none;
            padding: 14px 20px;
            border-radius: 14px;
            font-weight: 700;
            font-size: 14px;
            cursor: pointer;

            transition:
              background 0.2s ease,
              box-shadow 0.2s ease,
              opacity 0.2s ease;

            box-shadow: 0 6px 18px rgba(192,132,252,0.18);

            transform: translateZ(0);
            backface-visibility: hidden;
          }

          .quick-action-btn:hover {
            opacity: 0.95;
            box-shadow: 0 8px 20px rgba(236,72,153,0.16);
          }

          .animated-table-row {
            transition: background-color 0.18s ease;
          }

          .animated-table-row:hover {
            background-color: #FDF4FF !important;
          }

          .pulse-monitor-card {
            transition:
              box-shadow 0.2s ease,
              border-color 0.2s ease;

            transform: translateZ(0);
            backface-visibility: hidden;
          }

          .pulse-monitor-card:hover {
            box-shadow: 0 8px 22px rgba(168,85,247,0.12) !important;
            border-color: #D8B4FE;
          }

          .stable-card {
            contain: layout paint;
            transform: translateZ(0);
            backface-visibility: hidden;
          }

          .recharts-wrapper,
          .recharts-responsive-container {
            transform: translateZ(0);
          }
        `}
      </style>

      {/* HEADER */}
      <div style={{ marginBottom: "35px" }}>
        <h1
          style={{
            fontSize: "38px",
            fontWeight: "800",
            color: "#2D1B69",
            margin: 0,
          }}
        >
          Dashboard Overview
        </h1>

        <p
          style={{
            color: "#7C6A9A",
            fontSize: "15px",
            marginTop: "8px",
          }}
        >
          Monitor platform performance, analytics, bookings and realtime activities.
        </p>
      </div>

      {/* TOP GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "580px 1fr",
          gap: "30px",
          marginBottom: "35px",
          alignItems: "stretch",
        }}
      >
        {/* ANALYTICS */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3
            style={{
              fontSize: "15px",
              fontWeight: "700",
              color: "#7C6A9A",
              margin: "0 0 18px 0",
              textTransform: "uppercase",
            }}
          >
            Real-time Metrics
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              flexGrow: 1,
            }}
          >
            {analyticsCards.map((card, index) => (
              <div
                key={index}
                className="stable-card"
                style={{
                  background: "#FFFFFF",
                  borderRadius: "22px",
                  padding: "20px",
                  border: "1px solid #EEE6FF",
                  display: "flex",
                  alignItems: "center",
                  gap: "18px",
                  boxShadow: "0 8px 30px rgba(168,85,247,0.08)",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "16px",
                    background: card.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {card.icon}
                </div>

                <div>
                  <p
                    style={{
                      color: "#7C6A9A",
                      margin: 0,
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    {card.title}
                  </p>

                  <h2
                    style={{
                      fontSize: "24px",
                      fontWeight: "800",
                      color: "#2D1B69",
                      margin: "4px 0 0 0",
                    }}
                  >
                    {card.value}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "33px",
          }}
        >
          <div
            className="stable-card"
            style={{
              background: boxBgColor,
              borderRadius: "24px",
              padding: "30px",
              border: "1px solid #E9D5FF",
              boxShadow: "0 8px 30px rgba(168,85,247,0.08)",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "800",
                color: "#2D1B69",
                margin: "0 0 24px 0",
              }}
            >
              Quick Actions
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "18px",
                flexGrow: 1,
              }}
            >
              {quickActions.map((action, index) => (
                <button key={index} className="quick-action-btn">
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "25px",
          marginBottom: "35px",
        }}
      >
        {/* REVENUE */}
        <div
          className="stable-card"
          style={{
            background: "#FFFFFF",
            borderRadius: "24px",
            padding: "28px",
            border: "1px solid #EEE6FF",
            boxShadow: "0 8px 30px rgba(168,85,247,0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <TrendingUp color="#A855F7" />

            <h2
              style={{
                fontSize: "22px",
                fontWeight: "800",
                color: "#2D1B69",
              }}
            >
              Revenue Analytics
            </h2>
          </div>

          <div style={{ height: "260px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="#C084FC"
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="95%"
                      stopColor="#C084FC"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#F3E8FF"
                />

                <XAxis dataKey="name" stroke="#A78BFA" />
                <YAxis stroke="#A78BFA" />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#A855F7"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#revenueGrad)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BOOKINGS */}
        <div
          className="stable-card"
          style={{
            background: "#FFFFFF",
            borderRadius: "24px",
            padding: "28px",
            border: "1px solid #EEE6FF",
            boxShadow: "0 8px 30px rgba(168,85,247,0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "20px",
            }}
          >
            <Briefcase color="#EC4899" />

            <h2
              style={{
                fontSize: "22px",
                fontWeight: "800",
                color: "#2D1B69",
              }}
            >
              Booking Analytics
            </h2>
          </div>

          <div style={{ height: "260px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bookingData}>
                <defs>
                  <linearGradient id="bookingGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="#F472B6"
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="95%"
                      stopColor="#F472B6"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#FCE7F3"
                />

                <XAxis dataKey="name" stroke="#EC4899" />
                <YAxis stroke="#EC4899" />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="bookings"
                  stroke="#EC4899"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#bookingGrad)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* LIVE ACTIVITY */}
      <div
        className="stable-card"
        style={{
          background: "#FFFFFF",
          borderRadius: "24px",
          padding: "30px",
          border: "1px solid #EEE6FF",
          boxShadow: "0 8px 30px rgba(168,85,247,0.08)",
          marginBottom: "35px",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "800",
            color: "#2D1B69",
            marginBottom: "22px",
          }}
        >
          Live Platform Activity
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {[
            {
              text: "New booking created by Rahul Sharma",
              color: "#C084FC",
            },
            {
              text: "Provider accepted AC Repair booking",
              color: "#EC4899",
            },
            {
              text: "Payment completed successfully",
              color: "#A855F7",
            },
            {
              text: "Refund request raised",
              color: "#F472B6",
            },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                background: "#FDF4FF",
                padding: "18px",
                borderRadius: "16px",
                borderLeft: `5px solid ${item.color}`,
                fontWeight: "600",
                color: "#4C1D95",
              }}
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div
        className="stable-card"
        style={{
          background: "#FFFFFF",
          borderRadius: "24px",
          padding: "30px",
          border: "1px solid #EEE6FF",
          overflowX: "auto",
          boxShadow: "0 8px 30px rgba(168,85,247,0.08)",
          marginBottom: "35px",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "800",
            color: "#2D1B69",
            marginBottom: "22px",
          }}
        >
          Recent System Bookings
        </h2>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F5F3FF" }}>
              {[
                "Booking ID",
                "Customer",
                "Provider",
                "Service",
                "Status",
                "Amount",
                "Date",
              ].map((head) => (
                <th
                  key={head}
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    color: "#7C6A9A",
                    borderBottom: "1px solid #EEE6FF",
                  }}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {[
              {
                id: "BK-1021",
                cust: "Rahul Sharma",
                prov: "Amit Kumar",
                serv: "AC Repair",
                status: "Completed",
                amt: "₹1,800",
                date: "21 May",
                badgeBg: "#F3E8FF",
                badgeColor: "#9333EA",
              },
              {
                id: "BK-1022",
                cust: "Priya Mehta",
                prov: "Suresh Patel",
                serv: "Salon Service",
                status: "Pending",
                amt: "₹2,200",
                date: "21 May",
                badgeBg: "#FCE7F3",
                badgeColor: "#DB2777",
              },
              {
                id: "BK-1023",
                cust: "Arjun Patel",
                prov: "Ravi Sharma",
                serv: "Cleaning",
                status: "Cancelled",
                amt: "₹1,200",
                date: "21 May",
                badgeBg: "#FAE8FF",
                badgeColor: "#A21CAF",
              },
            ].map((row, index) => (
              <tr
                key={index}
                className="animated-table-row"
                style={{
                  background: index % 2 === 0 ? "#FFFFFF" : "#FDFBFF",
                }}
              >
                <td
                  style={{
                    padding: "16px",
                    color: "#9333EA",
                    borderBottom: "1px solid #EEE6FF",
                  }}
                >
                  {row.id}
                </td>

                <td
                  style={{
                    padding: "16px",
                    color: "#2D1B69",
                    borderBottom: "1px solid #EEE6FF",
                  }}
                >
                  {row.cust}
                </td>

                <td
                  style={{
                    padding: "16px",
                    color: "#7C6A9A",
                    borderBottom: "1px solid #EEE6FF",
                  }}
                >
                  {row.prov}
                </td>

                <td
                  style={{
                    padding: "16px",
                    color: "#2D1B69",
                    borderBottom: "1px solid #EEE6FF",
                  }}
                >
                  {row.serv}
                </td>

                <td
                  style={{
                    padding: "16px",
                    borderBottom: "1px solid #EEE6FF",
                  }}
                >
                  <span
                    style={{
                      background: row.badgeBg,
                      color: row.badgeColor,
                      padding: "6px 14px",
                      borderRadius: "10px",
                      fontWeight: "700",
                      fontSize: "12px",
                    }}
                  >
                    {row.status}
                  </span>
                </td>

                <td
                  style={{
                    padding: "16px",
                    color: "#2D1B69",
                    borderBottom: "1px solid #EEE6FF",
                  }}
                >
                  {row.amt}
                </td>

                <td
                  style={{
                    padding: "16px",
                    color: "#7C6A9A",
                    borderBottom: "1px solid #EEE6FF",
                  }}
                >
                  {row.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MONITOR CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: "20px",
        }}
      >
        {[
          {
            title: "Support Tickets",
            value: "128 Open Tickets",
            icon: <MessageSquare color="#A855F7" />,
            accent: "#A855F7",
            bg: "#F3E8FF",
          },
          {
            title: "Payment Monitoring",
            value: "24 Failed Payments",
            icon: <CreditCard color="#EC4899" />,
            accent: "#EC4899",
            bg: "#FCE7F3",
          },
          {
            title: "System Performance",
            value: "99.8% Server Uptime",
            icon: <Server color="#C084FC" />,
            accent: "#C084FC",
            bg: "#FAE8FF",
          },
          {
            title: "Review Monitoring",
            value: "182 New Reviews",
            icon: <Eye color="#D946EF" />,
            accent: "#D946EF",
            bg: "#F3E8FF",
          },
        ].map((card, index) => (
          <div
            key={index}
            className="pulse-monitor-card stable-card"
            style={{
              background: "#FFFFFF",
              borderRadius: "24px",
              padding: "24px",
              border: "1px solid #EEE6FF",
              boxShadow: "0 8px 30px rgba(168,85,247,0.08)",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "5px",
                background: card.accent,
                borderTopLeftRadius: "24px",
                borderTopRightRadius: "24px",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <div>
                <h3
                  style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#7C6A9A",
                    marginBottom: "6px",
                  }}
                >
                  {card.title}
                </h3>

                <p
                  style={{
                    color: "#2D1B69",
                    fontWeight: "800",
                    fontSize: "18px",
                  }}
                >
                  {card.value}
                </p>
              </div>

              <div
                className="icon-wrapper"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "14px",
                  background: card.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div
        style={{
          marginTop: "45px",
          textAlign: "center",
          color: "#9F7AEA",
          fontSize: "14px",
          fontWeight: "600",
        }}
      >
        © 2026 QuickFix Admin Dashboard. All rights reserved.
      </div>
    </div>
  );
};

export default DashboardPage;