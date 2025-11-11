"use client";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";

const Navbar = () => {
  const router = useRouter();
  const { logout } = useAuthStore();
  return (
    <nav className="flex items-center z-2 justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <Link href="/" className="text-3xl font-bold uppercase">
        Store
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <Link href="/">Products</Link>
        <Link href="/orders">My Orders</Link>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <IoSearchOutline className="size-6" />
        </div>

        <div className="relative group cursor-pointer">
          <img src="/profile_icon.png" alt="profile" className="w-10" />
          <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-36 rounded-md text-sm z-40">
            <li
              onClick={() => router.push("/profile")}
              className="p-1.5 pl-3 hover:bg-[#4fbf8b]/10 cursor-pointer"
            >
              Profile
            </li>
            <li
              className="p-1.5 pl-3 hover:bg-[#4fbf8b]/10 cursor-pointer text-red-500"
              onClick={logout}
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center gap-6 sm:hidden">
        <div
          //   onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img
            // src={assets.nav_cart_icon}
            alt="cart"
            className="w-6 opacity-80"
          />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-[#4fbf8b] w-[18px] h-[18px] rounded-full">
            {/* {getCartItemCount()} */}
          </button>
        </div>

        <button aria-label="Menu">
          {/* Menu Icon SVG */}
          {/* <img src={assets.menu_icon} alt="menu" /> */}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={` absolute top-[60px] left-0 w-full bg-white shadow-md py-4 z-100 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        {/* {user && (
          <Link href="/my-orders">
            My Orders
          </Link>
        )} */}
        <Link href="/contact">Contact</Link>
        {/* {!user ? (
          <button
            onClick={() => {
              setOpen(false);
              setShowUserLogin(true);
            }}
            className="cursor-pointer px-6 py-2 mt-2 bg-[#4fbf8b] hover:bg-[#4fbf8b]-dull transition text-white rounded-full text-sm"
          >
            Login
          </button>
        ) : (
          <button
            onClick={logout}
            className="cursor-pointer px-6 py-2 mt-2 bg-[#4fbf8b] hover:bg-[#4fbf8b]-dull transition text-white rounded-full text-sm"
          >
            Logout
          </button>
        )} */}
      </div>
    </nav>
  );
};

export default Navbar;
