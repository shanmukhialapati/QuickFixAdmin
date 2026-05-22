import React, { useState } from "react";
import { Star, Search, Eye, EyeOff } from "lucide-react";

// Updated data structure to use a binary 'isPublished' boolean
const INITIAL_REVIEWS = [
  { 
    id: 1, 
    user: "Suresh Kumar", 
    role: "Homeowner",
    avatar: "https://i.pravatar.cc/150?u=suresh",
    service: "AC Repair", 
    rating: 5, 
    comment: "Fantastic professional, quick fix and very polite. Highly recommended for any AC issues.", 
    isPublished: true 
  },
  { 
    id: 2, 
    user: "Ananya Rao", 
    role: "Tenant",
    avatar: "https://i.pravatar.cc/150?u=ananya",
    service: "Plumbing", 
    rating: 4, 
    comment: "Good work, but arrived 15 mins late. Otherwise perfect service quality.", 
    isPublished: false 
  },
  { 
    id: 3, 
    user: "Vikram Seth", 
    role: "Property Manager",
    avatar: "https://i.pravatar.cc/150?u=vikram",
    service: "Electrical", 
    rating: 5, 
    comment: "Professional behavior and great tools. Fixed the wiring issue in minutes.", 
    isPublished: true 
  },
  { 
    id: 4, 
    user: "Priya Sharma", 
    role: "Homeowner",
    avatar: "https://i.pravatar.cc/150?u=priya",
    service: "Cleaning", 
    rating: 3, 
    comment: "Average work. Left some areas untouched, expected better for the price.", 
    isPublished: true 
  },
  { 
    id: 5, 
    user: "Rahul Desai", 
    role: "Business Owner",
    avatar: "https://i.pravatar.cc/150?u=rahul",
    service: "Painting", 
    rating: 5, 
    comment: "Excellent work on the accent wall. Very neat and finished ahead of schedule.", 
    isPublished: true 
  },
  { 
    id: 6, 
    user: "Kavita Menon", 
    role: "Homeowner",
    avatar: "https://i.pravatar.cc/150?u=kavita",
    service: "Pest Control", 
    rating: 1, 
    comment: "Incomplete job. Found cockroaches again after just two days. Requesting a refund.", 
    isPublished: false 
  }
];

const Reviews = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);

  const filteredReviews = reviews.filter(rev => 
    rev.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rev.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const publicCount = reviews.filter(r => r.isPublished).length;
  const hiddenCount = reviews.filter(r => !r.isPublished).length;

  const toggleVisibility = (id) => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, isPublished: !review.isPublished } : review
    ));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Review Moderation</h1>
          <p className="text-sm text-slate-500 mt-1">Enable or disable customer feedback visibility across the platform.</p>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-3 text-slate-400" size={18} />
          <input 
            type="text"
            className="w-full md:w-72 pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none shadow-sm transition-all text-sm font-medium" 
            placeholder="Search feedback..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="flex flex-wrap gap-4">
        <div className="bg-white px-6 py-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5 min-w-[200px]">
          <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <Eye size={24}/>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-800">{publicCount}</div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">Public</div>
          </div>
        </div>
        
        <div className="bg-white px-6 py-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5 min-w-[200px]">
          <div className="p-3.5 bg-slate-100 text-slate-500 rounded-xl">
            <EyeOff size={24}/>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-800">{hiddenCount}</div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">Hidden</div>
          </div>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pt-4">
        {filteredReviews.map((rev) => {
          return (
            <div 
              key={rev.id} 
              className={`bg-white rounded-xl p-5 border shadow-sm flex flex-col h-full transition-all duration-300 border-l-4 ${
                rev.isPublished 
                  ? 'border-y-slate-100 border-r-slate-100 border-l-emerald-500' 
                  : 'border-y-slate-100 border-r-slate-100 border-l-slate-300 opacity-75 hover:opacity-100'
              }`}
            >
              {/* Top: Service Badge and Stars */}
              <div className="flex justify-between items-start mb-3">
                <span className="inline-block px-2.5 py-1 bg-slate-50 text-slate-600 border border-slate-200 text-[10px] font-bold uppercase tracking-wider rounded-md">
                  {rev.service}
                </span>
                <div className={`flex gap-0.5 ${rev.isPublished ? 'text-amber-400' : 'text-slate-300'}`}>
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      fill={i < rev.rating ? "currentColor" : "none"} 
                      className={i >= rev.rating ? "text-slate-100" : ""}
                    />
                  ))}
                </div>
              </div>

              {/* Middle: Comment */}
              <p className={`text-sm leading-relaxed mb-5 flex-grow font-medium ${rev.isPublished ? 'text-slate-700' : 'text-slate-400 line-through decoration-slate-300'}`}>
                "{rev.comment}"
              </p>

              {/* Bottom: Profile & Admin Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                
                {/* Profile Section */}
                <div className={`flex items-center gap-2.5 ${rev.isPublished ? '' : 'grayscale opacity-60'}`}>
                  <img 
                    src={rev.avatar} 
                    alt={rev.user} 
                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                  />
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-slate-900 text-xs leading-tight truncate">
                      {rev.user}
                    </h4>
                    <p className="text-slate-400 text-[10px] mt-0.5 font-semibold uppercase tracking-wider truncate">
                      {rev.role}
                    </p>
                  </div>
                </div>

                {/* Enable/Disable Toggle */}
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0 ml-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={rev.isPublished}
                      onChange={() => toggleVisibility(rev.id)}
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                  <span className={`text-[9px] font-extrabold uppercase tracking-widest ${
                    rev.isPublished ? 'text-emerald-600' : 'text-slate-400'
                  }`}>
                    {rev.isPublished ? "Enabled" : "Disabled"}
                  </span>
                </div>

              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
};

export default Reviews;