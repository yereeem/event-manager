import React, { useState } from "react";
import axios from "axios";

import "./EventForm.css";

function EventForm({ onEventCreated }) {
  // State hooks for managing form visibility, form data, and errors
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startdate: "",
    enddate: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    description: false,
    startdate: false,
    enddate: false,
  });

  // method to toggle form visibility.
  const toggleForm = () => {
    setShowForm(!showForm);
    if (showForm) {
      // Clear form data when closing the form (hitting cancel)
      setFormData({
        name: "",
        description: "",
        startdate: "",
        enddate: "",
      });
      setErrors({
        name: false,
        description: false,
        startdate: false,
        enddate: false,
      });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const formErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      // if any of the form elements were left empty, show "Required" method.
      if (value.trim() === "") {
        formErrors[key] = "Required";
      } else if (key === "startdate" || key === "enddate") {
        // Validate date format
        const validFormat =
          /^[0-9]{4}-((0[1-9])|(1[0-2]))-((0[1-9])|([12][0-9])|(3[01])) (([01][0-9])|(2[0-3])):([0-5][0-9])$/.test(
            value
          );
        // if the date format is invalid, show invalid format message.
        if (!validFormat) {
          formErrors[key] = "Invalid format (yyyy-mm-dd hh:mm)";
        }
      }
    });
    setErrors(formErrors);

    // Check if any field is empty or has invalid format
    const hasErrors = Object.values(formErrors).some((error) => error);
    if (hasErrors) {
      return;
    }

    try {
      // Submit form data in json format.
      const response = await axios.post(
        "http://localhost:3000/events",
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Event created: ", formData);
      onEventCreated();
      // Reset form data and errors after submitting the event
      setFormData({
        name: "",
        description: "",
        startdate: "",
        enddate: "",
      });
      setErrors({
        name: false,
        description: false,
        startdate: false,
        enddate: false,
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error creating event: ", error);
      console.log(formData);
    }
  };

  // render the EventFrom componenet.
  return (
    <>
      <button className="create-event-button" onClick={toggleForm}>
        {showForm ? "Cancel" : "Create Event"}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <h2>Create an Event</h2>
          {Object.entries(formData).map(([key, value]) => (
            <div className="input-container" key={key}>
              <label htmlFor={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
              </label>
              <input
                type="text"
                name={key}
                id={key}
                placeholder={`Enter ${
                  key === "startdate"
                    ? "startdate yyyy-mm-dd hh:mm"
                    : key === "enddate"
                    ? "enddate yyyy-mm-dd hh:mm"
                    : key
                }`}
                value={value}
                onChange={handleChange}
              />
              {errors[key] && (
                <span style={{ color: "red", marginLeft: "5px" }}>
                  {errors[key]}
                </span>
              )}
            </div>
          ))}
          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      )}
    </>
  );
}

// export EventForm component.
export default EventForm;
