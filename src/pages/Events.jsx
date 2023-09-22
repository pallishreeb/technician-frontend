/** @format */

import React, { useState } from "react";
import Calendar from "../components/Calender";
import EventCard from "../components/EventCard";
const Events = () => {
  const [events, setEvents] = useState([1, 2, 3, 4, 5]);
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

      <Calendar />
      <div className="container mx-auto py-8 w-full md:w-11/12 lg:w-10/12">
        <h2 className="text-xl font-semibold mb-4 flex justify-center">
          Events Of The Selected Date
        </h2>
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Map through eventsData and render event cards */}
          {events.map((event, index) => (
            <div
              key={index}
              className=" flex justify-center" // Center the event card on small screens
            >
              <EventCard eventDetails={event} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
