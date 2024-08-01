const db = require("./db");
const cors = require("cors");
const express = require("express");
const events = require("./resources/event");
const path = require("path");

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// for posting
app.use(express.json());

// route to create (post) an event
app.post("/events", events.createEvent);

// route to get all events in the database.
app.get("/events", events.getAllEvents);

// route to get an event by its id from the database.
app.get("/events/:id", events.getEventById);

// route to get an event by name from the database
app.get("/events/by-name/:name", events.getEventByName);

// route to update a parameter value of an event by its id.
app.put("/events/:id", events.updateEventById);

// route to delete a specifc event by its id.
app.delete("/events/:id", events.deleteEventById);

// route to delete all events.
app.delete("/events", events.deleteAllEvents);

// start the server and listen on the specified port.
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
