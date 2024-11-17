Portfolio Platform using Node.js
This project is a portfolio platform built with Node.js, MongoDB, and various web technologies. It includes features like user authentication with role-based access, CRUD operations for portfolio items, integration of third-party APIs, and email notifications using Nodemailer. The platform allows users to create, manage, and view portfolio items with added functionality for administrators and editors.
Features
User Authentication & Authorization

User registration with username, password, first name, last name, age, gender, and two-factor authentication (2FA) using an authenticator app.
Passwords are securely hashed using bcrypt.
Email notifications sent upon registration using Nodemailer.
User login with additional 2FA if enabled.
Role-based access control for admins and editors, with restricted permissions for editors.
Portfolio Management (CRUD Operations)

Admin users can create, update, and delete portfolio items.
Portfolio items consist of a carousel with 3 images, a title, description, and timestamps.
Editor users can create portfolio items but cannot edit or delete them.
API Integration & Data Visualization

Integration with two third-party APIs (e.g., financial data, sports, news) for dynamic content.
Data visualization with charts or graphs for insightful, interactive user experiences.
Editors can create visualizations based on the API data.
Messaging & Notifications

Welcome email sent upon user registration.
Notifications triggered for specific events such as item creation, item updates, or failed login attempts.


SETUP:
-Install Node.js 
- instal dependencies: npm install express mongoose multer ejs dotenv connect-mongo express-session speakeasy qrcode bcrypt
- 
Environment Variables
Create a `.env` file in the root directory with the following information:
```
MONGO_URI=mongodb+srv://lukmanarsen:NaHuGu123@cluster0.ipkc1.mongodb.net/weather?retryWrites=true&w=majority
SESSION_SECRET=####
EMAIL=lukman.arsen2006@mail.ru
EMAIL_PASSWORD=#########
RAPIDAPI_KEY=a435a003c8mshbcf2b2f46a52150p113c10jsn483f3ccb1e93
WORLDNEWSAPI_KEY=9042523018fa4db28f9051ff37bed770
APP_NAME=nodemail
PORT=3000


Running the Application
To start the application, run:
npm start
By default, the application will run on `http://localhost:3000`.

## Database Configuration
- Database settings are found in the `db/` directory. Ensure the `.env` file is set up correctly to connect to MongoDB

