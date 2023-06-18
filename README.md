"# Adeodist-assignment" 

This repository contains the code for the Adeodist assignment, which involves creating a user management system with different roles and access control, using Node.js, Express, and Sequelize.

               ER diagram PK primary key Fk forign key


          +-----------------------+       +-----------------------+
          |          User         |       |          Feed         |
          +-----------------------+       +-----------------------+
          |                       |       |                       |
          |      id (PK)          |       |       id (PK)         |
          |      name             |       |       name            |
          |      role             |       |       url             |
          |      email            |       |       description     |
          |      password         |       |       UserId(Fk)      |
          +-----------------------+       +-----------------------+
          
setup Instructions
Follow these steps to set up and run the project:

Clone the project repository.

Open the terminal and navigate to the project directory.

Run npm install to install the required dependencies. If any packages are missing, use npm install <package-name> to install them.

Make sure you have MySQL installed and running. Create a new schema in MySQL and update the schema name and your database credentials in the utils/database.js file.

Run npm start in the terminal to start the server.

You can now make API requests to the server using tools like Postman.


step1: clone the project and do npm install (if any package missing do npm install (pacage name))
packages Used
The project uses the following npm packages:

bcrypt: for password hashing
cors: for handling Cross-Origin Resource Sharing (CORS)
express: for building the web application and RESTful APIs
helmet: for adding security headers to HTTP responses
jsonwebtoken: for generating JSON Web Tokens (JWT) for user authentication
mysql2: for connecting to MySQL database
node-cron: for scheduling tasks
sequelize: an ORM (Object-Relational Mapping) for database operations
Make sure to install these packages by running npm install <package-name>.
         
step 2: create schema in mysql and also enter schema name in utils database.js schma name and your password once setup is done 

stemp 3 :do npm start in terminal 

step 4 : example :http://localhost:3000/users  hit response from postman with json input role("Admin", "SuperAdmin", "Basic")

{
  "name": "shashank n c",
  "role": "SuperAdmin",
  "email": "shashank@test.com",
  "password": "password"
}

step5 : to use authorize roles url example http://localhost:3000/logs/getLogs in postman use select Authorization and use bearer token 
and pass the token which use get when createing user in respone pass it here
