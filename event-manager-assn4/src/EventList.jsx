// Import necessary modules and components.
import React, { useState, useEffect } from "react";
import axios from "axios";
import EventForm from "./EventForm";
import EventFilterButton from "./EventFilterButton";
import SearchBar from "./SearchBar";
import "./EventList.css";

function EventList() {
  // State hooks for managing events, sorted events, sort order, search value, and open accordion index
  const [events, setEvents] = useState([]);
  const [sortedEvents, setSortedEvents] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [reducedMotion, setReducedMotion] = useState(false); // For reduced motion
  const [openIndex, setOpenIndex] = useState(0); // Index of the open accordion item

  // Fetch events from the server when the component mounts.
  useEffect(() => {
    getEvents();
  }, []);

  // Check if the user prefers reduced motion.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleChange = (event) => setReducedMotion(event.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Sort events whenever sortOrder changes.
  useEffect(() => {
    sortEvents(sortOrder, events);
  }, [sortOrder, events]);

  // Filter events based on search value.
  useEffect(() => {
    handleSearch(search);
  }, [search, sortOrder, events]);

  // Method to fetch events from the server.
  const getEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };

  // Method to delete an event.
  const deleteEvent = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/events/${id}`);
      setEvents(events.filter((event) => event.id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // Method to sort events based on start date.
  const sortEvents = (order, eventsToSort) => {
    const sorted = [...eventsToSort].sort((a, b) => {
      const dateA = new Date(a.startdate.replace(" ", "T"));
      const dateB = new Date(b.startdate.replace(" ", "T"));
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
    setSortedEvents(sorted);
  };

  // Method to handle search.
  const handleSearch = (value) => {
    const searchValue = value.toLowerCase();
    setSearch(searchValue);
    if (searchValue === "") {
      sortEvents(sortOrder, events);
    } else {
      const filteredEvents = events.filter((event) =>
        event.name.toLowerCase().includes(searchValue)
      );
      sortEvents(sortOrder, filteredEvents);
    }
  };

  // Method to toggle accordion item
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index); // Toggle the index or close if same
  };

  // Render the EventList component.
  return (
    <>
      <div className="event-body">
        <div className="buttons-search">
          <div style={{ margin: "10px" }}>
            <EventForm onEventCreated={getEvents} />
          </div>
          <div style={{ margin: "10px" }}>
            <EventFilterButton onSort={setSortOrder} />
          </div>
          <SearchBar search={search} onSearch={handleSearch} />
        </div>
        <div className="accordion">
          {sortedEvents.map((event, index) => (
            <div className="accordion-item" key={event.id}>
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className={`accordion-button ${
                    openIndex === index ? "" : "collapsed"
                  }`}
                  type="button"
                  onClick={() => handleToggle(index)}
                  aria-expanded={openIndex === index ? "true" : "false"}
                  aria-controls={`collapse${index}`}
                >
                  {event.name}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className={`accordion-collapse collapse ${
                  openIndex === index ? "show" : ""
                }`}
                aria-labelledby={`heading${index}`}
              >
                <div className="accordion-body">
                  <p>{event.description}</p>
                  <p>
                    <strong>Start Date:</strong> {event.startdate}
                  </p>
                  <p>
                    <strong>End Date:</strong> {event.enddate}
                  </p>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteEvent(event.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Export the EventList component.
export default EventList;
