"use client";
import Navbar from "@/components/Navbar";
import Profile from "@/components/Profile";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const { authUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!authUser) {
      router.push("/");
    }
  }, [authUser, router]);
  if (authUser) {
    return (
      <>
        <Navbar />
        <Profile />
      </>
    );
  }
};

export default page;
