import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Download, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Eye, 
  CreditCard,
  RefreshCw,
  TrendingUp
} from "lucide-react";

// DUMMY DATA FOR PAYMENTS REPRESENTATION
const initialPayments = [
  {
    id: "TXN-84021",
    customer: "Ananya Rao",
    email: "ananya.rao@gmail.com",
    provider: "Rahul Sharma (Electrician)",
    amount: "₹2,400",
    method: "Razorpay (UPI)",
    date: "May 21, 2026, 02:30 PM",
    status: "Success",
  },
  {
    id: "TXN-84020",
    customer: "Vikram Reddy",
    email: "vikram.r@yahoo.com",
    provider: "Arjun Reddy (Plumber)",
    amount: "₹1,850",
    method: "Razorpay (Card)",
    date: "May 20, 2026, 11:15 AM",
    status: "Pending",
  },
  {
    id: "TXN-84019",
    customer: "Srinivas Teja",
    email: "srinivas.t@gmail.com",
    provider: "Kiran Kumar (Driver)",
    amount: "₹4,200",
    method: "Razorpay (NetBanking)",
    date: "May 19, 2026, 06:45 PM",
    status: "Failed",
  },
  {
    id: "TXN-84018",
    customer: "Meenakshi K.",
    email: "meenu.k@gmail.com",
    provider: "Rahul Sharma (Electrician)",
    amount: "₹950",
    method: "Razorpay (UPI)",
    date: "May 18, 2026, 09:20 AM",
    status: "Success",
  },
  {
    id: "TXN-84017",
    customer: "Prakash Raj",
    email: "prakash.btech@gmail.com",
    provider: "Arjun Reddy (Plumber)",
    amount: "₹3,100",
    method: "Razorpay (Wallet)",
    date: "May 17, 2026, 04:10 PM",
    status: "Success",
  }
];

const statusStyles = {
  Success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Failed: "bg-rose-50 text-rose-700 border-rose-200",
};

const statusIcons = {
  Success: <CheckCircle size={14} className="text-emerald-600" />,
  Pending: <Clock size={14} className="text-amber-600" />,
  Failed: <XCircle size={14} className="text-rose-600" />,
};

