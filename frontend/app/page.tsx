"use client";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import Signup from "@/components/Signup";
import { useAuthStore } from "@/store/useAuthStore";
import { dummyProducts } from "@/utils/constant";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BiLoader } from "react-icons/bi";

export default function Home() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="h-screen w-full flex justify-center items-center bg-gray-100">
        <div className="flex flex-col items-center gap-4">
          <BiLoader className="size-10 animate-spin" />
          <p className="text-gray-700">Checking Authentication...</p>
          <p className="text-gray-700">Please wait backend could be on sleep mode (20-30sec max)</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      {authUser ? (
        <Navbar />
      ) : (
        <div className="flex justify-center items-center min-h-screen px-4">
          <Signup />
        </div>
      )}
    <div className="mt-16 flex flex-col mx-10">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">All Products</p>
        <div className="w-16 h-0.5 bg-[#4fbf8b] rounded-full"></div>
      </div>
      {dummyProducts.length > 0 ? (
        <div className="flex flex-wrap gap-6 mt-6">
          {dummyProducts
            .filter((product) => product.inStock)
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-16">No Products Found</p>
      )}
    </div>
    </div>
  );
}
