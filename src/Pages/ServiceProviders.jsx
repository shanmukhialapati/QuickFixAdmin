import React, { useState, useMemo } from "react";
import {
  Search,
  CheckCircle,
  Ban,
  Briefcase,
  MapPin,
  Star,
  CircleDollarSign,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  X,
  User,
  Phone,
  Mail,
  Calendar,
  Trash2
} from "lucide-react";

const initialProviders = [
  { id: "SP001", name: "Rahul Sharma", service: "Electrician", experience: "5 Years", jobs: 124, earnings: "₹24,000", location: "Madhapur", rating: 4.8, verification: "Verified", availability: "Online", status: "Active", phone: "+91 98765 43210", email: "rahul.s@example.com", joined: "Jan 2024" },
  { id: "SP002", name: "Arjun Reddy", service: "Plumber", experience: "3 Years", jobs: 89, earnings: "₹18,500", location: "Gachibowli", rating: 4.5, verification: "Pending", availability: "Offline", status: "Pending", phone: "+91 98765 43211", email: "arjun.r@example.com", joined: "Mar 2024" },
  { id: "SP003", name: "Kiran Kumar", service: "AC Repair", experience: "7 Years", jobs: 201, earnings: "₹42,000", location: "Kukatpally", rating: 4.2, verification: "Verified", availability: "Busy", status: "Blocked", phone: "+91 98765 43212", email: "kiran.k@example.com", joined: "Nov 2023" },
  { id: "SP004", name: "Priya Singh", service: "Salon at Home", experience: "4 Years", jobs: 156, earnings: "₹35,000", location: "Banjara Hills", rating: 4.9, verification: "Verified", availability: "Online", status: "Active", phone: "+91 98765 43213", email: "priya.s@example.com", joined: "Feb 2024" },
  { id: "SP005", name: "Venkatesh D", service: "Appliance Repair", experience: "6 Years", jobs: 310, earnings: "₹55,000", location: "Kondapur", rating: 4.7, verification: "Verified", availability: "Online", status: "Active", phone: "+91 98765 43214", email: "venkat.d@example.com", joined: "Aug 2023" },
  { id: "SP006", name: "Lakshmi N", service: "Home Cleaning", experience: "2 Years", jobs: 65, earnings: "₹12,000", location: "Jubilee Hills", rating: 4.1, verification: "Pending", availability: "Offline", status: "Pending", phone: "+91 98765 43215", email: "lakshmi.n@example.com", joined: "May 2024" },
  { id: "SP007", name: "Md. Ali", service: "Pest Control", experience: "8 Years", jobs: 420, earnings: "₹68,000", location: "Tolichowki", rating: 4.6, verification: "Verified", availability: "Online", status: "Active", phone: "+91 98765 43216", email: "ali.md@example.com", joined: "Jun 2023" },
  { id: "SP008", name: "Ravi Teja", service: "Carpenter", experience: "10 Years", jobs: 512, earnings: "₹80,000", location: "Ameerpet", rating: 4.9, verification: "Verified", availability: "Busy", status: "Active", phone: "+91 98765 43217", email: "ravi.t@example.com", joined: "Jan 2023" },
  { id: "SP009", name: "Suresh Babu", service: "Painter", experience: "5 Years", jobs: 110, earnings: "₹45,000", location: "Secunderabad", rating: 4.3, verification: "Verified", availability: "Online", status: "Active", phone: "+91 98765 43218", email: "suresh.b@example.com", joined: "Dec 2023" },
  { id: "SP010", name: "Anjali K", service: "Massage Therapy", experience: "3 Years", jobs: 95, earnings: "₹28,000", location: "Hitech City", rating: 4.8, verification: "Verified", availability: "Offline", status: "Active", phone: "+91 98765 43219", email: "anjali.k@example.com", joined: "Apr 2024" },
];

const statusStyle = {
  Active: "bg-green-100 text-green-700 border border-green-200",
  Pending: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  Blocked: "bg-red-100 text-red-700 border border-red-200",
};

const verificationStyle = {
  Verified: "text-green-600 bg-green-50 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider border border-green-200",
  Pending: "text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider border border-yellow-200",
};

