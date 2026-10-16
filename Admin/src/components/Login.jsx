import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../Layout/AppLayout";
import { toast } from "react-toastify";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(backendUrl + "/api/users/admin", {
        email,
        password,
      });
      if (res.data.success) {
        setToken(res.data.token);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center m-auto">
      <div className="max-w-md px-8 py-6 shadow-md bg-white">
        <h1 className="text-2xl font-bold mb-4 ">Admin Panel</h1>
        <form
          onSubmit={onSubmitHandler}
          className="w-[400px ] flex flex-col gap-3"
        >
          <div className="min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            // onClick={() => setToken("login")}
            type="submit"
            className="w-full px-4 py-2 rounded-md bg-gray-950 text-sm text-white "
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
