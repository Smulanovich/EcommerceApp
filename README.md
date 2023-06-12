# ECOMMERCEAPP

This repository contains the code for the ECOMMERCEAPP application, which consists of a server and a client.


## Getting Started

To start the application, follow the steps below:

1. Clone this repository to your local machine.

2. Open two separate terminals or command prompts.

3. Terminal 1:

   - Navigate to the server directory:
     cd ecommerceapp/server

   - Install the server dependencies:
     npm install

   - Start the server:
     npm start

   **Note:** The server may not run successfully due to a missing API key for MongoDB (which would be in the .env file). For security purposes, the API key has not been provided in this repository.

4. Terminal 2:

   - Navigate to the client directory:
     cd ecommerceapp/client
     
   - Install the client dependencies:
     npm install

   - Start the client:
     npm start

5. The application should now be running. Access it by opening a web browser and visiting: http://localhost:3000


## Important Note

Please be aware that the repository does not include the API key required for the server to run (just the Stripe one for the client side -> it is publishable). For security purposes, the API key has been omitted. 
