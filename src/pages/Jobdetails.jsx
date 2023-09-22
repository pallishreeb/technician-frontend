/** @format */

import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaCalendarAlt,
  FaInfoCircle,
  FaArrowLeft,
  FaSpinner,
} from "react-icons/fa";
import { BsFileText, BsBuilding } from "react-icons/bs";
import { AiOutlineTag } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { useAuthApi } from "../context/authContext/authProvider";
import { useNavigate, useParams } from "react-router-dom";

import { getJob } from "../networkCalls";
import { toast } from "react-toastify";
function JobDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state: authState } = useAuthApi();
  const [jobDetails, setJobDetails] = useState();
  const [loading, setLoading] = useState(false);
  const getJobDetails = async () => {
    setLoading(true);
    getJob(id, authState?.token)
      .then((res) => {
        setJobDetails(res?.data);

        setLoading(false);
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message ||
            "Something Went Wrong, Please Try Later"
        );
        setLoading(false);
        console.log(error);
      });
  };
  useEffect(() => {
    if (id) {
      getJobDetails();
    }
  }, [id]);

  const getStatusColor = () => {
    switch (jobDetails?.status) {
      case "Assigned":
        return "bg-green-300 text-black";
      case "Inprogress":
        return "bg-orange-400 ";
      case "Rescheduled":
        return "bg-yellow-400 text-black";
      case "Completed":
        return "bg-green-700 text-white";
      case "Cancelled":
        return "bg-red-600 text-white";
      default:
        return "text-black bg-slate-200";
    }
  };
  if (loading === true)
    return (
      <div class=" relative flex justify-center items-center mt-4">
        <FaSpinner className="w-1/6 h-1/6 animate-spin text-purple-500" />
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="container mx-auto p-2 md:p-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-indigo-500 text-white py-2 px-4 rounded-md flex items-center space-x-2"
        >
          <FaArrowLeft />
          <span>Go Back</span>
        </button>
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8 lg:mt-0 lg:mx-auto lg:w-3/4 xl:w-1/2 hover:shadow-xl transition duration-300 relative">
          <h1 className="text-xl font-semibold">{jobDetails?.title}</h1>
          <p className="text-gray-500">{jobDetails?.description || "NA"}</p>
          <div className="flex items-center mt-4">
            <FaUser className="text-gray-400 mr-2" />
            <p className="text-gray-600">
              {jobDetails?.technician_name || "NA"}
            </p>
          </div>
          <div className="flex items-center mt-4">
            <AiOutlineMail className="text-gray-400 mr-2" />
            <p className="text-gray-600">
              {jobDetails?.technician_email || "NA"}
            </p>
          </div>
          <div className="flex items-center mt-2">
            <FaInfoCircle className="text-gray-400 inline-block mr-2" />

            <p className={`text-sm rounded-full py-1 px-3 ${getStatusColor()}`}>
              {jobDetails?.status}
            </p>
          </div>
          <div className="mt-4 flex items-center">
            <BsFileText className="text-gray-400 inline-block mr-2" />
            <p className="text-gray-600">Note: {jobDetails?.note || "NA"}</p>
          </div>
          <div className="mt-4 flex items-center">
            <FaCalendarAlt className="text-gray-400 mr-2" />
            <p className="text-gray-700">
              Due Date: {jobDetails?.timeline || "NA"}
            </p>
          </div>
          <div className="mt-4 flex items-center">
            <BsBuilding className="text-gray-400 inline-block mr-2" />
            <p className="text-gray-700">
              Apartment: {jobDetails?.apartment_name || "NA"},{" "}
              {jobDetails?.apartment_location || "NA"}
            </p>
          </div>
          <div className="mt-4">
            <p className="text-gray-700">
              <AiOutlineTag className="text-gray-400 inline-block mr-2" />
              Responsibilities:
            </p>
            {jobDetails?.responsibilities?.length > 0 ? (
              <ol className="list-decimal ml-6">
                {jobDetails?.responsibilities?.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ol>
            ) : (
              <b>NA</b>
            )}
          </div>
          <button
            onClick={() => navigate(`/edit-job/${jobDetails?.id}`)}
            className="bg-indigo-700 text-white py-2 px-4 rounded-md flex items-center
              absolute  bottom-3 right-2 mt-5 ml-3"
          >
            <span>Edit</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
