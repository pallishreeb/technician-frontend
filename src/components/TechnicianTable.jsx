/** @format */

import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import {
  FaPencilAlt,
  FaTrashAlt,
  FaEye,
  FaEyeSlash,
  FaSpinner,
} from "react-icons/fa";
import { GET_TECHNICIANS } from "../context/constansts";
import { useTaskApi } from "../context/taskContext/taskProvider";
import { getAllTechnicians } from "../networkCalls";
import { toast } from "react-toastify";
import { useAuthApi } from "../context/authContext/authProvider";

const TechnicianTable = ({
  setDeleteModal,
  setModal,
  setTechnicianToUpdate,
  setTechnicianToDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showPassword, setShowPassword] = useState(null);
  const { dispatch, state } = useTaskApi();
  const { state: authState } = useAuthApi();
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

  useEffect(() => {
    getTechnicians();
  }, [state.technicians.length]);

  // Pagination configuration
  const perPage = 10; // Number of items per page

  const pageCount = Math.ceil(state.technicians.length / perPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  //password visibility
  function maskPassword(id, password, showPassword) {
    if (showPassword === id) {
      return password;
    } else {
      const dotString = "*".repeat(password.length);
      return dotString;
    }
  }

  // Calculate the current page's data
  const offset = currentPage * perPage;
  const currentPageData = state.technicians?.slice(offset, offset + perPage);
  if (currentPageData.length === 0)
    return (
      <div class=" relative flex justify-center items-center mt-4">
        <FaSpinner className="w-1/6 h-1/6 animate-spin text-purple-500" />
      </div>
    );
  return (
    <div className="container mx-auto mt-8">
      <div className="w-full overflow-x-scroll shadow-md rounded">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr className="bg-gray-200 text-indigo-600 uppercase text-sm leading-normal">
              <th className="py-2 px-2 md:py-3 md:px-6 text-xs md:text-base text-left whitespace-nowrap uppercase font-semibold ">
                Technicians Name
              </th>
              <th className="py-2 px-2 md:py-3 md:px-6 text-xs md:md:text-base text-left whitespace-nowrap uppercase font-semibold ">
                Email
              </th>
              <th className="py-2 px-2 md:py-3 md:px-6 text-xs md:md:text-base text-left whitespace-nowrap uppercase font-semibold ">
                Password
              </th>

              <th className="py-2 px-2 md:py-3 md:px-6 text-xs md:md:text-base text-left whitespace-nowrap uppercase font-semibold ">
                Edit
              </th>
              <th className="py-2 px-2 md:py-3 md:px-6 text-xs md:md:text-base text-left whitespace-nowrap uppercase font-semibold ">
                Delete
              </th>
            </tr>
          </thead>

          <tbody>
            {currentPageData &&
              currentPageData.map((technician) => (
                <tr
                  key={technician.id}
                  className="border-b hover:bg-gray-100 transition-all ease-in-out duration-300 text-black font-medium "
                >
                  <td className="py-2 px-2 md:py-3 md:px-6 text-xs md:text-sm text-left whitespace-nowrap">
                    {technician.name}
                  </td>
                  <td className="py-2 px-2 md:py-3 md:px-6 text-xs md:text-sm text-left whitespace-nowrap">
                    {technician.email}
                  </td>
                  <td className="py-2 px-2 md:py-3 md:px-6 text-xs md:text-sm text-left whitespace-nowrap ">
                    <div className=" flex items-center gap-2">
                      {maskPassword(
                        technician.id,
                        technician.password,
                        showPassword
                      )}
                      {showPassword !== technician.id ? (
                        <FaEye
                          className="text-indigo-600 text-sm md:text-l"
                          onClick={() => setShowPassword(technician.id)}
                        />
                      ) : (
                        <FaEyeSlash
                          className="text-purple-600 text-sm md:text-l"
                          onClick={() => setShowPassword(null)}
                        />
                      )}
                    </div>
                  </td>

                  <td className="py-2  px-2 md:py-3 md:px-6 text-xs md:text-sm text-left whitespace-nowrap">
                    <FaPencilAlt
                      onClick={() => {
                        setModal(true);
                        setTechnicianToUpdate(technician);
                      }}
                      className="text-sm md:text-xl mr-2 md:mr-3 text-indigo-500"
                    />
                  </td>
                  <td className="py-2  px-2 md:py-3 md:px-6 text-xs md:text-sm text-left whitespace-nowrap">
                    <FaTrashAlt
                      onClick={() => {
                        setDeleteModal(true);
                        setTechnicianToDelete(technician);
                      }}
                      className="text-sm md:text-xl mr-2 md:mr-3 text-red-500"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex  justify-center items-center mt-4 space-x-2">
        <>
          <span>
            Total:
            {state?.technicians?.length}
          </span>
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
        </>
      </div>
    </div>
  );
};

export default TechnicianTable;
