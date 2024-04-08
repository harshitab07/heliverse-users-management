<h1>User Management System</h1>

The application has the following functionalities:

<h3>Frontend:</h3>
Deployment Link: https://users-management-heliverse.netlify.app<br>

<ul>
  <li>Users displayed in cards format with pagination: The users should be displayed in a visually appealing card format. Implement pagination to display 20 users per page.</li>
  <li>Search by Name: Users can search for other users by their names.</li>
  <li>Search users based on three filters - Domain, Gender, and Availability.</li>
  <li>Create a team: Users can create a team by selecting users from the list.</li>
  <li>Show team details: Once the team is created, the details of the team are displayed, including the selected users' information.</li>
</ul>

<h3>Backend:</h3>
Deployment Link: https://heliverse-users-management.onrender.com<br>
<br>
CRUD APIs:<br>
GET /api/users: Retrieve all users with pagination support.<br>
GET /api/users/:id: Retrieve a specific user by ID.<br>
POST /api/users: Create a new user.<br>
PUT /api/users/:id: Update an existing user.<br>
DELETE /api/users/:id: Delete a user.<br>
POST /api/team: Create a new team by selecting users from the list with unique domains and availability.<br>
GET /api/team/:id: Retrieve the details of a specific team by ID.<br>

<h2>Tech Stack:</h2>

<h3>Frontend:</h3>
React.js for the UI components<br>
Redux Toolkit for state management<br>

<h3>Backend:</h3>
Node.js and Express.js for the server or Nest js <br>
MongoDB for the database<br>
Mongoose for object modeling with MongoDB<br>


