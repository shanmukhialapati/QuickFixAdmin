import React from "react";
import { Clock3, Sparkles } from "lucide-react";

const ComingSoon = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #f9fafb, #ffffff, #eff6ff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          width: "100%",
          background: "#fff",
          borderRadius: "30px",
          padding: "50px",
          textAlign: "center",
          border: "1px solid #e5e7eb",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        {/* Badge */}
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
            marginBottom: "28px",
          }}
        >
          <Sparkles size={16} />
          reviews page is under construction
        </div>

        {/* Icon */}
        <div
          style={{
            width: "110px",
            height: "110px",
            margin: "0 auto 30px",
            borderRadius: "50%",
            background: "linear-gradient(to bottom right, #3b82f6, #06b6d4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Clock3 size={52} color="white" />
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "56px",
            fontWeight: "800",
            color: "#111827",
            marginBottom: "20px",
          }}
        >
          Coming Soon
        </h1>

        {/* Subtitle */}
        <p
          style={{
            color: "#6b7280",
            fontSize: "18px",
            lineHeight: "1.7",
            marginBottom: "35px",
          }}
        >
          We’re working hard to bring you an amazing QuickFix Admin experience
          with bookings, service providers, analytics, payments, and much more.
        </p>

        {/* Loader */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "35px",
          }}
        >
          <span
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#22d3ee",
            }}
          ></span>

          <span
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#3b82f6",
            }}
          ></span>

          <span
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#6366f1",
            }}
          ></span>
        </div>

        {/* Footer */}
        <div
          style={{
            fontSize: "14px",
            color: "#9ca3af",
          }}
        >
          © 2026 QuickFix Admin Dashboard. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
