import React from "react";
import "./EventItem.css";

function EventItem({ event, onDelete }) {
  // destructur event object.
  const { id, name, description, startdate, enddate } = event;

  // method to delete an event
  const handleDelete = () => {
    onDelete(id); // call the onDelete fucntion passed as a prop.
  };

  // render EventItem component.
  return (
    <div className="event-item">
      <p className="item-attributes">{name}</p>
      <p className="item-attributes">{description}</p>
      <p className="item-attributes">{startdate}</p>
      <p className="item-attributes">{enddate}</p>
      <button onClick={handleDelete}>X</button>
    </div>
  );
}

// Export the EventItem component
export default EventItem;
