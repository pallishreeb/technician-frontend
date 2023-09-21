/** @format */

import React, { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import { getAllJobs, getAllTechnicians, getAnalytics } from "../networkCalls";
import {
  GET_TASKS,
  GET_TECHNICIANS,
  FILTER_BY_STATUS,
  REMOVE_FILTER,
} from "../context/constansts";
import nodata from "../assets/nodata.png";
import { useTaskApi } from "../context/taskContext/taskProvider";
import { useNavigate } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import JobTable from "../components/JobTable";
import DeleteModal from "../components/DeleteModal";
import AnalyticsCard from "../components/AnalyticsCard";
import { useAuthApi } from "../context/authContext/authProvider";
import { toast } from "react-toastify";
function Jobs() {
  const navigate = useNavigate();
  const [jobToDelete, setJobToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDeleteModal, setDeleteModal] = useState(false);
  const [filter, setFilter] = useState("All");
  const { dispatch, state } = useTaskApi();
  const { state: authState } = useAuthApi();
  // State to store data
  const [analytics, setAnalytics] = useState(null);

  const getJobs = async () => {
    setLoading(true);
    getAllJobs(authState?.token)
      .then((res) => {
        dispatch({ type: GET_TASKS, payload: res.data });
        setLoading(false);
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message ||
            "Something Went Wrong, Please Try Later"
        );
        setLoading(false);
        // console.log(error);
      });
  };
  const getAnalyticsFunc = async () => {
    try {
      const res = await getAnalytics(authState?.token);
      setAnalytics(res?.data);
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
      dispatch({ type: GET_TECHNICIANS, payload: res.data });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Something Went Wrong, Please Try Later"
      );
      console.log(error);
    }
  };
  const FilterByStatus = () => {
    switch (filter) {
      case "All":
        dispatch({ type: REMOVE_FILTER });
        break;
      case "Assigned":
        dispatch({ type: REMOVE_FILTER });
        dispatch({ type: FILTER_BY_STATUS, payload: "Assigned" });
        break;
      case "Unscheduled":
        dispatch({ type: REMOVE_FILTER });
        dispatch({ type: FILTER_BY_STATUS, payload: "Unscheduled" });
        break;
      case "Inprogress":
        dispatch({ type: REMOVE_FILTER });
        dispatch({ type: FILTER_BY_STATUS, payload: "Inprogress" });
        break;
      case "Rescheduled":
        dispatch({ type: REMOVE_FILTER });
        dispatch({ type: FILTER_BY_STATUS, payload: "Rescheduled" });
        break;
      case "Completed":
        dispatch({ type: REMOVE_FILTER });
        dispatch({ type: FILTER_BY_STATUS, payload: "Completed" });
        break;
      case "Cancelled":
        dispatch({ type: REMOVE_FILTER });
        dispatch({ type: FILTER_BY_STATUS, payload: "Cancelled" });
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    FilterByStatus();
  }, [filter]);

  // Fetch data (you can replace this with your API call)
  useEffect(() => {
    getTechnicians();
    getAnalyticsFunc();
    getJobs();
  }, []);

  useEffect(() => {
    FilterByStatus();
  }, [filter]);
  if (loading === true)
    return (
      <div class=" relative flex justify-center items-center mt-4">
        <FaSpinner className="w-1/6 h-1/6 animate-spin text-purple-500" />
      </div>
    );

  return (
    <>
      {openDeleteModal && (
        <DeleteModal
          setModal={setDeleteModal}
          itemToDelete={jobToDelete}
          setItemToDelete={setJobToDelete}
          itemType={"job"}
        />
      )}
      <div className="sm:px-6 py-4 w-full">
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mx-6">
          {/* Card for Total Jobs */}
          <AnalyticsCard
            data={analytics?.totalNoJobs}
            title={"Total Jobs"}
            color="text-blue-500"
          />
          {/* Card for Total Technicians */}
          <AnalyticsCard
            data={state?.technicians?.length}
            title={"Total Technicians"}
            color="text-indigo-500"
          />
          {/* Card for Total Job Assignments */}
          <AnalyticsCard
            data={analytics?.totalNoJobsAssigned}
            title={"Total Assignments"}
            color="text-purple-500"
          />

          {/* Card for Total Job Completed */}
          <AnalyticsCard
            data={analytics?.totalNoJobsCompleted}
            title={"Total Completed"}
            color="text-green-500"
          />
        </div>
        <div className="flex justify-between  mt-5  py-3 px-3 md:px-6 ">
          <Dropdown setFilter={setFilter} filter={filter} />
          <button
            type="button"
            onClick={() => navigate("/add-job")}
            className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4  sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none outline-none rounded "
          >
            <p className="text-sm font-medium leading-none text-white">
              Add Job
            </p>
          </button>
        </div>
        {state.tasks?.length === 0 ? (
          <div className="flex justify-center items-center">
            <img src={nodata} alt="404" className="w-1/6 h-1/6" />
          </div>
        ) : (
          <JobTable
            setDeleteModal={setDeleteModal}
            tasks={state?.tasks}
            setJobToDelete={setJobToDelete}
          />
        )}
      </div>
    </>
  );
}

export default Jobs;
