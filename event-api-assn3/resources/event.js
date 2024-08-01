// Your events.js file should require the database connection, define the event
// model and handler functions, then export them using CommonJS syntax.

const db = require('../db');

const Event = function(data) {
    //this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.startdate = data.startdate;
    this.enddate = data.enddate;
}

// Handler to create an event and save it to the database.
const createEvent = (req, res) => {
    // if no content in request body, send status code 400Bad request, and a message.
    if (!req.body){
        console.log("No body content");
        return res.status(400).send({message: '400 Bad Request: Content cannot be empty'});
    }
    const newEvent = new Event(req.body);
    db.query('INSERT INTO events SET ?', newEvent, (err, results) =>{
        if (err){
            res.status(500).send('500 Server error: An error has occurred while creating an event');
            console.log(err);
        }
        res.send({id: results.insertId, ...newEvent});
    });
};

// Handler to get all events
const getAllEvents = (req, res) => {
    // Query to fetch all events from the database
    db.query('SELECT * FROM events', (err, results) => {
        if (err) {
            console.error('Error retrieving events:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(results); // Send the events as JSON response
        }
    });
};

// Handler to get an event by its ID.
const getEventById = (req, res) => {
    // Query to fetch the event with a specific id from the database.
    db.query('SELECT * FROM events WHERE id = ?', req.params.id, (err, results) => {
        if (err) {
            console.error('Error retrieving events:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(results); // Send the events as JSON response
        }
    });
};

// Handler to get an event by its Name.
const getEventByName = (req, res) => {
    // Query to fetch the event with a specific name from the database.
    db.query('SELECT * FROM events WHERE name = ?', req.params.name, (err, results) => {
        if (err) {
            console.error('Error retrieving events:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(results); // Send the events as JSON response
        }
    });
};

// Handler to update an event by it's id.
const updateEventById = (req, res) => {
    // if nothign in the request body, send a 400 Bad Request status code.
    if (!req.body){
        return res.status(400).send({message: '400 Bad Request: Content cannot be empty'});
    }
    const newEvent = new Event(req.body);
    db.query('UPDATE events SET ? WHERE id = ?', [newEvent, req.params.id], (err, results) =>{
        if (err){
            res.status(500).send('An error has occurred while creating an event');
        }
        res.send({id: req.params.id, ...newEvent});
    });
};

// Handler to delete an event by its id from the database.
const deleteEventById = (req, res) => {
    // Query to delete an event by ids id
    db.query('DELETE FROM events WHERE id = ?', req.params.id, (err, results) => {
        if (err){
            console.error('Error deleting event: ', err);
            res.status(500).send('500: Internal server error');
        }
        else{
            // if no rows were deleted, then that id must not have existed.
            if (results.affectedRows === 0){
                // 
                res.status(404).send('404 Not Found: Event not found');
            }
            else{
                // else if deleted successfully, send a 204 status code with no content.
                res.status(204).send('204 No Content: Event successfully deleted');
            }
        }
    });
}

// Handler to delete all events in the database.
const deleteAllEvents = (req, res) => {
    // Query to delete an event by ids id
    db.query('DELETE FROM events', (err, results) => {
        if (err){
            console.error('Error deleting events: ', err);
            res.status(500).send('500: Internal server error');
        }
        else{
            // if no rows were deleted, then there were no events existing in the first place.
            if (results.affectedRows === 0){
                // 
                res.status(404).send('404 Not Found: Event not found');
            }
            else{
                // else if deleted successfully, send a 204 status code with no content.
                res.status(204).send('204 No Content: All Events successfully deleted');
            }
        }
    });
}

module.exports = {
    Event,
    createEvent,
    getAllEvents,
    getEventById,
    getEventByName,
    updateEventById,
    deleteEventById,
    deleteAllEvents
}