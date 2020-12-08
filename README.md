# Ducky
A simple full-stack web application that allows farmers to record duck feeding activities and scientists to track the activity

## Demo 
https://afternoon-beyond-07191.herokuapp.com/

## Technology Stack
*Ducky* is built using MERN stack(MongoDB Express React NodeJS)

## Minimum Viable Product
  1. Allow a farmer to register an account with Ducky
  2. Allow the farmer to Create, Read, Update, and Delete a feeding activity of the duck/s
  3. Allow the farmer to logout from Ducky
  4. Allow a scientist to register an account with Ducky
  5. Allow the scientist to read feeding activities recorded by the farmer/s
  6. Allow the scientist to logout from Ducky
  
## Technical Considerations
  * Role Based Access Control approach to differentiate a farmer and a scientist
  * Data Model Design
      * Users and Records as two documents that contain information of farmers and scientists and feeding activity respectively
      * Normalized data model - Farmer in the Users will reference respective feeding activity in the Records document
