/** @format */

import React, { useState, useEffect } from "react";
import { useAuthApi } from "../context/authContext/authProvider";
import { useTaskApi } from "../context/taskContext/taskProvider";
import { RiAddLine } from "react-icons/ri";
import { format } from "date-fns";
import { IoIosRemove } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import {
  ADD_TASK,
  GET_APARTMENTS,
  GET_TECHNICIANS,
} from "../context/constansts";
import { addJob, getAllApartments, getAllTechnicians } from "../networkCalls";
import ApartmentSelect from "../components/ApartmentSelect";
import TechnicianSelect from "../components/TechnicianSelect";
import { toast } from "react-toastify";
function Form() {
  const currentDate = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const { state: authState } = useAuthApi();
  const { dispatch, state } = useTaskApi();
  const { apartments, technicians } = state;
  const [loading, setLoading] = useState(false);
  const [jobResponsibilities, setJobResponsibilities] = useState([""]);
  const [data, setData] = useState({
    title: "",
    timeline: "",
    description: "",
    note: "",
  });
  const [apartment, setApartment] = useState(null);
  const [technician, setTechnician] = useState(null);
  const handleChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleAddResponsibility = () => {
    setJobResponsibilities([...jobResponsibilities, ""]);
  };

  const handleRemoveResponsibility = (index) => {
    if (jobResponsibilities.length > 1) {
      const updatedResponsibilities = [...jobResponsibilities];
      updatedResponsibilities.splice(index, 1);
      setJobResponsibilities(updatedResponsibilities);
    }
  };

  const handleResponsibilityChange = (index, value) => {
    const updatedResponsibilities = [...jobResponsibilities];
    updatedResponsibilities[index] = value;
    setJobResponsibilities(updatedResponsibilities);
  };
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
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    if (!apartment) {
      setLoading(false);
      return toast.warning("Please Choose The Apartment");
    }
    if (!technician) {
      setLoading(false);
      return toast.warning("Please Choose The Technician");
    }
    const date = data?.timeline ? new Date(data.timeline) : null;
    const formatted = date !== null && format(date, "dd-MM-yyyy");
    console.log(formatted);
    const status = technician && data?.timeline ? "Assigned" : "Unscheduled";
    const length = jobResponsibilities.length;
    const jobDetails = {
      ...data,
      timeline: data?.timeline && formatted,
      status,
      apartment: apartment && apartment.id,
      technician: technician && technician.id,
      responsibilities:
        jobResponsibilities[length - 1] !== "" ? jobResponsibilities : [],
    };
    const jobToSave = {
      ...data,
      timeline: formatted,
      status,
      apartment: apartment,
      technician: technician,
      responsibilities: jobResponsibilities,
    };
    addJob(jobDetails, authState?.token)
      .then((res) => {
        // console.log(res.data, "add job success");
        setData({
          title: "",
          timeline: "",
          description: "",
          note: "",
        });
        setApartment(null);
        setTechnician(null);
        setJobResponsibilities([""]);
        dispatch({ type: ADD_TASK, payload: jobToSave });
        setLoading(false);
        navigate("/");
        toast.success(res?.data?.message);
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message ||
            "Something Went Wrong, Please Try Later"
        );
        setLoading(false);
        console.log(error, "error add job form");
      });
  };
  return (
    <div className="container mx-auto p-4 lg:p-8  md:max-w-3xl xl:max-w-4xl ">
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4  "
        onSubmit={handleSubmit}
      >
        {/* JobTitle Input */}
        <div className="md:col-span-2">
          <label htmlFor="jobTitle">Job Title</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={(e) => handleChange(e)}
            value={data?.title}
            placeholder="Enter Job Title"
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        {/* Description Textarea */}
        <div className="md:col-span-2">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={data?.description}
            onChange={(e) => handleChange(e)}
            placeholder="Enter Job Description"
            rows="3"
            className="w-full rounded-md border border-gray-300 p-2"
            required
          ></textarea>
        </div>

        {/* Apartments Dropdown */}
        <div>
          <label htmlFor="apartments">Apartments</label>
          <ApartmentSelect
            options={apartments}
            data={apartment}
            setData={setApartment}
          />
        </div>

        {/* Technicians Dropdown */}
        <div>
          <label htmlFor="technicians">Technicians</label>
          <TechnicianSelect
            options={technicians}
            data={technician}
            setData={setTechnician}
          />
        </div>

        {/* Date Input */}
        <div>
          <label htmlFor="timeline">Date</label>
          <input
            type="date"
            id="timeline"
            name="timeline"
            min={currentDate}
            value={data?.timeline}
            onChange={(e) => handleChange(e)}
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        {/* Note Input */}
        <div>
          <label htmlFor="note">Note</label>
          <textarea
            type="text"
            id="note"
            name="note"
            value={data.note}
            onChange={(e) => handleChange(e)}
            placeholder="Enter Note"
            rows="1"
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        {/* JobResponsibilities Inputs */}
        <div className="md:col-span-2">
          <label htmlFor="responsibilities">Job responsibilities</label>
          {jobResponsibilities?.map((responsibility, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                id="responsibilities"
                name="responsibilities"
                placeholder="Job Responsibility"
                value={responsibility}
                onChange={(e) =>
                  handleResponsibilityChange(index, e.target.value)
                }
                className="w-full rounded-md border border-gray-300 p-2 mb-2"
              />
              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveResponsibility(index)}
                  className="text-red-500"
                >
                  <IoIosRemove />
                </button>
              )}
              {index === jobResponsibilities.length - 1 && (
                <button
                  type="button"
                  onClick={handleAddResponsibility}
                  className="text-blue-500"
                >
                  <RiAddLine />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md"
          >
            {loading ? "Submitting" : "Submit"}
          </button>
          <button
            onClick={() => navigate("/")}
            type="button"
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md ml-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
