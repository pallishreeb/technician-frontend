/** @format */

import React, { useState, useEffect } from "react";
import { useAuthApi } from "../context/authContext/authProvider";
import { useTaskApi } from "../context/taskContext/taskProvider";
import { RiAddLine } from "react-icons/ri";
import { IoIosRemove } from "react-icons/io";
import { FaSpinner } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import {
  GET_APARTMENTS,
  GET_TECHNICIANS,
  UPDATE_TASK,
} from "../context/constansts";
import {
  getAllApartments,
  getAllTechnicians,
  updateJob,
  getJob,
} from "../networkCalls";
import ApartmentSelect from "../components/ApartmentSelect";
import TechnicianSelect from "../components/TechnicianSelect";
import { toast } from "react-toastify";
import { format } from "date-fns";
function Form() {
  const currentDate = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const { id } = useParams();
  const { state: authState } = useAuthApi();
  const { dispatch, state } = useTaskApi();
  const { apartments, technicians } = state;
  const [loading, setLoading] = useState(false);
  const [jobLoading, setJobLoading] = useState(false);

  const [jobResponsibilities, setJobResponsibilities] = useState([""]);
  const [jobDetails, setJobDetails] = useState(null);
  const [apartment, setApartment] = useState(null);
  const [technician, setTechnician] = useState(null);
  const [previousTimeline, setPreviousTimeline] = useState("");
 
  const handleChange = (e) => {
    setJobDetails((prevState) => ({
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
  function convertDateFormat(inputDate) {
    // Split the input date string into day, month, and year components
    const dateComponents = inputDate.split("-");
    // Ensure that there are three components (day, month, and year)
    if (dateComponents.length === 3) {
      const day = dateComponents[0];
      const month = dateComponents[1];
      const year = dateComponents[2];

      // Reorder the components to create the "yyyy-mm-dd" format
      const formattedDate = `${year}-${month}-${day}`;

      return formattedDate;
    } else {
      // If the input date format is not valid, return an error message or handle it as needed
      return inputDate;
    }
  }

  const getJobDetails = async () => {
    setJobLoading(true);
    getJob(id, authState?.token)
      .then((res) => {
        setJobDetails(res?.data);
        if (res?.data?.responsibilities?.length > 0) {
          setJobResponsibilities(res.data.responsibilities);
        }
        setApartment({
          id: res.data?.apartment,
          apartmentName: res.data?.apartment_name,
        });
        if (res.data?.technician && res.data?.technician_name) {
          setTechnician({
            id: res.data?.technician,
            name: res.data?.technician_name,
          });
        }
        if (res?.data?.timeline) {
          const format = convertDateFormat(res?.data?.timeline);
          setJobDetails((prev) => ({ ...prev, timeline: format }));
        }
        setPreviousTimeline(res?.data?.timeline)
        setJobLoading(false);
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message ||
            "Something Went Wrong, Please Try Later"
        );
        setJobLoading(false);
        console.log(error);
      });
  };
  useEffect(() => {
    if (id) {
      getJobDetails();
    }
  }, [id]);

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
  useEffect(() => {}, []);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const date = jobDetails?.timeline ? new Date(jobDetails.timeline) : null;
    const formatted = date !== null && format(date, "dd-MM-yyyy");
    const length = jobResponsibilities.length;
    const jobForm = {
      ...jobDetails,
      timeline: jobDetails?.timeline && formatted,
      apartment: apartment.id,
      technician: technician.id,
      responsibilities:
        jobResponsibilities[length - 1] !== "" ? jobResponsibilities : [],
      status:
        previousTimeline === "" &&
        jobDetails?.timeline &&
        jobDetails?.status === "Unscheduled"
          ? "Assigned"
          : jobDetails?.status,
    };

    updateJob(jobForm, authState?.token)
      .then((res) => {
        setJobDetails(null);
        setApartment(null);
        setTechnician(null);
        setJobResponsibilities([""]);
        const jobToSave = {
          ...jobForm,
          apartment_name: apartment.apartmentName,
          technician_name: technician.name,
        };
        dispatch({ type: UPDATE_TASK, payload: jobToSave });
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
  if (jobLoading === true)
    return (
      <div class=" relative flex justify-center items-center mt-4">
        <FaSpinner className="w-1/6 h-1/6 animate-spin text-purple-500" />
      </div>
    );
  return (
    <div className="container mx-auto p-4 lg:px-12 md:max-w-4xl ">
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        {/* JobTitle Input */}
        <div>
          <label htmlFor="jobTitle">Job Title</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={(e) => handleChange(e)}
            value={jobDetails?.title}
            placeholder="Enter Job Title"
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status</label>

          <select
            id="status"
            name="status"
            className="w-full rounded-md border border-gray-300  p-2"
            onChange={(e) => handleChange(e)}
            value={jobDetails?.status || "NA"}
          >
            {" "}
            <option value="Unscheduled">Unscheduled</option>
            <option value="Assigned">Assigned</option>
            <option value="Inprogress">In Progress</option>
            <option value="Rescheduled">Rescheduled</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        {/* Description Textarea */}
        <div className="md:col-span-2">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={jobDetails?.description}
            onChange={(e) => handleChange(e)}
            placeholder="Enter Job Description"
            rows="2"
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
            value={jobDetails?.timeline}
            onChange={(e) => {
              handleChange(e);
            }}
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
            value={jobDetails?.note}
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
              {index === jobResponsibilities?.length - 1 && (
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
