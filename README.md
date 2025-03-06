# Task Management API

This is a Task Management API built using Node.js and MongoDB. It provides endpoints for user authentication and task management.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/dharmendra841434/Cave_Digital_Australia_Test.git
   cd task-management-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT= //add port number according to your setup
   DB_URL= //add your MongoDB URL
   GPASS= //add Gmail app password for sending email using nodemailer
   JWTSECRET= //add your JWT secret
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Authentication

- **POST** `/auth/login` - User login  
  **Request Body:**
  ```json
  {
      "email": "youremail",
      "password": "yourpassword"
  }
  ```
- **POST** `/auth/signup` - User signup  
  **Request Body:**
  ```json
  {
      "email": "youremail",
      "full_name": "yourfull_name",
      "password": "yourpassword"
  }
  ```
- **POST** `/auth/send-otp-email` - Send OTP via email  
  **Request Body:**
  ```json
  {
      "email": "youremail",
      "otp": "generate otp"
  }
  ```
- **PUT** `/auth/reset-password` - Reset password  
  **Request Body:**
  ```json
  {
      "email": "youremail",
      "newPassword": "new password"
  }
  ```

### Tasks

- **POST** `/task/create` - Create a new task
   **Request Body:**
  ```json
  {
    "title":"this is title",
    "description":"wqydquoeqwueqweuqwteq qwyetqwteb qwuetqw7teq"
  }
  ```
- **PUT** `/task/update/:taskid` - Update a task
   **Request Body:**
  ```json
  {
    "title":"this is title",
    "description":"wqydquoeqwueqweuqwteq qwyetqwteb qwuetqw7teq"
  }
  ```
- **DELETE** `/task/delete/:taskId` - Delete a task
   **Request No Need Body:**
- **GET** `/task/all-tasks` - Retrieve all tasks
   **Request No Need Body:**
- **GET** `/task/single-task/:taskId` - Retrieve a single task
   **Request No Need Body:**

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Nodemailer (for sending OTP emails)

## License

This project is licensed under the MIT License.

## Author

Developed by Dharmendra.
