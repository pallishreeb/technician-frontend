/** @format */

import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { FaPencilAlt, FaTrash, FaTrashAlt } from "react-icons/fa";

const JobTable = ({ setDeleteModal, setModal }) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Pagination configuration
  const perPage = 10; // Number of items per page
  const data = [
    {
      title: "Fix Broken Faucet",
      technician: "John Doe",
      apartment: "Sunny View Apartments",
      timeline: "2023-09-15",
      status: "Pending",
    },
    {
      title: "Replace Light Bulbs",
      technician: "Jane Smith",
      apartment: "Green Valley Residences",
      timeline: "2023-09-16",
      status: "In Progress",
    },
    {
      title: "Paint Living Room",
      technician: "David Johnson",
      apartment: "Ocean Breeze Towers",
      timeline: "2023-09-17",
      status: "Completed",
    },
    {
      title: "Fix Leaky Roof",
      technician: "Sarah Brown",
      apartment: "Mountain View Estates",
      timeline: "2023-09-18",
      status: "Pending",
    },
    {
      title: "Clean Pool Area",
      technician: "Michael Wilson",
      apartment: "Lakeside Manor",
      timeline: "2023-09-19",
      status: "In Progress",
    },
    {
      title: "Repair Elevator",
      technician: "Emily Davis",
      apartment: "Urban Heights Apartments",
      timeline: "2023-09-20",
      status: "Pending",
    },
    {
      title: "Landscaping Work",
      technician: "Robert Lee",
      apartment: "Garden Grove Apartments",
      timeline: "2023-09-21",
      status: "In Progress",
    },
    {
      title: "Fix HVAC System",
      technician: "Jennifer Clark",
      apartment: "Riverside Residences",
      timeline: "2023-09-22",
      status: "Pending",
    },
    {
      title: "Apartment Inspection",
      technician: "Christopher Baker",
      apartment: "Hilltop Haven",
      timeline: "2023-09-23",
      status: "Completed",
    },
    {
      title: "Security System Check",
      technician: "Maria Martinez",
      apartment: "Parkside Place Apartments",
      timeline: "2023-09-24",
      status: "In Progress",
    },
    {
      title: "Fix Plumbing Issues",
      technician: "John Doe",
      apartment: "Harbor View Towers",
      timeline: "2023-09-25",
      status: "Pending",
    },
    {
      title: "Install Fire Alarms",
      technician: "Jane Smith",
      apartment: "Sunset Terrace Apartments",
      timeline: "2023-09-26",
      status: "In Progress",
    },
    {
      title: "Replace Flooring",
      technician: "David Johnson",
      apartment: "Pineside Apartments",
      timeline: "2023-09-27",
      status: "Completed",
    },
    {
      title: "Roof Inspection",
      technician: "Sarah Brown",
      apartment: "Serenity Springs Apartments",
      timeline: "2023-09-28",
      status: "In Progress",
    },
    {
      title: "Electrical Repairs",
      technician: "Michael Wilson",
      apartment: "Sunny View Apartments",
      timeline: "2023-09-29",
      status: "Pending",
    },
  ];
; // Replace with your data

  const pageCount = Math.ceil(data.length / perPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Calculate the current page's data
  const offset = currentPage * perPage;
  const currentPageData = data.slice(offset, offset + perPage);
  return (
    <div className="container mx-auto mt-8">
      <div className="w-full overflow-x-scroll shadow-md rounded">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200 text-indigo-600 uppercase text-sm leading-normal">
              <th className="py-2 px-2 md:py-3 md:px-6 text-xs md:text-base text-left whitespace-nowrap uppercase font-semibold">
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
                key={job.id}
                className="border-b hover:bg-gray-100 transition-all ease-in-out duration-300"
              >
                <td className="py-2 px-2 md:py-3 md:px-6 text-xs md:text-sm text-left whitespace-nowrap">
                  {job.title}
                </td>
                <td className="py-2 px-2 md:py-3 md:px-6 text-xs md:text-sm text-left whitespace-nowrap">
                  {job.technician}
                </td>
                <td className="py-2 px-2 md:py-3 md:px-6 text-xs md:text-sm text-left whitespace-nowrap">
                  {job.apartment}
                </td>
                <td className="py-2 px-2 md:py-3 md:px-6 text-xs md:text-sm text-left whitespace-nowrap">
                  {job.timeline}
                </td>
                <td className="py-2 px-2 md:py-3 md:px-6 text-xs md:text-sm text-left whitespace-nowrap">
                  <span
                    className={`rounded-full py-1 px-3 ${
                      job.status === "In Progress"
                        ? "bg-yellow-500 text-white"
                        : job.status === "Completed"
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="py-2 flex flex-row px-2 md:py-3 md:px-6 text-xs md:text-sm text-left whitespace-nowrap">
                  <FaPencilAlt
                    onClick={() => setModal(true)}
                    className="text-sm md:text-xl mr-2 md:mr-3 text-indigo-500"
                  />
                  <FaTrashAlt
                    onClick={() => setDeleteModal(true)}
                    className="text-sm md:text-xl mr-2 md:mr-3 text-red-500"
                  />
                  {/* Action buttons go here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex  justify-center items-center mt-4 space-x-2">
        <span>Total: 2</span>
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
