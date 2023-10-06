/** @format */

import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { FaPencilAlt, FaTrashAlt, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const JobTable = ({ setDeleteModal, tasks, setJobToDelete }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  // Pagination configuration
  const perPage = 10; // Number of items per page

  const pageCount = Math.ceil(tasks?.length / perPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  const getStatusColor = (job) => {
    switch (job.status) {
      case "Assigned":
        return "bg-green-300 text-black";
      case "Inprogress":
        return "bg-orange-400";
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
  function trimStringToLimit(inputString, limit) {
    if (inputString.length > limit) {
      // Use the slice method to get a substring up to the specified limit
      return inputString.slice(0, limit) + "...";
    }
    // If the string is already within the limit, return it as is
    return inputString;
  }
  // Calculate the current page's data
  const offset = currentPage * perPage;
  const currentPageData = tasks.slice(offset, offset + perPage);
  return (
    <div className="container mx-auto mt-8">
      <div className="w-full overflow-x-scroll shadow-md rounded">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200 text-indigo-600 uppercase text-sm leading-normal">
              <th className="py-2 px-2 md:py-3 md:px-6 text-xs md:text-base text-left whitespace-nowrap uppercase font-semibold ">
                Job Title
              </th>
              <th className="py-2 px-2 md:py-3 md:px-6 text-xs md:md:text-base text-left whitespace-nowrap uppercase font-semibold">
                Technician
              </th>
              <th className="py-2 px-2 md:py-3 md:px-6 text-xs md:md:text-base text-left whitespace-nowrap uppercase font-semibold">
                Apartment
              </th>{" "}
              <th className="py-2 px-2 md:py-3 md:px-6 text-xs md:md:text-base text-left whitespace-nowrap uppercase font-semibold">
                Timeline
              </th>
              <th className="py-2 px-2 md:py-3 md:px-6 text-xs md:md:text-base text-left whitespace-nowrap uppercase font-semibold">
                Status
              </th>
              <th className="py-2 px-2 md:py-3 md:px-6 text-xs md:md:text-base text-left whitespace-nowrap uppercase font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((job) => (
              <tr
                key={job?.id}
                className="border-b hover:bg-gray-100 transition-all ease-in-out duration-300"
              >
                <td
                  className="py-2 px-2 md:py-3 md:px-6 text-xs md:text-sm text-left whitespace-nowrap cursor-pointer"
                  onClick={() => navigate(`/job/${job?.id}`)}
                >
                  {trimStringToLimit(job?.title, 25)}
                </td>
                <td className="py-2 px-2 md:py-3 md:px-6 text-xs md:text-sm text-left whitespace-nowrap">
                  {job?.technician_name || "NA"}
                </td>
                <td className="py-2 px-2 md:py-3 md:px-6 text-xs md:text-sm text-left whitespace-nowrap">
                  {job?.apartment_name || "NA"}
                </td>
                <td className="py-2 px-2 md:py-3 md:px-6 text-xs md:text-sm text-left whitespace-nowrap">
                  <span>{job?.timeline || "NA"} </span>
                  <span> {job?.duetime || ""}</span>
                </td>
                <td className="py-2 px-2 md:py-3 md:px-6 text-xs md:text-sm text-left whitespace-nowrap">
                  <span
                    className={`rounded-full py-1 px-3 ${getStatusColor(job)}`}
                  >
                    {job?.status || "NA"}
                  </span>
                </td>
                <td className="py-2 flex flex-row gap-3 px-2 md:py-3 md:px-6 text-xs md:text-sm text-left whitespace-nowrap">
                  <FaEye
                    onClick={() => navigate(`/job/${job?.id}`)}
                    className="text-sm md:text-xl mr-2 md:mr-3 text-blue-500 cursor-pointer"
                  />
                  <FaPencilAlt
                    onClick={() => navigate(`/edit-job/${job?.id}`)}
                    className="text-sm md:text-xl mr-2 md:mr-3 text-indigo-500 cursor-pointer"
                  />
                  <FaTrashAlt
                    onClick={() => {
                      setDeleteModal(true);
                      setJobToDelete(job);
                    }}
                    className="text-sm md:text-xl mr-2 md:mr-3 text-red-500 cursor-pointer"
                  />
                  {/* Action buttons go here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex  justify-center items-center mt-4 space-x-2">
        <span>Total: {tasks?.length}</span>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination  flex mx-auto px-3 gap-2 "}
          pageClassName={
            "px-3 py-2 border rounded-md  cursor-pointer transition-colors"
          }
          previousClassName={
            "px-3 py-2 border rounded-md cursor-pointer transition-colors "
          }
          nextClassName={
            "px-3 py-2 border rounded-md cursor-pointer transition-colors"
          }
          breakClassName={
            "px-3 py-2 border rounded-md cursor-pointer transition-colors hover:bg-indigo-500 hover:text-white"
          }
          disabledClassName={"bg-gray-500 text-white    "}
          activeClassName={"bg-indigo-500 text-white"}
        />
      </div>
    </div>
  );
};

export default JobTable;
