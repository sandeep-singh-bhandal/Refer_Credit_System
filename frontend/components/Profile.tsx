"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { api } from "@/utils/axios";
import { useEffect, useState } from "react";

interface referredUser {
  name: string;
  email: string;
  status: "pending" | "converted";
}

interface dashBoardData {
  totalReferred: number;
  totalConverted: number;
  totalCredits: number;
  referralCode: string;
  referredUsers: referredUser[];
}

const Profile = () => {
  const [copied, setCopied] = useState(false);
  const [dashBoardData, setDashBoardData] = useState<dashBoardData>({
    totalReferred: 0,
    totalConverted: 0,
    totalCredits: 0,
    referralCode: "",
    referredUsers: [],
  });

  const handleCopyCode = () => {
    navigator.clipboard.writeText(dashBoardData.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const conversionRate =
    (dashBoardData.totalConverted
      ? (dashBoardData.totalConverted / dashBoardData.totalReferred) * 100
      : 0) + "%";

  const getDashboardData = async () => {
    const { data } = await api.get("/api/user/get-dashboard");
    setDashBoardData(data.dashboard);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-300 bg-gray-100/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                My Profile
              </h1>
              <p className="text-gray-600">
                Manage your referrals and earnings
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/** Stats Cards */}
          {[
            "Total Referred Users",
            "Credits Earned",
            "Users Converted",
            "Conversion Rate",
          ].map((title, idx) => (
            <div
              key={idx}
              className="bg-gray-100 rounded-lg border border-gray-300 p-6 hover:border-gray-400 transition-colors shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-700 text-sm font-medium">{title}</h3>
                <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a6 6 0 11-12 0 6 6 0 0112 0z"
                    />
                  </svg>
                </div>
              </div>
              <p
                className={`text-4xl font-bold ${
                  idx === 0
                    ? "text-gray-900"
                    : idx === 1
                    ? "text-green-500"
                    : idx === 2
                    ? "text-green-500"
                    : "text-blue-600"
                }  mb-2`}
              >
                {idx === 0
                  ? dashBoardData.totalReferred
                  : idx === 1
                  ? dashBoardData.totalCredits
                  : idx === 2
                  ? dashBoardData.totalConverted
                  : conversionRate}
              </p>
            </div>
          ))}
        </div>

        {/* Referral Code Card */}
        <div className="bg-gray-100 rounded-lg border border-gray-300 p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your Referral Code
              </h2>
              <p className="text-gray-600">
                Share this code with friends and earn rewards on your friend's
                first purchase
              </p>
            </div>
            <div className="w-full md:w-auto">
              <div className="bg-gray-200 border border-gray-300 rounded-lg p-4 flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-gray-600 text-xs uppercase tracking-wider mb-1">
                    Your Code
                  </p>
                  <p className="text-2xl font-bold text-gray-900 font-mono">
                    {dashBoardData.referralCode}
                  </p>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-4 py-2 rounded-lg transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 whitespace-nowrap"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Referrals Table */}
        <div className="bg-gray-100 rounded-lg border border-gray-300 overflow-hidden">
          <div className="p-6 border-b border-gray-300">
            <h3 className="text-xl font-bold text-gray-900">
              Recent Referrals
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300 bg-gray-200">
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    S No.
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    Name
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    User Email
                  </th>
                  <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {dashBoardData.referredUsers?.length > 0 &&
                  dashBoardData.referredUsers.map((refUsers, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-300 hover:bg-gray-200 transition-colors"
                    >
                      <td className="px-6 py-4 text-gray-900">{idx + 1}</td>
                      <td className="px-6 py-4 text-gray-900">
                        {refUsers.name}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {refUsers.email}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            refUsers.status === "converted"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {refUsers.status === "pending"
                            ? "Pending"
                            : "Converted"}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
