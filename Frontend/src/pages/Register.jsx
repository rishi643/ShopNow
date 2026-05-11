import React, { useState } from "react";
import axios from "axios";
import { useShop } from "../Context/ShopContext";
import { useNavigate } from "react-router";
import { useUser } from "../Context/UserContext";


function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const { settoken, backendUrl } = useShop();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setPassword, setEmail } = useUser();

  function handleChange(e) {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {

      setLoading(true);



      const response = await axios.post(
        `${backendUrl}/api/user/register`,
        form
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        settoken(response.data.token);
        navigate("/login");
      } else {
        alert(response.data.message);

      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center px-4">

      <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-slate-800 grid md:grid-cols-2 bg-slate-900">

        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-between relative p-10 bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 text-white overflow-hidden">

          <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-10 -left-10 blur-3xl"></div>
          <div className="absolute w-80 h-80 bg-black/20 rounded-full bottom-0 right-0 blur-3xl"></div>

          <div className="relative z-10">
            <h1 className="text-5xl font-black leading-tight">
              Create Your Account
            </h1>

            <p className="mt-6 text-lg text-white/80 leading-relaxed">
              Join a modern platform with secure authentication,
              elegant UI, and fast performance.
            </p>
          </div>

          <div className="relative z-10 flex gap-4 mt-10">

            <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5">
              <h2 className="text-3xl font-bold">10K+</h2>
              <p className="text-white/70 mt-1 text-sm">
                Registered Users
              </p>
            </div>

            <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5">
              <h2 className="text-3xl font-bold">99.9%</h2>
              <p className="text-white/70 mt-1 text-sm">
                Secure Experience
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-slate-900 text-white">

          <div>
            <h2 className="text-4xl font-black">
              Register
            </h2>

            <p className="mt-2 text-slate-400">
              Build your account in seconds.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >

            {/* NAME */}
            <div>
              <label className="block text-sm mb-2 text-slate-300">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm mb-2 text-slate-300">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm mb-2 text-slate-300">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:scale-[1.02] active:scale-[0.99] transition-all py-3 rounded-xl font-semibold shadow-lg shadow-indigo-500/20"
            >
              {
                loading
                  ? "Creating Account..."
                  : "Create Account"
              }
            </button>

          </form>

          <p className="mt-6 text-center text-slate-400 text-sm">
            Already have an account?
            <span className="text-indigo-400 cursor-pointer hover:underline ml-1">
              Login
            </span>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;