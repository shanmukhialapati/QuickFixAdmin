import React from "react";
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Ban,
  Briefcase,
  MapPin,
  Star,
  BadgeCheck,
  CircleDollarSign,
} from "lucide-react";

const providers = [
  {
    id: "SP001",
    name: "Rahul Sharma",
    service: "Electrician",
    experience: "5 Years",
    jobs: 124,
    earnings: "₹24,000",
    location: "Hyderabad",
    rating: 4.8,
    verification: "Verified",
    availability: "Online",
    status: "Active",
  },
  {
    id: "SP002",
    name: "Arjun Reddy",
    service: "Plumber",
    experience: "3 Years",
    jobs: 89,
    earnings: "₹18,500",
    location: "Warangal",
    rating: 4.5,
    verification: "Pending",
    availability: "Offline",
    status: "Pending",
  },
  {
    id: "SP003",
    name: "Kiran Kumar",
    service: "Driver",
    experience: "7 Years",
    jobs: 201,
    earnings: "₹42,000",
    location: "Karimnagar",
    rating: 4.2,
    verification: "Verified",
    availability: "Busy",
    status: "Blocked",
  },
];

const statusStyle = {
  Active: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Blocked: "bg-red-100 text-red-700",
};

const availabilityStyle = {
  Online: "bg-blue-100 text-blue-700",
  Offline: "bg-gray-100 text-gray-700",
  Busy: "bg-orange-100 text-orange-700",
};

const verificationStyle = {
  Verified: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

const ServiceProviders = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        
        <div>
          {/* Main Heading Changed for Testing */}
          <h1 className="text-4xl font-extrabold text-blue-800 bg-yellow-300 p-3 rounded-xl inline-block border-4 border-blue-800 shadow-lg">
            🚀 Service Providers (Live Update Test)
          </h1>

          <p className="text-gray-600 mt-2 font-medium">
            Manage, monitor, and update all providers instantly.
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold transition shadow-md">
          + Add New Provider
        </button>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <p className="text-gray-500 text-sm">Total Providers</p>
          <h2 className="text-3xl font-bold mt-2">1,240</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <p className="text-gray-500 text-sm">Active Providers</p>
          <h2 className="text-3xl font-bold mt-2 text-green-600">980</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <p className="text-gray-500 text-sm">Pending Verification</p>
          <h2 className="text-3xl font-bold mt-2 text-yellow-600">120</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border">
          <p className="text-gray-500 text-sm">Total Earnings</p>
          <h2 className="text-3xl font-bold mt-2 text-purple-600">
            ₹2.4L
          </h2>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border mb-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-3.5 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search provider..."
              className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Services</option>
            <option>Electrician</option>
            <option>Plumber</option>
            <option>Driver</option>
          </select>

          <select className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Blocked</option>
          </select>

          <select className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500">
            <option>Verification</option>
            <option>Verified</option>
            <option>Pending</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

        <div className="overflow-x-auto">
          
          <table className="w-full">

            <thead className="bg-gray-100 border-b">
              <tr className="text-left text-sm text-gray-600">
                
                <th className="p-5">Provider</th>
                <th className="p-5">Service</th>
                <th className="p-5">Experience</th>
                <th className="p-5">Jobs</th>
                <th className="p-5">Earnings</th>
                <th className="p-5">Location</th>
                <th className="p-5">Rating</th>
                <th className="p-5">Verification</th>
                <th className="p-5">Availability</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-center">Actions</th>

              </tr>
            </thead>

            <tbody>

              {providers.map((provider, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >

                  {/* Provider */}
                  <td className="p-5">
                    <div className="flex items-center gap-3">

                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                        {provider.name.charAt(0)}
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {provider.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {provider.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Service */}
                  <td className="p-5">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Briefcase size={16} />
                      {provider.service}
                    </div>
                  </td>

                  {/* Experience */}
                  <td className="p-5 text-gray-700">
                    {provider.experience}
                  </td>

                  {/* Jobs */}
                  <td className="p-5 text-gray-700">
                    {provider.jobs}
                  </td>

                  {/* Earnings */}
                  <td className="p-5">
                    <div className="flex items-center gap-1 text-purple-700 font-medium">
                      <CircleDollarSign size={16} />
                      {provider.earnings}
                    </div>
                  </td>

                  {/* Location */}
                  <td className="p-5">
                    <div className="flex items-center gap-1 text-gray-700">
                      <MapPin size={16} />
                      {provider.location}
                    </div>
                  </td>

                  {/* Rating */}
                  <td className="p-5">
                    <div className="flex items-center gap-1 text-yellow-500 font-semibold">
                      <Star size={16} fill="currentColor" />
                      {provider.rating}
                    </div>
                  </td>

                  {/* Verification */}
                  <td className="p-5">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${verificationStyle[provider.verification]}`}
                    >
                      {provider.verification}
                    </span>
                  </td>

                  {/* Availability */}
                  <td className="p-5">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${availabilityStyle[provider.availability]}`}
                    >
                      {provider.availability}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="p-5">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyle[provider.status]}`}
                    >
                      {provider.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-5">
                    <div className="flex items-center justify-center gap-2">

                      <button className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition">
                        <Eye size={18} className="text-blue-600" />
                      </button>

                      <button className="p-2 rounded-lg bg-green-100 hover:bg-green-200 transition">
                        <CheckCircle
                          size={18}
                          className="text-green-600"
                        />
                      </button>

                      <button className="p-2 rounded-lg bg-yellow-100 hover:bg-yellow-200 transition">
                        <Ban size={18} className="text-yellow-600" />
                      </button>

                      <button className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition">
                        <XCircle size={18} className="text-red-600" />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default ServiceProviders;