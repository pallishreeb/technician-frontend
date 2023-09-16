import React ,{useState}from 'react'
import Calendar from '../components/Calender'
import EventCard from '../components/EventCard'
const Events = () => {
    const [events, setEvents] = useState([1,2,3,4,5])
  return (
    <div>
      <Calendar />
      <div className="container mx-auto py-8 w-full md:w-11/12 lg:w-10/12">
        <h1 className="text-2xl font-semibold mb-4 flex justify-center">
          Events Of The Selected Date
        </h1>
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
}

export default Events