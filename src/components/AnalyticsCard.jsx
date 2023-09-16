/** @format */

import React from "react";
import { FaBriefcase, FaUsers, FaTasks, FaCheckCircle } from "react-icons/fa"; // Importing SVG icons
const AnalyticsCard = ({ data, title, color }) => {
  const icon = () => {
    if (title === "Total Jobs")
      return <FaBriefcase className={`text-2xl md:text-4xl ${color} mb-4`} />;
    if (title === "Total Technicians")
      return <FaUsers className={`text-2xl md:text-4xl ${color} mb-4`} />;
    if (title === "Total Assignments")
      return <FaTasks className={`text-2xl md:text-4xl ${color} mb-4`} />;
    if (title === "Total Completed")
      return <FaCheckCircle className={`text-2xl md:text-4xl ${color} mb-4`} />;
  };
  return (
    <div className="bg-white p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform flex flex-col items-center justify-center">
      {icon()}
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-2xl md:text-3xl font-bold">{data}</p>
    </div>
  );
};

export default AnalyticsCard;
