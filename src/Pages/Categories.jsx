import React, { useState } from 'react';
import { createPortal } from 'react-dom'; // Imported createPortal
import { 
  Search, 
  Plus, 
  ChevronRight,
  Trash2,
  Edit2,
  X,
  Layers,
  Wrench,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Star,
  Clock,
  IndianRupee,
  Edit
} from 'lucide-react';

export default function CategoriesDashboard() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  // Modals for Categories
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Modals for Services
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);

  // UI state
  const [searchFocused, setSearchFocused] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [hoveredBtnId, setHoveredBtnId] = useState(null);
  const [hoveredRowId, setHoveredRowId] = useState(null);

  const categories = [
    { id: 1, name: 'Salon & Makeup', services: 4, providers: 100, status: 'Active', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80' },
    { id: 2, name: 'Home Cleaning', services: 3, providers: 70, status: 'Active', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80' },
    { id: 3, name: 'Electrician', services: 0, providers: 0, status: 'Inactive', image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80' },
    { id: 4, name: 'Plumbing Services', services: 0, providers: 0, status: 'Inactive', image: 'https://media.istockphoto.com/id/514104433/photo/i-think-i-see-your-problem.jpg?s=612x612&w=0&k=20&c=2L-wCqZs9IIchoV2vL4gW5IC6ekPOH6BQWP_HroQeuE=' },
    { id: 5, name: 'AC Repair & Service', services: 0, providers: 0, status: 'Inactive', image: 'https://content.jdmagicbox.com/v2/comp/hyderabad/v7/040pxx40.xx40.211006112038.k1v7/catalogue/a-r-ac-repair-and-services-saidabad-hyderabad-24-hours-ac-repair-and-services-k2tvp812jj.jpg' },
    { id: 6, name: 'Spa & Massage', services: 0, providers: 0, status: 'Inactive', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80' },
  ];

  const servicesData = {
    1: [
      { id: 101, name: 'Bridal Makeup & Styling', price: 15000, duration: '120 mins', rating: 4.9, status: 'Active', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80', description: 'Professional bridal makeup including hair styling, draping, and premium cosmetics.' },
      { id: 102, name: 'Facial & Skincare Treatment', price: 6000, duration: '60 mins', rating: 4.7, status: 'Active', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80', description: 'Deep cleansing, exfoliating, and hydrating facial tailored to your skin type.' },
      { id: 103, name: 'Hair Cutting & Coloring', price: 8500, duration: '90 mins', rating: 4.8, status: 'Active', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=400&q=80', description: 'Trendy hair cuts and root touch-ups or global coloring with ammonia-free products.' },
      { id: 104, name: 'Manicure & Pedicure', price: 4500, duration: '45 mins', rating: 4.6, status: 'Inactive', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=400&q=80', description: 'Relaxing hand and foot grooming session with scrub, massage, and nail paint.' }
    ],
    2: [
      { id: 201, name: 'Deep Home Cleaning', price: 12000, duration: '240 mins', rating: 4.9, status: 'Active', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80', description: 'Full house sanitization and scrubbing including kitchen, bathrooms, and balcony.' },
      { id: 202, name: 'Kitchen Deep Cleaning', price: 7000, duration: '120 mins', rating: 4.7, status: 'Active', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80', description: 'Grease and oil stain removal from exhaust, cabinets, countertops, and tiles.' },
      { id: 203, name: 'Bathroom Sanitization', price: 4000, duration: '60 mins', rating: 4.5, status: 'Active', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80', description: 'Acid washing of walls and floors, descaling of taps, and disinfecting toilets.' }
    ]
  };

  const totalCategories = categories.length;
  const totalServicesAll = categories.reduce((sum, c) => sum + c.services, 0);
  const activeCountAll = categories.filter(c => c.status === 'Active').length;
  const inactiveCountAll = categories.filter(c => c.status === 'Inactive').length;

  // --- VIEW 1: DETAILED SERVICES VIEW ---
  if (selectedCategory) {
    const activeServicesList = servicesData[selectedCategory.id] || [];
    const totalServicesCount = activeServicesList.length;
    const activeServicesCount = activeServicesList.filter(s => s.status === 'Active').length;
    const inactiveServicesCount = activeServicesList.filter(s => s.status === 'Inactive').length;
    const avgPrice = totalServicesCount > 0 
      ? Math.round(activeServicesList.reduce((sum, s) => sum + s.price, 0) / totalServicesCount)
      : 0;

    return (
      <div className="p-6 w-full box-border bg-[#fafafa]">
        
        {/* HEADER & BACK BUTTON */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-3.5">
            <button 
              onClick={() => setSelectedCategory(null)}
              className="flex items-center justify-center w-[42px] h-[42px] rounded-[14px] border border-[#e4e4e7] bg-white text-[#2e004f] cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.02)] transition-all duration-200 hover:bg-[#fbf7ff] hover:-translate-x-0.5"
            >
              <ArrowLeft size={20} className="text-[#8806CE]" />
            </button>
            <div>
              <h2 className="text-2xl font-black text-[#2e004f] m-0">{selectedCategory.name}</h2>
              <span className="text-[13px] text-[#7a7485] font-bold">Manage services under this classification</span>
            </div>
          </div>

          <button 
            onClick={() => setIsAddServiceOpen(true)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#8806CE] to-[#b43bf6] text-white px-[22px] py-2.5 rounded-[14px] font-bold text-sm border-none cursor-pointer shadow-[0_4px_24px_rgba(136,6,206,0.25)]"
          >
            <Plus size={20} />
            <span>Add Service</span>
          </button>
        </div>

        {/* SERVICES STATS */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5 mb-8">
  {/* TOTAL SERVICES */}
  <div className="bg-purple-100 border border-[#e4e4e7] border-l-[6px] border-l-[#8806CE] rounded-[20px] p-5 flex items-center justify-between shadow-sm">
    <div>
      <p className="m-0 text-xs font-bold text-[#7a7485]">TOTAL SERVICES</p>
      <h3 className="m-0 mt-1 text-[28px] font-black text-[#2e004f]">{totalServicesCount}</h3>
    </div>
    <div className="w-[46px] h-[46px] rounded-[14px] bg-[#fdf5ff] flex items-center justify-center text-[#8806CE]"><Wrench size={22} /></div>
  </div>

  {/* ACTIVE SERVICES */}
  <div className="bg-green-100 border border-[#e4e4e7] border-l-[6px] border-l-[#10b981] rounded-[20px] p-5 flex items-center justify-between shadow-sm">
    <div>
      <p className="m-0 text-xs font-bold text-[#7a7485]">ACTIVE SERVICES</p>
      <h3 className="m-0 mt-1 text-[28px] font-black text-[#10b981]">{activeServicesCount}</h3>
    </div>
    <div className="w-[46px] h-[46px] rounded-[14px] bg-[#ecfdf5] flex items-center justify-center text-[#10b981]"><CheckCircle size={22} /></div>
  </div>

  {/* INACTIVE SERVICES */}
  <div className="bg-red-50 border border-[#e4e4e7] border-l-[6px] border-l-[#f43f5e] rounded-[20px] p-5 flex items-center justify-between shadow-sm">
    <div>
      <p className="m-0 text-xs font-bold text-[#7a7485]">INACTIVE SERVICES</p>
      <h3 className="m-0 mt-1 text-[28px] font-black text-[#f43f5e]">{inactiveServicesCount}</h3>
    </div>
    <div className="w-[46px] h-[46px] rounded-[14px] bg-[#fff1f2] flex items-center justify-center text-[#f43f5e]"><XCircle size={22} /></div>
  </div>

  {/* AVERAGE PRICE */}
  <div className="bg-purple-100 border border-[#e4e4e7] border-l-[6px] border-l-[#8806CE] rounded-[20px] p-5 flex items-center justify-between shadow-sm">
    <div>
      <p className="m-0 text-xs font-bold text-[#7a7485]">AVERAGE PRICE</p>
      <h3 className="m-0 mt-1 text-[28px] font-black text-[#8806CE]">₹{avgPrice}</h3>
    </div>
    <div className="w-[46px] h-[46px] rounded-[14px] bg-[#fdf5ff] flex items-center justify-center text-[#8806CE]"><IndianRupee size={22} /></div>
  </div>
</div>

        {/* SEARCH BAR */}
        <div className="flex p-4 rounded-[20px] border border-[#e4e4e7] bg-white mb-6 shadow-sm">
          <div className="relative flex-1 max-w-[450px]">
            <Search className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#7a7485]" size={18} />
            <input type="text" placeholder={`Search ${selectedCategory.name} services...`} className="w-full pl-11 pr-4 py-[11px] bg-[#fcf8ff] border border-[#e4e4e7] rounded-[14px] outline-none text-[#2e004f] font-bold" />
          </div>
        </div>

        {/* SERVICES ROWS */}
        <div className="flex flex-col gap-4">
          {activeServicesList.map((service) => {
            const isActive = service.status === 'Active';
            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredRowId(service.id)}
                onMouseLeave={() => setHoveredRowId(null)}
                className={`flex items-center bg-white border rounded-[20px] p-4 px-5 gap-5 flex-wrap transition-all duration-200 ${
                  hoveredRowId === service.id ? 'border-[#8806CE] shadow-sm' : 'border-[#e4e4e7]'
                }`}
              >
                <div className="w-[100px] h-[100px] rounded-[16px] overflow-hidden shrink-0 border border-[#e4e4e7]">
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-[240px] flex flex-col gap-1.5">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-18 font-[850] text-[#2e004f] m-0">{service.name}</h3>
                    <div className="flex items-center gap-1 bg-[#fef3c7] px-2 py-[3px] rounded-[8px] text-[#d97706] text-[11px] font-extrabold">
                      <Star size={11} fill="#d97706" /><span>{service.rating}</span>
                    </div>
                  </div>
                  <p className="text-[13px] text-[#7a7485] m-0">{service.description}</p>
                  <div className="flex gap-8 mt-1">
                    <div className="flex items-center gap-1 font-bold text-[#2e004f]"><IndianRupee size={14} className="text-[#8806CE]" />{service.price}</div>
                    <div className="flex items-center gap-1 font-bold text-[#7a7485]"><Clock size={14} />{service.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-[12px] font-bold border-[0.5px] px-2 py-[3px] rounded-[8px] ${
                    isActive ? 'text-[#10b981] bg-[#c1f8de]' : 'text-[#7a7485] bg-[#f4f4f5]'
                  }`}>{service.status}</span>
                  <button 
                    onClick={() => { alert(`Are you sure you want to Edit "${service.name}"?`); }}
                    className="text-[#8806CE] hover:opacity-80 cursor-pointer border-none bg-none"
                  >
                    <Edit size={20} />
                  </button>
                  <button 
                    onClick={() => { alert(`Are you sure you want to delete "${service.name}"?`); }}
                    className="text-[#ef4444] hover:opacity-80 cursor-pointer border-none bg-none"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ADD SERVICE MODAL - USING PORTAL FOR FULL SCREEN OVERLAY */}
        {isAddServiceOpen && createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* INVISIBLE/CLEAN LIGHT TRANSPARENT BACKGROUND */}
            <div className="absolute inset-0 bg-slate-500/10 backdrop-blur-[1px]" onClick={() => setIsAddServiceOpen(false)} />
            <div className="bg-white rounded-[24px] border border-[#e4e4e7] max-w-[460px] w-full relative z-10 p-6 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[16px] font-[850] text-[#2e004f] m-0">Add Service to {selectedCategory.name}</h2>
                <button onClick={() => setIsAddServiceOpen(false)} className="bg-none border-none cursor-pointer text-[#7a7485] hover:text-[#2e004f]"><X size={18} /></button>
              </div>
              <div className="flex flex-col gap-3.5">
                <input type="text" placeholder="Service Name" className="w-full px-3.5 py-[11px] bg-[#fcf8ff] border border-[#e4e4e7] rounded-[12px] outline-none font-medium text-[#2e004f]" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="number" placeholder="Price (₹)" className="w-full px-3.5 py-[11px] bg-[#fcf8ff] border border-[#e4e4e7] rounded-[12px] outline-none font-medium text-[#2e004f]" />
                  <input type="text" placeholder="Duration (e.g., 60 mins)" className="w-full px-3.5 py-[11px] bg-[#fcf8ff] border border-[#e4e4e7] rounded-[12px] outline-none font-medium text-[#2e004f]" />
                </div>
                <input type="text" placeholder="Service Image URL" className="w-full px-3.5 py-[11px] bg-[#fcf8ff] border border-[#e4e4e7] rounded-[12px] outline-none font-medium text-[#2e004f]" />
                <textarea placeholder="Description..." className="w-full h-20 px-3.5 py-[11px] bg-[#fcf8ff] border border-[#e4e4e7] rounded-[12px] outline-none resize-none font-medium text-[#2e004f]" />
                <div className="flex justify-end gap-3 mt-2.5">
                  <button onClick={() => setIsAddServiceOpen(false)} className="bg-none border-none cursor-pointer font-bold text-[#7a7485] hover:text-[#2e004f]">Cancel</button>
                  <button onClick={() => setIsAddServiceOpen(false)} className="px-5 py-2.5 bg-gradient-to-r from-[#8806CE] to-[#b43bf6] text-white border-none rounded-[12px] cursor-pointer font-bold shadow-md">Save Service</button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    );
  }

  // --- VIEW 2: MAIN CATEGORIES GRID DASHBOARD ---
  return (
    <div className="p-2.5 w-full box-border bg-[#fafafa]">
      <div className="mb-7">
        <h1 className="text-[26px] font-black text-[#2e004f] m-0 mb-1">Categories Dashboard</h1>
        <p className="text-[13px] text-[#7a7485] font-bold m-0">Monitor and track all service categories</p>
      </div>
      
      {/* OVERVIEW STATS BANNER */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5 mb-8">
  {/* TOTAL CATEGORIES */}
  <div className="bg-purple-100 border border-[#e4e4e7] border-l-[6px] border-l-[#8806CE] rounded-[20px] p-5 flex items-center justify-between shadow-sm">
    <div>
      <p className="m-0 text-xs font-bold text-[#7a7485]">TOTAL CATEGORIES</p>
      <h3 className="m-0 mt-1 text-[28px] font-black text-[#2e004f]">{totalCategories}</h3>
    </div>
    <div className="w-[46px] h-[46px] rounded-[14px] bg-[#fdf5ff] flex items-center justify-center text-[#8806CE]"><Layers size={22} /></div>
  </div>

  {/* TOTAL SERVICES */}
  <div className="bg-purple-100 border border-[#e4e4e7] border-l-[6px] border-l-[#b43bf6] rounded-[20px] p-5 flex items-center justify-between shadow-sm">
    <div>
      <p className="m-0 text-xs font-bold text-[#7a7485]">TOTAL SERVICES</p>
      <h3 className="m-0 mt-1 text-[28px] font-black text-[#2e004f]">{totalServicesAll}</h3>
    </div>
    <div className="w-[46px] h-[46px] rounded-[14px] bg-[#fbf0ff] flex items-center justify-center text-[#b43bf6]"><Wrench size={22} /></div>
  </div>

  {/* ACTIVE STATUS */}
  <div className="bg-green-100 border border-[#e4e4e7] border-l-[6px] border-l-[#10b981] rounded-[20px] p-5 flex items-center justify-between shadow-sm">
    <div>
      <p className="m-0 text-xs font-bold text-[#7a7485]">ACTIVE STATUS</p>
      <h3 className="m-0 mt-1 text-[28px] font-black text-[#10b981]">{activeCountAll}</h3>
    </div>
    <div className="w-[46px] h-[46px] rounded-[14px] bg-[#ecfdf5] flex items-center justify-center text-[#10b981]"><CheckCircle size={22} /></div>
  </div>

  {/* INACTIVE STATUS */}
  <div className="bg-red-50 border border-[#e4e4e7] border-l-[6px] border-l-[#f43f5e] rounded-[20px] p-5 flex items-center justify-between shadow-sm">
    <div>
      <p className="m-0 text-xs font-bold text-[#7a7485]">INACTIVE STATUS</p>
      <h3 className="m-0 mt-1 text-[28px] font-black text-[#f43f5e]">{inactiveCountAll}</h3>
    </div>
    <div className="w-[46px] h-[46px] rounded-[14px] bg-[#fff1f2] flex items-center justify-center text-[#f43f5e]"><XCircle size={22} /></div>
  </div>
</div>

      {/* CONTROLS BAR */}
      <div className="flex justify-between items-center gap-4 bg-white p-4 rounded-[20px] border border-[#e4e4e7] mb-8 flex-wrap shadow-sm">
        <div className="relative flex-1 max-w-[450px]">
          <Search className={`absolute left-[14px] top-1/2 -translate-y-1/2 transition-colors duration-200 ${searchFocused ? 'text-[#8806CE]' : 'text-[#7a7485]'}`} size={18} />
          <input 
            type="text" 
            placeholder="Search marketplace classifications..." 
            onFocus={() => setSearchFocused(true)} 
            onBlur={() => setSearchFocused(false)}
            className={`w-full pl-11 pr-4 py-[11px] bg-[#fcf8ff] border-2 rounded-[14px] text-sm text-[#2e004f] font-bold outline-none transition-colors duration-200 ${
              searchFocused ? 'border-[#8806CE]' : 'border-[#e4e4e7]'
            }`} 
          />
        </div>
        <div className="flex gap-3 items-center">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#8806CE] to-[#b43bf6] text-white px-[22px] py-2.5 rounded-[14px] font-bold border-none cursor-pointer shadow-[0_4px_24px_rgba(136,6,206,0.25)]"
          >
            <Plus size={18} /><span>Add Category</span>
          </button>
        </div>
      </div>

      {/* CATEGORIES GRID */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(310px,1fr))] gap-6">
        {categories.map((category) => {
          const isActive = category.status === 'Active';
          const isCardHovered = hoveredCardId === category.id;
          return (
            <div 
              key={category.id} 
              onMouseEnter={() => setHoveredCardId(category.id)} 
              onMouseLeave={() => setHoveredCardId(null)}
              className={`bg-white border rounded-[24px] overflow-hidden flex flex-col justify-between transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isCardHovered ? 'border-[#8806CE] -translate-y-1 shadow-md' : 'border-[#e4e4e7] translate-y-0 shadow-sm'
              }`}
            >
              <div>
                <div className="h-[165px] w-full relative overflow-hidden">
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                  <span className={`absolute top-3 left-3 inline-flex items-center px-3 py-[5px] rounded-[20px] text-[11px] font-extrabold text-white ${
                    isActive ? 'bg-[#10b981]/90' : 'bg-[#7a7485]/90'
                  }`}>
                    {category.status}
                  </span>
                  <div className="absolute top-3 right-3 flex gap-2">
                    <button className="p-2 bg-white/90 text-[#8806CE] border-none rounded-[10px] cursor-pointer hover:bg-white"><Edit2 size={18} /></button>
                    <button onClick={() => { alert(`Delete category "${category.name}"?`); }} className="p-2 bg-white/90 text-[#ef4444] border-none rounded-[10px] cursor-pointer hover:bg-white"><Trash2 size={18} /></button>
                  </div>
                </div>
                <div className="p-5 pb-0">
                  <h3 className="text-[19px] font-[850] text-[#2e004f] m-0 mb-3.5">{category.name}</h3>
                  <div className="grid grid-cols-2 gap-4 border-t border-[#e4e4e7] pt-3.5 mb-5">
                    <div>
                      <p className="text-[11px] font-bold text-[#7a7485] m-0">SERVICES</p>
                      <p className="text-[15px] font-extrabold text-[#2e004f] m-0">{category.services} Types</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[#7a7485] m-0">PROVIDERS</p>
                      <p className="text-[15px] font-extrabold text-[#2e004f] m-0">{category.providers} Active</p>
                    </div>
                  </div>
                </div>
              </div>
    
              <div className="p-5 pt-0">
                <button 
                  onClick={() => setSelectedCategory(category)}
                  onMouseEnter={() => setHoveredBtnId(category.id)} 
                  onMouseLeave={() => setHoveredBtnId(null)}
                  className={`w-full flex items-center justify-center gap-1.5 font-bold px-4 py-2.5 rounded-[12px] border border-[#e4e4e7] cursor-pointer transition-all duration-200 ${
                    hoveredBtnId === category.id 
                      ? 'bg-gradient-to-r from-[#8806CE] to-[#b43bf6] text-white border-transparent' 
                      : 'bg-[#fcf8ff] text-[#2e004f] hover:bg-[#f3e8ff]'
                  }`}
                >
                  <span>View Details</span><ChevronRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ADD CATEGORY MODAL - USING PORTAL FOR FULL SCREEN OVERLAY OVER SIDEBAR */}
      {isAddModalOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* INVISIBLE/CLEAN LIGHT TRANSPARENT BACKGROUND */}
          <div className="absolute inset-0 bg-slate-500/10 backdrop-blur-[1px]" onClick={() => setIsAddModalOpen(false)} />
          <div className="bg-white rounded-[24px] border border-[#e4e4e7] max-w-[440px] w-full relative z-10 p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[16px] font-[850] text-[#2e004f] m-0">Create New Category</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="bg-none border-none cursor-pointer text-[#7a7485] hover:text-[#2e004f]"><X size={18} /></button>
            </div>
            <div className="flex flex-col gap-3.5">
              <input type="text" placeholder="Category Name" className="w-full px-3.5 py-[11px] bg-[#fcf8ff] border border-[#e4e4e7] rounded-[12px] outline-none font-medium text-[#2e004f]" />
              <input type="text" placeholder="Cover Image URL" className="w-full px-3.5 py-[11px] bg-[#fcf8ff] border border-[#e4e4e7] rounded-[12px] outline-none font-medium text-[#2e004f]" />
              <div className="flex justify-end gap-3 mt-2.5">
                <button onClick={() => setIsAddModalOpen(false)} className="bg-none border-none cursor-pointer font-bold text-[#7a7485] hover:text-[#2e004f]">Cancel</button>
                <button onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 bg-gradient-to-r from-[#8806CE] to-[#b43bf6] text-white border-none rounded-[12px] cursor-pointer font-bold shadow-md">Save Category</button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}