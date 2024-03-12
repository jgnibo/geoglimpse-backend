# GeoGlimpse Backend

## Architecture


<!-- TODO:  overall descriptions of code organization and tools and libraries used
 -->

This backend is dedicated to functionalities such as user authentication, location processing, and general database logic. The backend is designed to scale appropriately to accomodate increased user load and data volume. Lastly, the backend is equipped with logging and monitoring systems, allowing for proactive issue identification nd resolution.


General data flow
- User is created
- User connects via app, opens websocket to broadcast location data
- Backend handles websocket connection and location data processing
- Endpoints also handle various API requests from web and mobile clients


## Setup

<!-- TODO: how to get the project dev environment up and running, npm install etc, all necessary commands needed, environment variables etc -->

*NOTE*: This section will also change as our project reaches new stages of development.

The backend and database setup involves deploying various technologies that will be determined at a later date.

## Deployment

<!-- TODO: how to deploy the project
 -->
Ultimately, this will integrate with the frontend to produce web and mobile applications that users can access via URL.

## Authors

This project was developed by Josh Pfefferkorn and Jack Gnibus.

## Acknowledgments

We would like to thank Professor Luis Alvarez Leon for his help refining this idea.