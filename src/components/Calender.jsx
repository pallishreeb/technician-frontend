/** @format */

import React, { useState, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  parse,
  getDay, // Import startOfWeek
} from "date-fns";
import { FaSpinner } from "react-icons/fa";
import { useTaskApi } from "../context/taskContext/taskProvider";
import { useAuthApi } from "../context/authContext/authProvider";
import { getAllJobs } from "../networkCalls";
import { GET_TASKS } from "../context/constansts";
import { toast } from "react-toastify";
const Calendar = ({ selectedDate, setSelectedDate,loading,setLoading }) => {
  const { state: taskState, dispatch } = useTaskApi();
  const { tasks } = taskState;
  const { state: authState } = useAuthApi();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // const [loading, setLoading] = useState(false);

  const getTasks = async () => {
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
  useEffect(() => {
    getTasks();
  }, []);

  // Initialize with the current date
  const goToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const currentDate = new Date();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDayOfWeek = getDay(monthStart);

  const isSameDate = (eventDate, currentDate) => {
    return (
      eventDate.getDate() === currentDate.getDate() &&
      eventDate.getMonth() === currentDate.getMonth() &&
      eventDate.getFullYear() === currentDate.getFullYear()
    );
  };

  const handleDateClick = (date) => {
    // Check if the clicked date has an event
    if (
      tasks.some((task) => {
        const taskDate = parse(task.timeline, "dd-MM-yyyy", new Date());
        return isSameDate(taskDate, date);
      })
    ) {
      setSelectedDate(date);
    }
  };
  if (loading === true)
    return (
      <div class=" relative flex justify-center items-center mt-4">
        <FaSpinner className="w-1/6 h-1/6 animate-spin text-purple-500" />
      </div>
    );
  return (
    <div className="bg-white p-4 rounded shadow mb-4 md:relative md:top-7 w-full md:w-5/6 lg:w-4/6 mx-auto">
      <div className="flex justify-between items-center mt-2">
        <button onClick={goToPreviousMonth} className="text-gray-600">
          &lt; Previous Month
        </button>
        <h2 className="text-lg font-semibold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button onClick={goToNextMonth} className="text-gray-600">
          Next Month &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-semibold text-gray-700">
            {day}
          </div>
        ))}
        {/* Fill in empty cells to match the start day of the week */}
        {Array.from({ length: startDayOfWeek }, (_, index) => (
          <div key={`empty-${index}`} className="text-center"></div>
        ))}
        {daysInMonth.map((date) => {
          const formattedDate = format(date, "dd-MM-yyyy");

          let dateClasses =
            "p-2 border border-gray-200 rounded shadow cursor-pointer";

          if (isSameDate(date, currentDate)) {
            dateClasses += " bg-purple-400"; // Current date
          } else if (
            tasks.some((task) => {
              const taskDate = parse(task.timeline, "dd-MM-yyyy", new Date());
              return isSameDate(taskDate, date);
            })
          ) {
            const task = tasks.find((task) => {
              const taskDate = parse(task.timeline, "dd-MM-yyyy", new Date());
              return isSameDate(taskDate, date);
            });
            const taskDate = parse(task.timeline, "dd-MM-yyyy", new Date());
            if (taskDate > currentDate) {
              dateClasses += " text-white bg-indigo-700"; // Future date with events
            } else {
              dateClasses += " bg-indigo-400"; // Past date with events
            }
          }

          if (isSameDate(date, selectedDate)) {
            dateClasses += " border-red-800 text-white bg-red-700"; // Selected date
          }

          return (
            <div
              key={formattedDate}
              className={dateClasses}
              onClick={() => handleDateClick(date)}
            >
              <div className="text-sm font-medium">{format(date, "dd")}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
