"use client";
import Navbar from "@/components/Navbar";
import Signup from "@/components/Signup";
import { useAuthStore } from "@/store/useAuthStore";
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
    </div>
  );
}
