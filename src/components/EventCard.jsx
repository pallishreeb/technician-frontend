/** @format */

import React from "react";

const EventCard = ({ taskDetails }) => {
  const getStatusColor = () => {
    switch (taskDetails.status) {
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

  return (
    <div className="bg-white   py-5 px-8   rounded-lg shadow-md transition-transform transform hover:scale-105">
      <h3 className="text-lg font-semibold">{taskDetails?.title}</h3>
      <div className=" text-gray-600 text-sm  my-2">
        <div className="flex items-center gap-2 mb-2">
          <p>Assigned to:</p>
          <p className="text-gray-700">{taskDetails?.technician_name}</p>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <p>Timeline : </p>
          <p className="text-red-600 gap-1">
            <span>{taskDetails?.timeline || "NA"} </span>
            <span> {taskDetails?.duetime || ""}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <p>Status : </p>
          <p className={` ${getStatusColor()} text-sm rounded-full py-1 px-3`}>
            {taskDetails.status || "NA"}
          </p>
        </div>
        <div className="flex  gap-2 mb-2">
          <p>Apartment: </p>
          <p className="text-gray-700 flex">
            {taskDetails?.apartment_name || "NA"},{" "}
            {taskDetails?.apartment_location || "NA"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