const Payments = () => {
  const [payments, setPayments] = useState(initialPayments);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Handle Search and Filters
  const filteredPayments = payments.filter((item) => {
    const matchesSearch = 
      item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.provider.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (id) => {
    alert(`Viewing detailed transactional breakdown for: ${id}`);
  };

  // CSV DOWNLOAD FUNCTION
  const downloadCSV = () => {
    if (filteredPayments.length === 0) {
      alert("No data available to export!");
      return;
    }

    // 1. Define headers
    const headers = ["Transaction ID", "Customer Name", "Customer Email", "Service & Provider", "Amount", "Payment Method", "Date & Time", "Status"];
    
    // 2. Map data rows and wrap fields in quotes to handle commas safely
    const csvRows = filteredPayments.map(payment => [
      `"${payment.id}"`,
      `"${payment.customer.replace(/"/g, '""')}"`,
      `"${payment.email.replace(/"/g, '""')}"`,
      `"${payment.provider.replace(/"/g, '""')}"`,
      `"${payment.amount.replace(/"/g, '""')}"`,
      `"${payment.method.replace(/"/g, '""')}"`,
      `"${payment.date.replace(/"/g, '""')}"`,
      `"${payment.status}"`
    ].join(","));

    // 3. Combine headers and rows with newlines
    // Added '\uFEFF' (BOM) at the beginning so Excel correctly displays the Indian Rupee (₹) symbol
    const csvContent = "\uFEFF" + [headers.join(","), ...csvRows].join("\n");
    
    // 4. Create a download link and trigger click
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `payment_statement_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 md:p-6 bg-[#FAF8FF] min-h-screen font-sans">
      
      {/* ══════════ HEADER SECTION ══════════ */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0c2461] tracking-tight flex items-center gap-2">
            <CreditCard className="text-[#6E2594]" /> Payment Transactions
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor incoming platform revenues, Razorpay payouts, and transaction history.
          </p>
        </div>

        <button 
          onClick={downloadCSV}
          className="flex items-center justify-center gap-2 bg-[#6E2594] hover:bg-[#561B75] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-[#6E2594]/10 self-start sm:self-center"
        >
          <Download size={16} /> Export Statement
        </button>
      </div>

      {/* ══════════ FINANCIAL STATS CARDS ══════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-[0_4px_20px_rgba(110,37,148,0.02)] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Volume</p>
            <h3 className="text-2xl font-black text-gray-800 mt-1">₹3,42,800</h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-0.5">
              <TrendingUp size={12} /> +12.4% this week
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-[#6E2594]">
            <CreditCard size={22} />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-[0_4px_20px_rgba(110,37,148,0.02)] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Successful</p>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">₹3,12,400</h3>
            <p className="text-[11px] text-gray-400 font-medium mt-1">92% Conversion rate</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <ArrowUpRight size={22} />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-[0_4px_20px_rgba(110,37,148,0.02)] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Awaiting Escrow</p>
            <h3 className="text-2xl font-black text-amber-500 mt-1">₹18,500</h3>
            <p className="text-[11px] text-gray-400 font-medium mt-1">2 Pending transfers</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500">
            <Clock size={22} />
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-2xl border border-purple-100 shadow-[0_4px_20px_rgba(110,37,148,0.02)] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Platform Cut (10%)</p>
            <h3 className="text-2xl font-black text-blue-600 mt-1">₹34,280</h3>
            <p className="text-[11px] text-blue-600 font-semibold mt-1">Net Admin Revenue</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <RefreshCw size={20} className="animate-spin" style={{ animationDuration: '8s' }} />
          </div>
        </div>
      </div>

      {/* ══════════ SEARCH & FILTER UTILITIES ══════════ */}
      <div className="bg-white p-4 rounded-2xl border border-purple-50 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Bar Input */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID, customer name, or provider details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#6E2594]/10 focus:border-[#6E2594] transition-all bg-gray-50/50 focus:bg-white text-gray-700"
            />
          </div>

          {/* Status Dropdown Filter */}
          <div className="flex items-center gap-2 min-w-[160px]">
            <Filter size={14} className="text-gray-400 hidden sm:inline" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2.5 text-sm font-semibold text-gray-600 outline-none focus:ring-2 focus:ring-[#6E2594]/10 focus:border-[#6E2594] transition-all cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Success">Success</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* ══════════ RESPONSIVE DATA DISPLAY LAYOUT ══════════ */}
      
      {/* 1. DESKTOP/TABLET TABLE VIEW (Hidden on small mobile view screens) */}
      <div className="hidden md:block bg-white rounded-2xl border border-purple-50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="p-4 pl-6">Transaction ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Service & Provider</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Method</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-purple-50/20 transition-colors">
                    <td className="p-4 pl-6 font-mono font-bold text-gray-600">{payment.id}</td>
                    <td className="p-4">
                      <div className="font-semibold text-gray-800">{payment.customer}</div>
                      <div className="text-xs text-gray-400">{payment.email}</div>
                    </td>
                    <td className="p-4 text-gray-600 font-medium">{payment.provider}</td>
                    <td className="p-4 font-bold text-[#6E2594]">{payment.amount}</td>
                    <td className="p-4 text-xs font-semibold text-gray-500 bg-gray-50 rounded-lg px-2 py-1 inline-block mt-3">{payment.method}</td>
                    <td className="p-4 text-xs text-gray-500">{payment.date}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusStyles[payment.status]}`}>
                        {statusIcons[payment.status]}
                        {payment.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => handleViewDetails(payment.id)}
                        className="p-2 text-purple-600 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-10 text-center text-gray-400 font-medium">
                    No transactions match your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. MOBILE CARD VIEW (Hidden on desktop screen dimensions) */}
      <div className="block md:hidden space-y-4">
        {filteredPayments.length > 0 ? (
          filteredPayments.map((payment) => (
            <div 
              key={payment.id} 
              className="bg-white p-5 rounded-2xl border border-purple-50 shadow-sm space-y-3.5 relative overflow-hidden"
            >
              {/* Top Row: ID & Status Badge */}
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-gray-400">{payment.id}</span>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${statusStyles[payment.status]}`}>
                  {statusIcons[payment.status]}
                  {payment.status}
                </span>
              </div>

              {/* Customer Info */}
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Customer</span>
                <div className="font-bold text-gray-800 text-base">{payment.customer}</div>
                <div className="text-xs text-gray-400">{payment.email}</div>
              </div>

              {/* Service Provider Stack */}
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Allocation</span>
                <div className="text-sm font-semibold text-gray-600">{payment.provider}</div>
              </div>

              {/* Split Amount / Payment Method Box */}
              <div className="grid grid-cols-2 bg-gray-50/50 p-2.5 rounded-xl border border-gray-100 gap-2">
                <div>
                  <span className="text-[9px] uppercase font-bold text-gray-400 block">Total Paid</span>
                  <div className="text-base font-black text-[#6E2594]">{payment.amount}</div>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-gray-400 block">Channel</span>
                  <div className="text-xs font-bold text-gray-600 mt-0.5">{payment.method}</div>
                </div>
              </div>

              {/* Date, Time & Action Trigger Button Row */}
              <div className="flex items-center justify-between pt-1 border-t border-gray-50 text-xs">
                <span className="text-gray-400 font-medium">{payment.date}</span>
                <button
                  onClick={() => handleViewDetails(payment.id)}
                  className="flex items-center gap-1 text-xs font-bold text-purple-600 hover:text-purple-800"
                >
                  <Eye size={14} /> Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-8 rounded-2xl border text-center text-sm text-gray-400">
            No transactions found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;