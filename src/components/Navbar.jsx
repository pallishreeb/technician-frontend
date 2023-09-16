/** @format */

import React, { useState } from "react";
import { FaBars, FaTimes, FaBriefcase, FaUsers,  FaHome, FaSignOutAlt, FaCalendarAlt, FaCalendar } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {LOGOUT} from "../context/constansts"
import {useAuthApi} from "../context/authContext/authProvider"
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const {dispatch} = useAuthApi()
  const location = useLocation();
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
     dispatch({type:LOGOUT})
     navigate("/")
  }


  return (
    <nav className=" w-full bg-white   py-4 mb-5 border-b-2 ">
      <div className="container text-indigo-700 mx-auto px-4  lg:flex lg:justify-between lg:items-center">
        <div className="flex items-center justify-between">
          <Link to={"/"}>
            <div
              className={`text-xl md:text-2xl uppercase font-bold ${
                isOpen ? " hidden lg:block" : ""
              }`}
            >
              Technician
            </div>
          </Link>
          <div></div>
          <button className=" lg:hidden" onClick={toggleNavbar}>
            {isOpen ? (
              <FaTimes size={24} className="text-indigo-700" />
            ) : (
              <FaBars size={24} className="text-indigo-700" />
            )}
          </button>
        </div>

        <div className="  lg:flex lg:justify-between  menu space-x-4 hidden mt-2  font-semibold ">
          <ul className="flex items-center space-x-10   ">
            <Link to={"/"}>
              {" "}
              <li
                className={` cursor-pointer flex  gap-1 items-center  ${
                  location.pathname === "/" ? "active-menu" : ""
                }`}
              >
                <FaBriefcase className="text-xl" /> <span>Jobs</span>
              </li>
            </Link>
            <Link to={"/technicians"}>
              <li
                className={` cursor-pointer flex  gap-1 items-center  ${
                  location.pathname === "/technicians" ? "active-menu" : ""
                }`}
              >
                <FaUsers className="text-xl" /> <span> Technicians</span>
              </li>
            </Link>

            <Link to={"/apartments"}>
              <li
                className={` cursor-pointer flex  gap-1 items-center  ${
                  location.pathname === "/apartments" ? "active-menu" : ""
                }`}
              >
                <FaHome className="text-xl" /> <span>Apartments</span>
              </li>
            </Link>
            <Link to={"/events"}>
              <li
                className={` cursor-pointer flex  gap-1 items-center  ${
                  location.pathname === "/events" ? "active-menu" : ""
                }`}
              >
                <FaCalendarAlt className="text-xl" /> <span>Events</span>
              </li>
            </Link>
            <li
              className=" cursor-pointer flex items-center gap-1   "
              onClick={() => logout()}
            >
              <FaSignOutAlt className="" /> Logout
            </li>
          </ul>
        </div>

        {isOpen && (
          <div className=" menu lg:hidden  font-semibold mt-2">
            <ul>
              <Link to={"/"}>
                {" "}
                <li
                  className={`py-3 px-4 cursor-pointer  flex gap-4  items-center ${
                    location.pathname === "/" ? "active-menu" : ""
                  }`}
                >
                  <FaBriefcase className="text-2xl" /> <span>Jobs</span>
                </li>{" "}
              </Link>
              <Link to={"/technicians"}>
                <li
                  className={` py-3 px-4 cursor-pointer flex  gap-4 items-center ${
                    location.pathname === "/technicians" ? "active-menu" : ""
                  }`}
                >
                  <FaUsers className="text-2xl" /> <span> Technicians</span>
                </li>
              </Link>

              <Link to={"/apartments"}>
                <li
                  className={`py-3 px-4 cursor-pointer flex gap-4 items-center ${
                    location.pathname === "/apartments" ? "active-menu" : ""
                  }`}
                >
                  <FaHome className="text-2xl" /> <span>Apartments</span>
                </li>
              </Link>
              <Link to={"/events"}>
                <li
                  className={` py-3 px-4 cursor-pointer flex gap-4 items-center  ${
                    location.pathname === "/events" ? "active-menu" : ""
                  }`}
                >
                  <FaCalendarAlt className="text-xl" /> <span>Events</span>
                </li>
              </Link>
              <li
                className={`py-3 px-4 cursor-pointer flex gap-4 items-center`}
                onClick={() => logout()}
              >
                <FaSignOutAlt className="text-2xl" /> Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
