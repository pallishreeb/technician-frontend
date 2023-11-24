/** @format */

import React, { useEffect, useState } from "react";
import Calendar from "../components/Calender";
import EventCard from "../components/EventCard";
import { filterBydates } from "../networkCalls";
import { useAuthApi } from "../context/authContext/authProvider";
import { toast } from "react-toastify";
import { format } from "date-fns";
import nodata from "../assets/nodata.png";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
const Events = () => {
  const { state: authState } = useAuthApi();
  const [tasksOfSelectedDate, setTasksOfSelectedDate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [calenderLoading, setCalenderLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState(null);
  useEffect(() => {
    if(error === 401){
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [error]);
useEffect(() => {
  const filterTasksByDate = (date) => {
    setLoading(true);
    filterBydates(date, authState?.token)
      .then((res) => {
        const sortByDueTime = (a, b) => {
          const parseTime = (timeString) => {
            const [hours, minutes, period] = timeString
              .match(/(\d+):(\d+) (\w+)/)
              .slice(1);
            const totalMinutes =
              ((parseInt(hours) % 12) +
                (period.toLowerCase() === "pm" ? 12 : 0)) *
                60 +
              parseInt(minutes);

            return {
              totalMinutes,
              period,
            };
          };

          const timeA = parseTime(a.duetime);
          const timeB = parseTime(b.duetime);

          if (timeA.period !== timeB.period) {
            return timeA.period.localeCompare(timeB.period);
          }

          return timeA.totalMinutes - timeB.totalMinutes;
        };

        const sortedData = res.data.sort(sortByDueTime);

        setTasksOfSelectedDate(sortedData);
        console.log(sortedData);
        setLoading(false);
      })
      .catch((error) => {
        if(error?.response?.status === 401){
          setError(401)
          setLoading(false);
        }else{
          toast.error(
            error?.response?.data?.message ||
              "Something Went Wrong, Please Try Later"
          );
          setLoading(false);
        }
   
      });
  };

  if (selectedDate) {
    const formattedDate = format(selectedDate, "dd-MM-yyyy");
    filterTasksByDate(formattedDate);
  }
}, [selectedDate]);




  return (
    <div>
      <div className="flex items-center justify-center mb-4">
        <div className="legend-item flex flex-col items-center justify-center md:px-3">
          <div className="legend-color bg-purple-500 w-4 h-4 border border-gray-300"></div>
          <div className="legend-text">Current Date</div>
        </div>
        <div className="legend-item flex flex-col items-center justify-center md:px-3">
          <div className="legend-color bg-red-500 w-4 h-4 border border-gray-300"></div>
          <div className="legend-text">Selected Date</div>
        </div>
        <div className="legend-item flex flex-col items-center justify-center md:px-3">
          <div className="legend-color bg-indigo-300 w-4 h-4 border border-gray-300"></div>
          <div className="legend-text">Past Event Date</div>
        </div>
        <div className="legend-item flex flex-col items-center justify-center md:px-3">
          <div className="legend-color bg-indigo-700 w-4 h-4 border border-gray-300"></div>
          <div className="legend-text">Future Event Date</div>
        </div>
      </div>

      <Calendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        loading={calenderLoading}
        setLoading={setCalenderLoading}
      />
      <div className="container mx-auto py-8 w-full md:w-11/12 lg:w-10/12">
        <h2 className="text-xl font-semibold mb-4 flex justify-center">
          Tasks Of The Selected Date
        </h2>
        {loading === true ? (
          <div className=" relative flex justify-center items-center mt-4">
            <FaSpinner className="w-1/6 h-1/6 animate-spin text-purple-500" />
          </div>
        ) : tasksOfSelectedDate.length === 0 ? (
          <div className="flex justify-center items-center">
            <img src={nodata} alt="404" className="w-2/6 h-2/6" />
          </div>
        ) : (
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
            {/* Map through eventsData and render event cards */}
            {tasksOfSelectedDate.map((taskOfSelectedDate, index) => (
              <Link to={`/job/${taskOfSelectedDate.id}`}>
                <EventCard taskDetails={taskOfSelectedDate} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
