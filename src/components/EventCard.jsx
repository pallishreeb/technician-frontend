/** @format */

import React from "react";

const EventCard = ({ eventDetails }) => {
  // Determine the color class based on the status
  let statusColorClass = "text-indigo-500"; // Default color for status
  if (eventDetails.status === "In Progress") {
    statusColorClass = "text-yellow-500";
  } else if (eventDetails.status === "Completed") {
    statusColorClass = "text-green-500";
  } else if (eventDetails.status === "On Hold") {
    statusColorClass = "text-red-500";
  }
  return (
    <div className="bg-white   py-5 px-8   rounded-lg shadow-md transition-transform transform hover:scale-105  ">
      <h3 className="text-lg font-semibold">AC Service</h3>
      <div className=" text-gray-600 text-sm  my-2">
        <p className="mb-2 ">Assigned to: Sanjay Mehta</p>
        <p className="mb-2 text-red-500"> Due Date: 2009/23/34 </p>
        <p className={`font-semibold ${statusColorClass} text-sm`}>
          Status: Pending
        </p>
        <p className=" mb-2">Apartment Name:Apartment One </p>
      </div>
    </div>
  );
};

export default EventCard;
