# GeoGlimpse Backend

## Architecture

*Note*: This section will be further developed as we discuss and adapt to future implementation decisions

<!-- TODO:  overall descriptions of code organization and tools and libraries used
 -->

This backend is dedicated to functionalities such as user authentication, 

The backend will serve as the engine of the system. It is dedicated to funcitonalities such as user authentication, document management, and logic. Data is managed througha robust database system, ensuring the secure storage and retrieval of negotiation records. For enhanced security, and to safeguard the sensitive information inherent in legal documents. the backend incorporates various encryption mechanisms. The backend is designed to scale appropriately to accomodate increased user load and data volume. Lastly, the backend is equipped with logging and monitoring systems, allowing for proactive issue identification nd resolution.



Assumed flow of data:
- User is created
- WHEN project is created, user selects a party and sends invites out to others
- user party proj created but there's an additional indicator to describe if they have accepted the invite or not
- once in project, can create a document without version
- then can add a version at which point it creates version and appends it to the array
- comments idk yet


## Setup

<!-- TODO: how to get the project dev environment up and running, npm install etc, all necessary commands needed, environment variables etc -->

*NOTE*: This section will also change as our project reaches new stages of development.

The backend and database setup involves deploying various technologies that will be determined at a later date.

## Deployment

<!-- TODO: how to deploy the project
 -->
Ultimately, this will integrate with the frontend to produce a web application that users can access via URL.

## Authors

The team is composed of five Dartmouth Seniors: Elizabeth Frey, Sydney Rosenbaum, Jack Gnibus, Josh Pfefferkorn, and Mikey Mauricio.

## Acknowledgments

We would like to thank Professor Tim Tregubov and Professor Natalie Svoboda for their help throughout all stages of the development process.

[File Upload Download `Multer` Tutorial](https://abbaslanbay.medium.com/uploading-files-to-aws-s3-with-multer-and-the-node-js-aws-sdk-7cad8dc87fc2)