import React, { useState, useEffect } from "react";
import axios from "axios";
import { useShop } from "../Context/ShopContext";
import { useNavigate } from "react-router";
import { useUser } from "../Context/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { token, backendUrl, settoken } = useShop();
  const { userData, setUserData } = useUser();

  const navigate = useNavigate();



  useEffect(() => {
    async function checkToken() {
      console.log(token);
      const response = await axios.post(`${backendUrl}/api/user/login`, {}, {
        headers: {
          token
        }
      });


      if (response.data.success && response.data.message == "verified") {

        setUserData(response.data.Userdata);

        navigate("/profile");
      }
    }
    checkToken();
  }, []);

  const handleLogin = async (e) => {

    e.preventDefault();
    try {
      if (!email || !password) {
        setError("All fields are required");
        return;
      }


      const response = await axios.post(`${backendUrl}/api/user/login`, { email, password }, {
        headers: {
          token
        }
      });


      if (response.data.success) {

        setUserData(response.data.userData);
        localStorage.setItem("token", response.data.newToken);
        settoken(response.data.newToken);

        navigate("/profile");
      } else {
        alert(response.data.message);
      }


    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-center mb-6">
          Login
        </h1>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-md outline-none focus:ring-2 focus:ring-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="border p-3 rounded-md w-full outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-3 cursor-pointer text-sm text-gray-500"
            >
              {showPass ? "Hide" : "Show"}
            </span>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* FOOTER */}
        <p className="text-sm text-center mt-4 text-gray-500">
          Don’t have an account?{" "}
          <span onClick={() => { navigate("/register") }} className="text-black cursor-pointer">
            Sign up
          </span>
        </p>

      </div>

    </div>
  );
}

export default Login;