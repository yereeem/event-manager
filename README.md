# event-manager and event-api

The event manager web application allows users to get, post, delete, and search a database of events via an event-api.

## Pre-requisites

At this moment, both the web application and the event-api requires xampp SQL and Apache services to run. The API also requires the user to create a database called "compx322" (which can be reconfigured as suited), and set up the database with the EventsDatabase.sql file provided in the event-api-assn3 folder within the repository.

The user must also have node, and npm installed.

The user should use 2 terminals -- 1 to run the API, and 1 to run the web application.

### Running event-api

cd event-api-assn3
npm install
node app.js

### Running event-manager web application

cd event-manager-assn4
npm install
npm run dev