const ServiceProviders = () => {
  const [providers, setProviders] = useState(initialProviders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState("All Services");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null); 
  const [openDropdownId, setOpenDropdownId] = useState(null); 
  
  const [newProvider, setNewProvider] = useState({
    name: "", service: "Electrician", experience: "", location: "", phone: ""
  });

  const filteredProviders = useMemo(() => {
    return providers.filter(provider => {
      const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) || provider.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesService = selectedService === "All Services" || provider.service === selectedService;
      const matchesStatus = selectedStatus === "All Status" || provider.status === selectedStatus;
      return matchesSearch && matchesService && matchesStatus;
    });
  }, [providers, searchTerm, selectedService, selectedStatus]);

  const stats = useMemo(() => {
    return {
      total: providers.length,
      active: providers.filter(p => p.status === 'Active').length,
      pending: providers.filter(p => p.verification === 'Pending').length,
      totalEarnings: providers.reduce((acc, curr) => acc + parseInt(curr.earnings.replace(/[^0-9]/g, '') || 0), 0)
    };
  }, [providers]);

  const handleApprove = (e, id) => {
    e.stopPropagation(); 
    setProviders(providers.map(p => p.id === id ? { ...p, status: 'Active', verification: 'Verified' } : p));
    setOpenDropdownId(null);
  };

  const handleBlock = (e, id) => {
    e.stopPropagation();
    setProviders(providers.map(p => p.id === id ? { ...p, status: 'Blocked' } : p));
    setOpenDropdownId(null);
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    setProviders(providers.filter(p => p.id !== id));
    setOpenDropdownId(null);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newId = `SP0${providers.length + 11}`; 
    const addedProvider = {
      ...newProvider,
      id: newId,
      experience: `${newProvider.experience} Years`,
      jobs: 0,
      earnings: "₹0",
      rating: 0.0,
      verification: "Pending",
      availability: "Offline",
      status: "Pending",
      email: `${newProvider.name.split(' ')[0].toLowerCase()}@example.com`,
      joined: "Today"
    };
    
    setProviders([addedProvider, ...providers]); 
    setIsAddModalOpen(false);
    setNewProvider({ name: "", service: "Electrician", experience: "", location: "", phone: "" }); 
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen font-sans relative">

      {/* Header*/}
      <div className="flex justify-end mb-6">
        <button onClick={() => setIsAddModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition shadow-md shadow-blue-200 text-sm flex items-center gap-2">
          <User size={16} /> + Add Provider
        </button>
      </div>

      {/* Dynamic Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
          <p className="text-slate-500 text-sm font-semibold mb-1">Total Providers</p>
          <h2 className="text-3xl font-black text-slate-800">{stats.total}</h2>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
          <p className="text-slate-500 text-sm font-semibold mb-1">Active Providers</p>
          <h2 className="text-3xl font-black text-green-600">{stats.active}</h2>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
          <p className="text-slate-500 text-sm font-semibold mb-1">Pending Verification</p>
          <h2 className="text-3xl font-black text-yellow-600">{stats.pending}</h2>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
          <p className="text-slate-500 text-sm font-semibold mb-1">Total Earnings</p>
          <h2 className="text-3xl font-black text-purple-600">₹{(stats.totalEarnings / 100000).toFixed(2)}L</h2>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-5 rounded-t-2xl border border-slate-200 border-b-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search size={18} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or SP ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className="bg-slate-50 border border-slate-200 text-sm rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 font-medium">
            <option>All Services</option><option>Electrician</option><option>Plumber</option><option>AC Repair</option><option>Salon at Home</option><option>Home Cleaning</option>
          </select>
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className="bg-slate-50 border border-slate-200 text-sm rounded-xl px-4 py-2.5 outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 font-medium">
            <option>All Status</option><option>Active</option><option>Pending</option><option>Blocked</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-b-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-sm text-left relative">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-6 py-5">Provider Profile</th>
                <th className="px-4 py-5">Service Type</th>
                <th className="px-4 py-5">Performance</th>
                <th className="px-4 py-5">Location</th>
                <th className="px-4 py-5">Status</th>
                <th className="px-4 py-5">Verification</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredProviders.length > 0 ? filteredProviders.map((provider) => (
                <tr 
                  key={provider.id} 
                  onClick={() => setSelectedProfile(provider)}
                  className="hover:bg-blue-50/40 cursor-pointer transition-colors"
                >
                  {/* Profile Info with ID and Availability Status */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={`https://i.pravatar.cc/150?u=${provider.id}`} 
                        alt={provider.name}
                        className="w-11 h-11 rounded-full border border-slate-200 shadow-sm object-cover bg-slate-100"
                      />
                      <div>
                        <h3 className="font-bold text-slate-900 text-[15px]">{provider.name}</h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <p className="text-xs text-slate-500 font-mono">{provider.id}</p>
                          <span className="text-slate-300 text-[10px]">|</span>
                          <div className="flex items-center gap-1">
                            <div className={`w-1.5 h-1.5 rounded-full ${provider.availability === 'Online' ? 'bg-blue-500' : provider.availability === 'Busy' ? 'bg-orange-500' : 'bg-slate-400'}`}></div>
                            <span className={`text-[11px] font-semibold ${provider.availability === 'Online' ? 'text-blue-600' : provider.availability === 'Busy' ? 'text-orange-600' : 'text-slate-500'}`}>
                              {provider.availability}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Service */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 font-semibold text-slate-700">
                      <Briefcase size={15} className="text-blue-500" /> {provider.service}
                    </div>
                  </td>
                  
                  {/* Metrics */}
                  <td className="px-4 py-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                        <Star size={13} className="text-yellow-500" fill="currentColor" />
                        {provider.rating} <span className="text-slate-400 font-medium">({provider.jobs})</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                        <CircleDollarSign size={13} /> {provider.earnings}
                      </div>
                    </div>
                  </td>
                  
                  {/* Location */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                      <MapPin size={15} className="text-slate-400" /> {provider.location}
                    </div>
                  </td>
                  
                  {/* Status Only */}
                  <td className="px-4 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${statusStyle[provider.status]}`}>
                      {provider.status}
                    </span>
                  </td>
                  
                  {/* Verification */}
                  <td className="px-4 py-4">
                    <span className={verificationStyle[provider.verification]}>
                      {provider.verification}
                    </span>
                  </td>
                  
                  {/* Actions Dropdown */}
                  <td className="px-6 py-4 text-right relative">
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        setOpenDropdownId(openDropdownId === provider.id ? null : provider.id);
                      }} 
                      className={`p-2 rounded-lg transition ${openDropdownId === provider.id ? 'bg-blue-100 text-blue-600' : 'hover:bg-slate-100 text-slate-400'}`}
                    >
                      <MoreVertical size={18} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {openDropdownId === provider.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={(e) => { e.stopPropagation(); setOpenDropdownId(null); }}></div>
                        <div className="absolute right-8 top-10 w-40 bg-white border border-slate-200 shadow-xl rounded-xl z-20 py-2 animate-in fade-in zoom-in-95 duration-100 overflow-hidden">
                          {/* Approve option only if not already active */}
                          {provider.status !== 'Active' && (
                            <button 
                              onClick={(e) => handleApprove(e, provider.id)} 
                              className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 font-medium transition"
                            >
                              <CheckCircle size={15} className="text-green-600"/> Approve
                            </button>
                          )}
                          
                          {/* Block option only if not already blocked */}
                          {provider.status !== 'Blocked' && (
                            <button 
                              onClick={(e) => handleBlock(e, provider.id)} 
                              className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 font-medium transition"
                            >
                              <Ban size={15} className="text-orange-600"/> Block
                            </button>
                          )}
                          
                          <div className="h-px bg-slate-100 my-1"></div>
                          
                          <button 
                            onClick={(e) => handleDelete(e, provider.id)} 
                            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2.5 font-medium transition"
                          >
                            <Trash2 size={15}/> Delete
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="7" className="px-6 py-12 text-center text-slate-500 font-medium">No providers found matching filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-700">1</span> to <span className="font-bold text-slate-700">{filteredProviders.length}</span> entries
          </p>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 transition" disabled><ChevronLeft size={18} /></button>
            <button className="w-8 h-8 rounded-lg bg-blue-600 text-white text-sm font-bold shadow-sm">1</button>
            <button className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 transition"><ChevronRight size={18} /></button>
          </div>
        </div>
      </div>

      {/* ================= MODALS ================= */}

      {/* Add Provider Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><User size={18} className="text-blue-600"/> Add New Provider</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 bg-white rounded-full"><X size={20}/></button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input required type="text" value={newProvider.name} onChange={e => setNewProvider({...newProvider, name: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder="e.g. John Doe" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Service Type</label>
                  <select value={newProvider.service} onChange={e => setNewProvider({...newProvider, service: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500">
                    <option>Electrician</option><option>Plumber</option><option>AC Repair</option><option>Salon at Home</option><option>Home Cleaning</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Experience (Years)</label>
                  <input required type="number" value={newProvider.experience} onChange={e => setNewProvider({...newProvider, experience: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500" placeholder="e.g. 3" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Location Area</label>
                <input required type="text" value={newProvider.location} onChange={e => setNewProvider({...newProvider, location: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500" placeholder="e.g. Madhapur" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                <input required type="text" value={newProvider.phone} onChange={e => setNewProvider({...newProvider, phone: e.target.value})} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500" placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200 transition">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-md transition">Add Provider</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 md:p-8" onClick={() => setSelectedProfile(null)}>
          <div className="flex flex-col md:flex-row w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedProfile(null)} className="absolute top-4 right-4 z-10 bg-slate-100 hover:bg-slate-200 text-slate-500 p-2 rounded-full transition">
              <X size={20}/>
            </button>

            <div className="bg-gradient-to-b from-slate-50 to-slate-100 md:w-2/5 p-8 flex flex-col items-center justify-center border-r border-slate-200 relative">
              <div className="absolute top-0 left-0 w-full h-32 bg-blue-600/10 rounded-br-[100px]"></div>
              
              <div className="relative mb-5 z-10">
                <img src={`https://i.pravatar.cc/300?u=${selectedProfile.id}`} alt="profile" className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl object-cover bg-white"/>
              </div>
              
              <h2 className="text-2xl font-black text-slate-900 text-center z-10">{selectedProfile.name}</h2>
              
              <div className="flex items-center justify-center gap-2 mt-1 z-10">
                <p className="text-sm text-blue-600 font-bold">{selectedProfile.id}</p>
                <span className="text-slate-300 text-xs">|</span>
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${selectedProfile.availability === 'Online' ? 'bg-blue-500' : selectedProfile.availability === 'Busy' ? 'bg-orange-500' : 'bg-slate-400'}`}></div>
                  <span className={`text-xs font-bold ${selectedProfile.availability === 'Online' ? 'text-blue-600' : selectedProfile.availability === 'Busy' ? 'text-orange-600' : 'text-slate-500'}`}>
                    {selectedProfile.availability}
                  </span>
                </div>
              </div>
              
              <div className="mt-6 z-10">
                <span className={verificationStyle[selectedProfile.verification]}>
                  {selectedProfile.verification}
                </span>
              </div>
            </div>

            <div className="p-8 md:w-3/5 bg-white flex flex-col justify-center">
              <div className="flex items-center gap-2.5 font-bold text-slate-800 mb-6 bg-slate-50 w-fit px-4 py-2 rounded-xl border border-slate-100">
                <Briefcase size={20} className="text-blue-500"/> 
                <span className="text-lg">{selectedProfile.service}</span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-8 p-5 bg-slate-50 rounded-2xl border border-slate-100 text-center shadow-inner">
                <div>
                  <p className="text-[10px] text-slate-500 font-extrabold uppercase mb-1.5 tracking-wider">Rating</p>
                  <p className="font-black text-lg text-slate-800 flex items-center justify-center gap-1">
                    <Star size={16} className="text-yellow-500" fill="currentColor"/>{selectedProfile.rating}
                  </p>
                </div>
                <div className="border-x border-slate-200">
                  <p className="text-[10px] text-slate-500 font-extrabold uppercase mb-1.5 tracking-wider">Total Jobs</p>
                  <p className="font-black text-lg text-slate-800">{selectedProfile.jobs}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-extrabold uppercase mb-1.5 tracking-wider">Experience</p>
                  <p className="font-black text-lg text-slate-800">{selectedProfile.experience}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm font-medium text-slate-700">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm"><Phone size={18}/></div>
                  <div><p className="text-xs text-slate-400 font-bold uppercase">Phone Number</p><p className="text-[15px]">{selectedProfile.phone || "+91 98765 43210"}</p></div>
                </div>
                <div className="flex items-center gap-4 text-sm font-medium text-slate-700">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 shadow-sm"><Mail size={18}/></div>
                  <div><p className="text-xs text-slate-400 font-bold uppercase">Email Address</p><p className="text-[15px]">{selectedProfile.email || "contact@provider.com"}</p></div>
                </div>
                <div className="flex items-center gap-4 text-sm font-medium text-slate-700">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 shadow-sm"><MapPin size={18}/></div>
                  <div><p className="text-xs text-slate-400 font-bold uppercase">Location / Zone</p><p className="text-[15px]">{selectedProfile.location}, Hyderabad</p></div>
                </div>
                <div className="flex items-center gap-4 text-sm font-medium text-slate-700">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm"><Calendar size={18}/></div>
                  <div><p className="text-xs text-slate-400 font-bold uppercase">Joined Platform</p><p className="text-[15px]">{selectedProfile.joined || "Jan 2024"}</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ServiceProviders;