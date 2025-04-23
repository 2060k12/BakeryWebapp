"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { ApiResponse } from "@/helpers/apiResponse";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "" || password === "") {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post<ApiResponse<{ token: string }>>(
        "/api/admin/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (response.status === 200) {
        toast.success("Login successful!");
        localStorage.setItem("token", data.data.token);
        // Redirect to the dashboard or another page
        window.location.href = "/admin/dashboard";
      } else {
        // Handle login error
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="m-16">
      <form
        onSubmit={handleLogin}
        className="border-black border-2 p-12 w-2/5 flex-col m-auto rounded-xl "
      >
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center z-50 h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid" />
          </div>
        )}

        <h1 className="text-xl ">LOGIN</h1>

        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-grey-400 border-2 rounded-sm w-full p-3 text-xl"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className="border-grey-400 border-2 rounded-sm  w-full p-3 text-xl"
          />
        </div>

        <button
          type="submit"
          className="bg-green-400 py-3 text-2xl font-bold text-white w-full rounded-sm hover:cursor-pointer hover:bg-green-300 "
        >
          Login
        </button>

        {/* <h3 className="text-right">Forgot password?</h3> */}
      </form>
    </div>
  );
};

export default Page;
