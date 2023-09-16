/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LOAD_USER_SUCCESS } from "../context/constansts";
import { url } from "../config";
import axios from "axios";
import { useAuthApi } from "../context/authContext/authProvider";
import { toast } from "react-toastify";
import { FaSignInAlt, FaSpinner } from "react-icons/fa";
const Login = () => {
  const { dispatch } = useAuthApi();
  const [loginCredential, setLoginCredential] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) =>
    setLoginCredential((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(`${url}/admin/login`, loginCredential);
      console.log(result);
      localStorage.setItem("user", JSON.stringify(result.data.admin.email));
      localStorage.setItem("token", JSON.stringify(result.data.token));

      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: {
          user: result?.data?.admin?.email,
          token: result?.data?.token,
        },
      });
      setLoading(false);
      setLoginCredential({
        email: "",
        password: "",
      });
    } catch (error) {
      setLoading(false);
      toast.error(
        error?.response?.data?.message ||
          "Something Went Wrong, Please Try Later"
      );
      console.log(error?.response?.data?.message);
    }
  };
  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <h1 className="text-4xl font-medium">Login</h1>
      <p className="text-slate-500">Hi, Welcome back 👋</p>
      <form onSubmit={(e) => handleSubmit(e)} className="my-10">
        <div className="flex flex-col space-y-5">
          <label for="email">
            <p className="font-medium text-slate-700 pb-2">Email address</p>
            <input
              value={loginCredential.email}
              onChange={(e) => handleChange(e)}
              id="email"
              name="email"
              type="email"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter email address"
              required
            />
          </label>
          <label for="password">
            <p className="font-medium text-slate-700 pb-2">Password</p>
            <input
              id="password"
              name="password"
              type="password"
              value={loginCredential.password}
              onChange={(e) => handleChange(e)}
              minLength={6}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter your password"
              required
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-purple-600 rounded-lg border-purple-500 hover:shadow inline-flex space-x-2 items-center justify-center"
          >
            {loading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaSignInAlt />
            )}
            <span>{loading ? "Submitting" : "Login"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
