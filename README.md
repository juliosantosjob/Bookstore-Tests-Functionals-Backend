# Cypress-Tests-Functionals-Backend

## Description

This is a backend testing automation project for the BookStore application, aiming to ensure that all critical parts of the application function correctly in different scenarios. It covers everything from user registration to book management. The idea is to create automated tests that verify if the system behaves as it should.

## Functional Requirements

### User Registration

| Status | Description                                                  |
| ------ | ------------------------------------------------------------ |
| ✅     | Must register a new user - 201 CREATED                       |
| ❌     | Does not register with a blank username - 400 BAD REQUEST   |
| ❌     | Does not register with a blank password and username - 400 BAD REQUEST |
| ❌     | Do not register a user with a password that does not contain special characters - 400 BAD REQUEST |
| ❌     | Does not create an account with the same data as an existing account - 406 NOT ACCEPTABLE |

### Authorization

| Status | Description                                                  |
| ------ | ------------------------------------------------------------ |
| ✅     | Log in successfully - 200 OK                                 |
| ❌     | Can't login with invalid username - 400 BAD REQUEST          |
| ❌     | Can't login with invalid password - 400 BAD REQUEST          |
| ❌     | Cannot log in with invalid username and password - 400 BAD REQUEST |

### Manage Books

| Status | Description                                                  |
| ------ | ------------------------------------------------------------ |
| ✅     | Check information of a book - 200 OK                        |
| ❌     | Add and remove a book from the favorites list - 200 OK      |
| ❌     | Don't add a book that doesn't exist - 400 BAD REQUEST       |
| ❌     | Do not add a book to the favorites list without authorization - 401 UNAUTHORIZED |
| ❌     | Didn't add a book to the favorites list with an incorrect user ID - 401 UNAUTHORIZED |

### Finalize Account

| Status | Description                                                   |
| ------ | ------------------------------------------------------------- |
| ✅     | Deletes a user - 204 NO CONTENT                               |
| ❌     | Does not delete a user that does not exist - 400 BAD REQUEST  |
| ❌     | Do not delete a user without authorization - 401 UNAUTHORIZED |

<br>

# How to Execute the Project

### Prerequisites

Make sure you have the following tools installed on your machine:

- NodeJS: [Download and install the latest version of Node.js.](https://nodejs.org/)
- npm: Usually installed automatically with Node.js, but you can check by typing `npm -v` in the terminal.
- Git: to download the project.

## Configuration

1. Clone this repository to your local machine:

  ```
  git clone https://github.com/juliosantosjob/Cypress-Tests-Functionals-Backend.git 
  ```

2. Install project dependencies:

```bash
npm install
  ```

3. Create a .env file in the root directory of the project to set up the necessary environment variables. An example content for the .env file:

  ```bash
  BASE_URL=<Base URL informed in the readme>
  NAME=<name_example>
  PASSWORD=<password_example>
  USER_ID=<id_user_example>
  ```

## Creating a user in the Bookstore API to run the test

The Bookstore API enables the creation of new users through POST requests. Follow the steps below to create a user:

1. Make a POST request to the following URL: `https://bookstore.toolsqa.com/Account/v1/User`.

2. In the request body, provide the user data in JSON format. Here's an example:

  ```json
  {
    "userName": "your_username",
    "password": "your_password"
  }
  ```

3. If the request is successful, the API will return a response indicating the successful creation of the user. An example response could be:

  ```json
  {
    "userId": "12345",
    "userName": "your_username",
    "status": "User created successfully"
  }
  ```

## Tests

To run the tests, use the following command:
  ```bash
  npm run test
  ```

## Last Execution Report
You can access the report of the last execution 
<a href="https://juliosantosjob.github.io/Cypress-Tests-Functionals-Backend/">here</a>.

## Swagger application
- <a href ="https://bookstore.toolsqa.com/swagger/">Book Store API</a>

## Contact

For more information or questions, you can get in touch with me:

 **Name:** Julio Santos

 [<img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" />](https://www.linkedin.com/in/julio-santos-43428019b)
[<img src = "https://img.shields.io/badge/instagram-%23E4405F.svg?&style=for-the-badge&logo=instagram&logoColor=white">](https://www.instagram.com/juli0sts/)
[<img src = "https://img.shields.io/badge/facebook-%231877F2.svg?&style=for-the-badge&logo=facebook&logoColor=white">](https://www.facebook.com/profile.php?id=100003793058455)
<a href="mailto:julio958214@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank">
  </a> 
