# Book Management API using Nest.js and PostgreSQL

## Project Overview

This project involves creating a RESTful API using Nest.js to manage a collection of books. The API will handle various operations such as creating new books, retrieving book lists, updating book details, marking the last read page, and deleting books. Additionally, the API includes user registration and login functionality for authorization. The data, including user information, will be stored in a PostgreSQL database. The entire application will be containerized using Docker, and Docker Compose will be used to orchestrate the Nest.js application and the PostgreSQL database.

## Project Structure

### Technologies Used
- Nest.js
- PostgreSQL
- Docker
- Docker Compose

### Project Components
1. **Nest.js Server**: Set up the Nest.js server to handle HTTP requests.
2. **PostgreSQL Database Integration**: Utilize PostgreSQL to store and manage book and user data.
3. **Docker Containerization**: Use Docker to containerize the Nest.js application.
4. **Docker Compose**: Orchestrate the Nest.js application and PostgreSQL database using Docker Compose.
5. **Swagger Integration**: Access API documentation through Swagger UI at the `/api` endpoint.

## Project Setup

1. **Dependencies**: Install the necessary dependencies using `npm install`.
2. **Environment Variables**: Configure any required environment variables, such as database credentials, in the `.env` file.
3. **Docker Build**: Use the provided Dockerfile to build the Docker image for the Nest.js application.
    ```bash
    docker build -t book-api .
    ```
4. **Docker Compose**: Run the entire application stack using Docker Compose.
    ```bash
    docker-compose up
    ```

## API Endpoints

- `POST /auth/sign-up`: Register a new user.
- `POST /auth/login`: Login to the application and receive an authentication token.
- `POST /book`: Create a new book.
- `GET /book`: Get a list of all books with optional pagination.
- `GET /book/:id`: Get a specific book by its ID.
- `PUT /book/:id`: Update book details.
- `PATCH /book/:id/last-read-page`: Update the last read page of a book.
- `DELETE /book/:id`: Delete a book.

## Documentation

Access the API documentation through Swagger UI at [http://localhost:3000/api](http://localhost:3000/api). This page provides detailed information about the available endpoints, request/response formats, and other relevant details.

## Testing

Run end-to-end tests using the provided test suite to ensure the API functions correctly.
`npm run test:e2e`

## Git Repository

Share the project via a Git repository, including all source code, configuration files, and documentation.

## Project Launch Documentation

Attach a brief document outlining the steps to launch the project, including any specific considerations or dependencies.

Feel free to customize this README to fit your project specifics. Good luck with your Book Management API project using Nest.js, PostgreSQL, Swagger, and user authentication!
