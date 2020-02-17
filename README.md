# Quiz Application
This application uses a MySQL database, Angular front end, and Node.js/Express backend to store quiz problems submitted by users.

The database tables are describes as follows:

Tables:
* users
* myproblems
* problems

A new user is created in the users table which stores the username, password, and unique id for validation.


When a user adds a problem through their MyProblems the problem is added to the problems table and the user's id and the problem id is added to the myproblems table.

Users and non-users can access the problems by either visiting the categories on the main page. Alternatively users can search for problems by their name with the search bar. Users have a list of their problems on their MyProblems page.

Users can add a problem that is not already in their MyProblems by clicking the add button at the bottom of a problem.
