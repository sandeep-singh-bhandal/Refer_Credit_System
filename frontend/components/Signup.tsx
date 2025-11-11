"use client";
import { useAuthStore } from "@/store/useAuthStore";
import { useState } from "react";
import { BiUser } from "react-icons/bi";
import { LuLock } from "react-icons/lu";
import { MdEmail } from "react-icons/md";

const Signup = () => {
  const [state, setState] = useState<string>("login");
  const { login, signup } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    referralCode: "",
  });


  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          state === "login" ? login(formData) : signup(formData);
        }}
        className="bg-white text-gray-500 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <h2 className="text-2xl font-bold mb-8 mt-2  text-center text-gray-800">
          {state === "login" ? "Welcome Back" : "Sign Up"}
        </h2>

        {state === "register" && (
          <div className="flex items-center my-3 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
            <BiUser className="size-5" />
            <input
              className="w-full outline-none bg-transparent py-2.5"
              type="text"
              placeholder="Username"
              required
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          </div>
        )}

        <div className="flex items-center my-3 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <MdEmail className="size-5" />
          <input
            className="w-full outline-none bg-transparent py-2.5"
            type="email"
            placeholder="Email"
            required
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div className="flex items-center mt-3 mb-5 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <LuLock className="size-5" />
          <input
            className="w-full outline-none bg-transparent py-2.5"
            type="password"
            placeholder="Password"
            required
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
          />
        </div>
        {state === "register" && (
          <div className="mb-5 mt-8">
            <h1>Do you have a referral code?</h1>
            <div className="flex items-center mt-3 mb-5 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
              <input
                className="w-full outline-none bg-transparent py-2.5"
                type="text"
                placeholder="Enter your code"
                name="referralCode"
                maxLength={8}
                value={formData.referralCode}
                onChange={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value.toUpperCase() })
                }
              />
            </div>
          </div>
        )}
        <button className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium">
          {state === "login" ? "Login" : "Create Account"}
        </button>
        <p className="text-center mt-4">
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <a
            onClick={() => setState(state === "login" ? "register" : "login")}
            className="text-blue-500 underline cursor-pointer"
          >
            {state === "register" ? "Log In" : "Register"}
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
