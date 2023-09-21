/** @format */

import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames"; // You may need to install this package

const TechnicianSelect = ({ options, data, setData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle the dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle option selection
  const handleOptionClick = (option) => {
    setData(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="w-full rounded-md border border-gray-300 p-2 cursor-pointer"
        onClick={toggleDropdown}
      >
        {data ? data.name : "Select an option"}
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border rounded-b-md shadow-lg max-h-40 overflow-y-auto z-10">
          {options.map((option) => (
            <div
              key={option.id}
              className={classNames("p-2 cursor-pointer", {
                "bg-blue-100": option.id === data?.id,
              })}
              onClick={() => handleOptionClick(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TechnicianSelect;
