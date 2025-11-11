"use client";
import Navbar from "@/components/Navbar";
import { api } from "@/utils/axios";
import { useEffect, useState } from "react";

interface Purchase {
  _id: string;
  userId: string;
  amount: number;
  isFirstPurchase: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const MyOrders = () => {
  const [myPurchases, setMyPurchases] = useState<Purchase[]>([]);

  const fetchMyPurchases = async () => {
    try {
      const { data } = await api.get("/api/purchase/get-all-purchases");
      if (data.success) {
        setMyPurchases(data.purchases);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyPurchases();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mt-16 pb-16">
        <div className="flex flex-col items-end mb-8 w-full">
          <p className="text-2xl font-medium uppercase w-full text-center">My Orders</p>
          <div className="w-16 h-0.5 bg-primary rounded-full" />
        </div>
        <table className="w-3/4 mx-auto border">
          <thead>
            <tr className="border-b border-gray-300 bg-gray-200">
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                S No.
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                Order Id
              </th>
              <th className="text-left px-6 py-3 text-sm font-medium text-gray-700">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {myPurchases?.length > 0 &&
              myPurchases.map((purchase, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-300 hover:bg-gray-200 transition-colors"
                >
                  <td className="px-6 py-4 text-gray-900">{idx + 1}</td>
                  <td className="px-6 py-4 text-gray-900">{purchase._id}</td>
                  <td className="px-6 py-4 text-gray-700">
                    {"$ " + purchase.amount}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyOrders;
