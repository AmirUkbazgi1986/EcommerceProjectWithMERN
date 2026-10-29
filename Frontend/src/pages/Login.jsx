import { useState } from "react";
import { useShopContext } from "../context/ShopContext";

import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { token, setToken, navigate, backendUrl } = useShopContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      // console.log(formData);
      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      if (currentState === "Sign Up") {
        const res = await axios.post(
          `${backendUrl}/api/users/register`,
          formData,
        );
        if (res.data.success) {
          console.log(res.data.token);
          toast.success(res.data.message);
        } else {
          toast.error(`Error; ${res.data.message}`);
        }
      } else {
        const res = await axios.post(`${backendUrl}/api/users/login`, formData);
        console.log(res.data.token);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Sign Up" ? (
        <input
          type="text"
          value={data.name}
          onChange={handleChange}
          name="name"
          className="w-full px-3 py-2 border border-gray-800 "
          placeholder=" Name"
          required
        />
      ) : (
        <></>
      )}

      <input
        type="email"
        value={data.email}
        onChange={handleChange}
        name="email"
        className="w-full px-3 py-2 border border-gray-800 "
        placeholder=" Email"
        required
      />
      <input
        type="password"
        value={data.password}
        onChange={handleChange}
        name="password"
        className="w-full px-3 py-2 border border-gray-800 "
        placeholder=" Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Sign Up")}
          >
            Create account
          </p>
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Login")}
          >
            Login here
          </p>
        )}
      </div>
      <button
        type="submit"
        className="bg-black text-white font-light px-8 py-2 mt-4"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
}

export default Login;
