/** @format */

import React, { useState, useEffect } from "react";
import { useAuthApi } from "../context/authContext/authProvider";
import { useTaskApi } from "../context/taskContext/taskProvider";
import { url } from "../config";
import {
  ADD_TASK,
  GET_APARTMENTS,
  GET_TECHNICIANS,
  UPDATE_TASK,
} from "../context/constansts";
import axios from "axios";
import {
  addJob,
  getAllApartments,
  getAllTechnicians,
  updateJob,
} from "../networkCalls";
import ApartmentSelect from "./ApartmentSelect";
import TechnicianSelect from "./TechnicianSelect";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

const JobModal = ({ setModal, jobToUpdate, setJobToUpdate, modal }) => {
  const currentDate = new Date().toISOString().split("T")[0];
  const { state: authState } = useAuthApi();
  const { dispatch, state } = useTaskApi();
  const { apartments, technicians } = state;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    subject: "",
    dueDate: "",
    priority: "normal",
    status: false,
  });

  const getApartments = async () => {
    try {
      const res = await getAllApartments(authState?.token);
      dispatch({ type: GET_APARTMENTS, payload: res?.data });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something Went Wrong, Please Try Later"
      );
      console.log(error);
    }
  };
  const getTechnicians = async () => {
    try {
      const res = await getAllTechnicians(authState?.token);
      dispatch({ type: GET_TECHNICIANS, payload: res?.data });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something Went Wrong, Please Try Later"
      );
      console.log(error);
    }
  };
  useEffect(() => {
    getTechnicians();
  }, [technicians?.length]);
  useEffect(() => {
    getApartments();
  }, [apartments?.length]);
  useEffect(() => {
    if (jobToUpdate) {
      setData(jobToUpdate);
    }
  }, [modal]);

  const handleChange = (e) => {
    setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };
  const handleClose = () => {
    setJobToUpdate(null);
    setData({
      subject: "",
      dueDate: "",
      priority: "normal",
    });
    setModal(false);
  };

  const addTask = (userid, config) => {
    axios.post(`${url}/tasks/add/${userid}`, data, config).then((res) => {
      dispatch({ type: ADD_TASK, payload: data });
      setData({
        subject: "",
        dueDate: "",
        priority: "normal",
      });
      setModal(false);
      setLoading(false);
      toast.success("Task Added");
    });
  };
  const updateTask = async (userid, taskid, config) => {
    axios
      .put(`${url}/tasks/${taskid}/edit/${userid}`, data, config)
      .then((res) => {
        dispatch({ type: UPDATE_TASK, payload: data });
        setData({
          subject: "",
          dueDate: "",
          priority: "normal",
        });
        setLoading(false);
        setModal(false);
        toast.success("Task Updated");
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    setLoading(true);
    try {
      const { _id } = authState.user;
      if (!jobToUpdate) {
        addTask(_id, config);
      } else {
        updateTask(_id, jobToUpdate._id, config);
        setJobToUpdate(null);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div
      className="py-12 bg-slate-800 bg-opacity-50 transition duration-150 ease-in-out z-10 absolute top-15 lg:top-0 right-0 bottom-0 left-0"
      id="modal"
    >
      <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-100">
          <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
            Add Job
          </h1>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-4">
              <label
                for="name"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Job Name:
              </label>
              <input
                id="name"
                name="subject"
                value={data.subject}
                onChange={(e) => handleChange(e)}
                className="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                placeholder="Enter your task"
                required
                minLength={4}
              />
            </div>

            <div className="mb-4">
              <label className="block text-grey-darker text-sm font-bold mb-2">
                Timeline:
              </label>
              <input
                type="date"
                id="date"
                name="dueDate"
                min={currentDate}
                value={data.dueDate}
                onChange={(e) => handleChange(e)}
                className="w-full px-4 py-2 mt-2 mr-4 text-base text-black transition duration-500 ease-in-out transform rounded-lg bg-gray-100 focus:border-blueGray-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                required
              />
            </div>
            <div className="mt-4 mb-4 ">
              <label
                htmlFor="technician"
                className="block text-sm font-medium text-gray-700"
              >
                Technician
              </label>
              <TechnicianSelect options={technicians} />
            </div>

            <div className="mt-4 mb-4">
              <label
                htmlFor="apartment"
                className="block text-sm font-medium text-gray-700"
              >
                Apartment
              </label>
              <ApartmentSelect options={apartments} />
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
          >
            <FaTimes />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobModal;
