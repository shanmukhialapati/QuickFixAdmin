import React, { useState } from 'react';
// 1. We import createPortal to break out of all parent layout tags
import { createPortal } from 'react-dom'; 
import { 
  Search, 
  Layers, 
  CheckCircle, 
  XCircle, 
  Clock, 
  IndianRupee, 
  User, 
  Calendar, 
  FileText,
  X
} from 'lucide-react';

export default function BookingsDashboard() {
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredRowId, setHoveredRowId] = useState(null);

  const bookings = [
    {
      id: 1,
      name: "John Doe",
      category: "Salon & Wellness",
      service: "Bridal Makeup & Styling",
      provider: "Jane Smith",
      status: "Pending",
      date: "May 24, 2026",
      time: "10:30 AM",
      price: "15,000",
      description: "Premium bridal makeup session including complete hair styling, saree draping, and professional high-definition cosmetics."
    },
    {
      id: 2,
      name: 'Kajal Singh',
      category: "Home Care",
      service: "Deep Home Cleaning",
      provider: "Ravi Kumar",
      status: "Completed",
      date: "May 20, 2026",
      time: "09:00 AM",
      price: "12,000",
      description: "Complete house scrubbing and sanitization targeting kitchen deep cleaning, bathroom descaling, balcony cleaning, and living room vacuuming."
    },
    {
      id: 3,
      name: "Vivek Bharti",
      category: "Repairs & Fixing",
      service: "Switchboard Repair & Wiring",
      provider: "Anil Sharma",
      status: "Pending",
      date: "May 23, 2026",
      time: "02:15 PM",
      price: "350",
      description: "Inspection of living room short circuit breaker and wiring replacement for three damaged modular switchboards."
    },
    {
      id: 4,
      name: "Priya Verma",
      category: "Repairs & Fixing",
      service: "Water Tank Cleaning",
      provider: "Sunil Gupta",
      status: "Completed",
      date: "May 19, 2026",
      time: "11:00 AM",
      price: "800",
      description: "High-pressure jet washing and chemical disinfection of a 1000-liter overhead PVC water reservoir."
    },
    {
      id: 5,
      name: "Amit Patel",
      category: "Repairs & Fixing",
      service: "AC Wet Cleaning & Service",
      provider: "Suresh Reddy",
      status: "Pending",
      date: "May 22, 2026",
      time: "04:30 PM",
      price: "1,500",
      description: "Jet-pump filter washing and cooling coil chemical cleanup for an outdoor split AC compressor setup."
    },
    {
      id: 6,
      name: "Sneha Kapoor",
      category: "Salon & Wellness",
      service: "Spa & Massage Therapy",
      provider: "Neha Singh",
      status: "Completed",
      date: "May 18, 2026",
      time: "05:00 PM",
      price: "1,800",
      description: "Relaxing full-body aromatherapy session using custom blended herbal oils to relieve stress and back strain."
    },
    {
      id: 7,
      name: "Rahul Sharma",
      category: "Salon & Wellness",
      service: "Hair Cutting & Coloring",
      provider: "Priya Singh",
      status: "Completed",
      date: "May 15, 2026",
      time: "12:00 PM",
      price: "8,500",
      description: "Trendy haircut consultation followed by ammonia-free global root touch-ups and hair setting."
    }
  ];

  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 w-full box-border min-h-screen bg-[#FAF8FF] font-sans">
      {/* Header section */}
      <div className="mb-7">
        <h1 className="text-[26px] font-black  m-0 mb-1">Bookings Dashboard</h1>
        <p className="text-[13px] font-bold m-0 font-black">Monitor and track active consumer marketplace service schedules</p>
      </div>

      {/* STATS SECTION */}
     <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5 mb-8">
  
  {/* TOTAL BOOKINGS */}
  <div className="bg-purple-100 rounded-[20px] p-5 flex items-center justify-between shadow-[0_4px_20px_rgba(136,6,206,0.06)] border-l-[6px] border-l-[#8806CE]">
    <div>
      <p className="m-0 text-[11px] font-bold text-[#8806CE]/60 uppercase tracking-wider">Total Bookings</p>
      <h3 className="m-0 mt-1 text-[28px] font-black text-[#2e004f]">7</h3>
    </div>
    <div className="w-[46px] h-[46px] rounded-[14px] bg-[#8806CE]/10 flex items-center justify-center text-[#8806CE]">
      <Layers size={22} />
    </div>
  </div>

  {/* PENDING */}
  <div className="bg-yellow-100 rounded-[20px] p-5 flex items-center justify-between shadow-[0_4px_20px_rgba(136,6,206,0.06)] border-l-[6px] border-l-[#f59e0b]">
    <div>
      <p className="m-0 text-[11px] font-bold text-[#8806CE]/60 uppercase tracking-wider">Pending</p>
      <h3 className="m-0 mt-1 text-[28px] font-black text-[#2e004f]">3</h3>
    </div>
    <div className="w-[46px] h-[46px] rounded-[14px] bg-[#fef3c7] flex items-center justify-center text-[#f59e0b]">
      <Clock size={22} />
    </div>
  </div>

  {/* COMPLETED */}
  <div className="bg-green-100 rounded-[20px] p-5 flex items-center justify-between shadow-[0_4px_20px_rgba(136,6,206,0.06)] border-l-[6px] border-l-[#10b981]">
    <div>
      <p className="m-0 text-[11px] font-bold text-[#8806CE]/60 uppercase tracking-wider">Completed</p>
      <h3 className="m-0 mt-1 text-[28px] font-black text-[#2e004f]">4</h3>
    </div>
    <div className="w-[46px] h-[46px] rounded-[14px] bg-[#ecfdf5] flex items-center justify-center text-[#10b981]">
      <CheckCircle size={22} />
    </div>
  </div>

  {/* CANCELLED */}
  <div className="bg-red-50 rounded-[20px] p-5 flex items-center justify-between shadow-[0_4px_20px_rgba(136,6,206,0.06)] border-l-[6px] border-l-[#ef4444]">
    <div>
      <p className="m-0 text-[11px] font-bold text-[#8806CE]/60 uppercase tracking-wider">Cancelled</p>
      <h3 className="m-0 mt-1 text-[28px] font-black text-[#2e004f]">0</h3>
    </div>
    <div className="w-[46px] h-[46px] rounded-[14px] bg-[#fff1f2] flex items-center justify-center text-[#ef4444]">
      <XCircle size={22} />
    </div>
  </div>

</div>

      {/* SEARCH BAR */}
      <div className="flex p-4 rounded-[20px] border border-[#8806CE]/15 bg-white mb-6 shadow-[0_4px_20px_rgba(136,6,206,0.03)]">
        <div className="relative flex-1 max-w-[450px]">
          <Search className="absolute text-[#8806CE]/50 left-[14px] top-1/2 -translate-y-1/2" size={18} />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bookings by customer or service..." 
            className="w-full pl-11 pr-4 py-[11px] bg-[#FAF8FF] border border-[#8806CE]/15 rounded-[14px] outline-none text-[#8806CE] font-bold box-border placeholder-[#8806CE]/40 focus:border-[#8806CE]" 
          />
        </div>
      </div>

      {/* BOOKINGS TABLE */}
      <div className="rounded-[20px] border border-[#8806CE]/15 bg-white overflow-hidden shadow-[0_6px_24px_rgba(136,6,206,0.04)]">
        <div className="grid grid-cols-[2fr_2.5fr_1.5fr_1.2fr_1fr] px-6 py-4 border-b border-[#8806CE]/15 font-extrabold text-[13px] uppercase tracking-[0.5px] font-black bg-[#FAF8FF]">
          <div>Customer Name</div>
          <div>Requested Service</div>
          <div>Assigned Provider</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>

        <div className="flex flex-col">
          {bookings
            .filter(b => b.name.toLowerCase().includes(search.toLowerCase()) || b.service.toLowerCase().includes(search.toLowerCase()))
            .map((booking) => {
              const isPending = booking.status === 'Pending';
              const isRowHovered = hoveredRowId === booking.id;

              return (
                <div 
                  key={booking.id}
                  onMouseEnter={() => setHoveredRowId(booking.id)}
                  onMouseLeave={() => setHoveredRowId(null)}
                  className={`grid grid-cols-[2fr_2.5fr_1.5fr_1.2fr_1fr] px-6 py-[18px] items-center border-b border-slate-100 last:border-b-0 transition-colors duration-200 ${
                    isRowHovered ? 'bg-[#FAF8FF]/40' : 'bg-transparent'
                  }`}
                >
                  <div>
                    <p className="m-0 font-extrabold text-[#2d1a4d] text-[15px]">{booking.name}</p>
                    <span className="text-[11px] text-[#8806CE]/50 font-semibold">ID: #BKM-00{booking.id}</span>
                  </div>
                  
                  <div>
                    <span className="inline-block text-[11px] text-[#8806CE] bg-[#FAF8FF] px-2 py-[2px] rounded-[6px] font-[750] mb-1 border border-[#8806CE]/15">
                      {booking.category}
                    </span>
                    <p className="m-0 font-bold text-[#2d1a4d] text-[14px]">{booking.service}</p>
                  </div>
                  
                  <p className="m-0 font-bold text-[#2d1a4d] text-[14px]">{booking.provider}</p>
                  
                  <div>
                    <span className={`inline-flex items-center gap-[5px] px-3 py-[5px] rounded-[20px] text-[12px] font-extrabold ${
                      isPending ? 'bg-[#fef3c7] text-[#d97706]' : 'bg-[#dcfce7] text-[#15803d]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isPending ? 'bg-[#d97706]' : 'bg-[#15803d]'}`}></span>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => handleOpenModal(booking)}
                      className={`border-none bg-[#8806CE] text-white px-[18px] py-[9px] rounded-[12px] font-bold text-[13px] cursor-pointer transition-all duration-200 ${
                        isRowHovered ? 'shadow-[0_4px_18px_rgba(136,6,206,0.3)] scale-[1.02] bg-[#8806CE]/90' : 'shadow-none'
                      }`}
                    >
                      View
                    </button>
                    <XCircle 
                      size={20} 
                      className="text-[#ef4444] cursor-pointer hover:scale-110 transition-transform" 
                      onClick={() => alert(`Cancel booking for ${booking.name}?`)} 
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* PORTAL INJECTION LAYER (Guaranteed Full Screen Blanket over Sidebar) */}
      {isModalOpen && selectedBooking && createPortal(
        <div className="fixed inset-0 w-screen h-screen z-[999999] flex items-center justify-center p-4">
          
          {/* Invisible type grey backdrop style */}
          <div 
            className="fixed inset-0 w-full h-full bg-slate-500/10 backdrop-blur-[8px]" 
            onClick={() => setIsModalOpen(false)} 
          />
          
          {/* Main Card View */}
          <div className="bg-white rounded-[24px] border border-[#8806CE]/15 max-w-[500px] w-full relative z-[1000000] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
            
            {/* Modal Header */}
            <div className="px-6 py-[18px] border-b border-[#8806CE]/15 flex items-center justify-between bg-[#FAF8FF]">
              <div>
                <h2 className="text-[16px] font-[850] text-[#8806CE] m-0">Booking Information</h2>
                <span className="text-[11px] text-[#8806CE]/50 font-bold">ID: #BKM-00{selectedBooking.id}</span>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="bg-none border-none text-[#8806CE]/50 cursor-pointer flex items-center hover:text-[#8806CE]">
                <X size={18} />
              </button>
            </div>

            {/* Modal Content Details */}
            <div className="p-6 flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1 text-[11px] font-extrabold text-[#8806CE]/60 uppercase mb-1">
                    <User size={12} /> Customer
                  </label>
                  <p className="m-0 text-[15px] font-bold text-[#2d1a4d]">{selectedBooking.name}</p>
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold text-[#8806CE]/60 uppercase mb-1">
                    Classification
                  </label>
                  <span className="inline-block text-[12px] text-[#8806CE] bg-[#FAF8FF] px-2.5 py-[3px] rounded-[8px] font-[750] border border-[#8806CE]/15">
                    {selectedBooking.category}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-[#8806CE]/60 uppercase mb-1">Requested Core Service</label>
                <p className="m-0 text-[15px] font-black text-[#8806CE]">{selectedBooking.service}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-[#FAF8FF]/50 p-3.5 rounded-[16px] border border-[#8806CE]/10">
                <div>
                  <label className="block text-[11px] font-bold text-[#8806CE]/50 uppercase mb-0.5">Assigned Partner</label>
                  <p className="m-0 text-[14px] font-bold text-[#2d1a4d]">{selectedBooking.provider}</p>
                </div>
                <div>
                  <label className="flex items-center gap-[3px] text-[11px] font-bold text-[#8806CE]/50 uppercase mb-0.5">
                    <IndianRupee size={11} /> Total Payout
                  </label>
                  <p className="m-0 text-[14px] font-extrabold text-[#2d1a4d]">₹{selectedBooking.price}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1 text-[11px] font-extrabold text-[#8806CE]/60 uppercase mb-1">
                    <Calendar size={12} /> Schedule Timing
                  </label>
                  <p className="m-0 text-[13px] font-bold text-[#2d1a4d]">{selectedBooking.date}</p>
                  <span className="text-[12px] text-[#8806CE]/50 font-semibold">at {selectedBooking.time}</span>
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold text-[#8806CE]/60 uppercase mb-1.5">Current State</label>
                  <span className={`inline-flex items-center gap-[5px] px-3 py-[5px] rounded-[20px] text-[12px] font-extrabold ${
                    selectedBooking.status === 'Pending' ? 'bg-[#fef3c7] text-[#d97706]' : 'bg-[#dcfce7] text-[#15803d]'
                  }`}>
                    {selectedBooking.status}
                  </span>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1 text-[11px] font-extrabold text-[#8806CE]/60 uppercase mb-1.5">
                  <FileText size={12} /> Job Requirements Description
                </label>
                <p className="m-0 text-[13px] text-[#475569] font-semibold leading-normal bg-[#FAF8FF]/30 p-3 rounded-[12px] border border-[#e2e8f0]">
                  {selectedBooking.description}
                </p>
              </div>

           

            </div>
          </div>
        </div>,
        document.body // This safely breaks the layout stack to mount on the index root body!
      )}
    </div>
  );
}