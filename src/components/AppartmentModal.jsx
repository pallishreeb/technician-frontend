/** @format */

import React, { useState, useEffect } from "react";
import { useAuthApi } from "../context/authContext/authProvider";
import { useTaskApi } from "../context/taskContext/taskProvider";
import { ADD_APARTMENT, UPDATE_APARTMENT } from "../context/constansts";
import { addApartment, updateApartment } from "../networkCalls";
import { toast } from "react-toastify";
const AppartmentModal = ({
  setModal,
  appartmentToUpdate,
  setAppartmentToUpdate,
  modal,
}) => {
  const { state: authState } = useAuthApi();
  const { dispatch } = useTaskApi();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    apartmentName: "",
    location: "",
  });
  useEffect(() => {
    if (appartmentToUpdate !== null) {
      setData(appartmentToUpdate);
    }
  }, [modal]);

  const handleChange = (e) => {
    setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  const handleClose = () => {
    setAppartmentToUpdate(null);
    setData({
      apartmentName: "",
      location: "",
    });
    setModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!data?.apartmentName || !data?.location) {
      setLoading(false);
      toast.warning("All fields are required");
      return;
    }
    if (appartmentToUpdate === null) {
      addApartment(data)
        .then((res) => {
          dispatch({ type: ADD_APARTMENT, payload: data });
          setData({
            apartmentName: "",
            location: "",
          });
          setModal(false);
          setLoading(false);
          toast.success("Apartment Details Added");
        })
        .catch((error) => {
          setLoading(false);
          toast.error(
            error?.response?.data?.message ||
              "Something Went Wrong, Please Try Later"
          );
          console.log(error);
        });
    } else {
      updateApartment(data, appartmentToUpdate.id)
        .then((res) => {
          dispatch({ type: UPDATE_APARTMENT, payload: data });
          setData({
            apartmentName: "",
            location: "",
          });
          setLoading(false);
          setModal(false);
          setAppartmentToUpdate(null);
          toast.success("Task Details Updated");
        })
        .catch((error) => {
          setLoading(false);
          toast.error(
            error?.response?.data?.message ||
              "Something Went Wrong, Please Try Later"
          );
          console.log(error);
        });
    }
  };

  return (
    <div
      className="py-12 bg-slate-800 bg-opacity-50 transition duration-150 ease-in-out z-10 absolute top-10 lg:top-0 right-0 bottom-0 left-0"
      id="modal"
    >
      <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-100">
          <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
            {appartmentToUpdate ? "Update Apartment" : `Add New Apartment`}
          </h1>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-4">
              <label
                for="name"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Appartment Name:
              </label>
              <input
                id="name"
                name="apartmentName"
                value={data.apartmentName}
                onChange={(e) => handleChange(e)}
                className="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                placeholder="Enter Appartment Name"
                required
                minLength={4}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="location"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Appartment Location:
              </label>
              <textarea
                id="location"
                name="location"
                value={data.location}
                onChange={(e) => handleChange(e)}
                className="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                placeholder="Enter Appartment Location"
                minLength={4}
              />
            </div>

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
            type="button"
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

export default AppartmentModal;
