/** @format */

import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";

const Calendar = () => {
  const events = [
    {
      id: 1,
      date: "2023-09-10", // Replace with your event dates
      name: "Event 1",
      details: "Event 1 details",
    },
    {
      id: 2,
      date: "2023-09-15",
      name: "Event 2",
      details: "Event 2 details",
    },
    {
      id: 3,
      date: "2023-10-12",
      name: "Birthday",
      details: "Happy birthday!",
    },
    // Add more event data as needed
  ];
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with the current date

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

  const isSameDate = (eventDate, currentDate) => {
    return (
      eventDate.getDate() === currentDate.getDate() &&
      eventDate.getMonth() === currentDate.getMonth() &&
      eventDate.getFullYear() === currentDate.getFullYear()
    );
  };

  const handleDateClick = (date) => {
    // Check if the clicked date has an event
    if (events.some((event) => isSameDate(new Date(event.date), date))) {
      setSelectedDate(date);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4 md:relative md:top-7  w-full md:w-5/6 lg:w-4/6 mx-auto">
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
        {daysInMonth.map((date) => {
          const eventDates = events.map((event) => new Date(event.date));
          const formattedDate = format(date, "yyyy-MM-dd");

          let dateClasses =
            "p-2 border border-gray-200 rounded shadow cursor-pointer";

          if (isSameDate(date, currentDate)) {
            dateClasses += " bg-purple-500"; // Current date
          } else if (
            eventDates.some((eventDate) => isSameDate(eventDate, date))
          ) {
            const eventDate = new Date(
              events.find((event) =>
                isSameDate(new Date(event.date), date)
              ).date
            );
            if (eventDate > currentDate) {
              dateClasses += " bg-indigo-500"; // Future date with events
            } else {
              dateClasses += " bg-indigo-500"; // Past date with events
            }
          }

          if (isSameDate(date, selectedDate)) {
            dateClasses += " border-red-500"; // Selected date
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
