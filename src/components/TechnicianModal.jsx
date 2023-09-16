/** @format */

import React, { useState, useEffect } from "react";
import { useAuthApi } from "../context/authContext/authProvider";
import { useTaskApi } from "../context/taskContext/taskProvider";
import { ADD_TECHNICIAN, UPDATE_TECHNICIAN } from "../context/constansts";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import { addTechnician, updateTechnician } from "../networkCalls";
import { toast } from "react-toastify";
const TechnicianModal = ({
  setModal,
  technicianToUpdate,
  setTechnicianToUpdate,
  modal,
}) => {
  const { state: authState } = useAuthApi();
  const { dispatch } = useTaskApi();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    if (technicianToUpdate !== null) {
      setData(technicianToUpdate);
    }
  }, [modal]);

  const handleChange = (e) => {
    setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  const handleClose = () => {
    setTechnicianToUpdate(null);
    setData({
      name: "",
      email: "",
      password: "",
    });
    setModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    if (technicianToUpdate === null) {
      if (data.password !== confirmPassword) {
        setLoading(false);
        toast.error("Password does not match with Confirm Password");
        return;
      }
      addTechnician(data)
        .then((res) => {
          dispatch({ type: ADD_TECHNICIAN, payload: data });
          setData({
            name: "",
            email: "",
            password: "",
          });
          setModal(false);
          setLoading(false);
          toast.success("Technician Added");
        })
        .catch((error) => {
          setLoading(false);
          toast.error(
            error?.response?.data?.message ||
              "Something Went Wrong, Please Try Later"
          );
        });
    } else {
      updateTechnician(data, technicianToUpdate.id)
        .then((res) => {
          dispatch({ type: UPDATE_TECHNICIAN, payload: data });
          setData({
            name: "",
            email: "",
            password: "",
          });
          setLoading(false);
          setModal(false);
          setTechnicianToUpdate(null);
          toast.success("Technician Updated");
        })
        .catch((error) => {
          setLoading(false);
          toast.error(
            error?.response?.data?.message ||
              "Something Went Wrong, Please Try Later"
          );
        });
    }
  };

  return (
    <div
      className="py-12 bg-slate-800 bg-opacity-50 transition duration-150 ease-in-out z-10 absolute top-5 lg:top-0 right-0 bottom-0 left-0"
      id="modal"
    >
      <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-100">
          <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
            {technicianToUpdate === null
              ? "Add Technician"
              : "Update Technician"}
          </h1>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-4">
              <label
                for="name"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Technician Name:
              </label>
              <input
                id="name"
                name="name"
                value={data.name}
                onChange={(e) => handleChange(e)}
                className="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                placeholder="Enter Technician Name"
                required
                minLength={4}
              />
            </div>

            <div className="mb-4">
              <label
                for="email"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Technician Email:
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={data.email}
                onChange={(e) => handleChange(e)}
                className="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                placeholder="Enter Technician Email"
                required
                minLength={4}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Password:
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={(e) => handleChange(e)}
                  className="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                  placeholder="Enter Password"
                  required
                  minLength={6}
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-1 right-0 flex items-center pr-3 cursor-pointer"
                >
                  {showPassword ? (
                    <BsEyeSlash className="h-5 w-5 text-gray-400 hover:text-indigo-500 transition duration-300" />
                  ) : (
                    <BsEye className="h-5 w-5 text-gray-400 hover:text-indigo-500 transition duration-300" />
                  )}
                </span>
              </div>
            </div>
            {!technicianToUpdate && (
              <div className="mb-4">
                <label
                  for="confirmPassword"
                  className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
                >
                  Confirm Password:
                </label>
                <input
                  id="confirm
                            Password"
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                  placeholder="Confirm  Password"
                  required
                  minLength={6}
                />
              </div>
            )}

            <div className="flex items-center justify-start w-full">
              <button
                type="submit"
                disabled={loading}
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
              >
                Submit
              </button>

              <button
                onClick={() => handleClose()}
                className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                onclick="modalHandler()"
              >
                Cancel
              </button>
            </div>
          </form>
          <button
            onClick={() => handleClose()}
            className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
            onclick="modalHandler()"
            aria-label="close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechnicianModal;
