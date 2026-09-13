# Experiment 5.2 – Global Exception Handling and Structured Logging

## Aim
To implement global exception handling and structured logging for building robust and observable backend systems using Spring Boot.

## Objectives
- Handle application exceptions centrally using `@ControllerAdvice`.
- Implement structured logging using SLF4J and Logback.
- Use correlation IDs for request tracking.
- Improve debugging and backend observability.
- Return consistent error responses to clients.

## Technologies Used
- Java JDK 17+
- Spring Boot
- Spring Data JPA
- SLF4J
- Logback
- Maven
- React.js
- Vite
- Postman
- VS Code

## Features Implemented
- Global exception handling using `@ControllerAdvice`
- Custom `StudentNotFoundException`
- Structured error responses
- Request logging
- Correlation ID generation and tracking
- `X-Correlation-ID` request and response header
- React-based API monitoring interface
- HTTP 404 handling for students that do not exist

## Important Components

### GlobalExceptionHandler
Handles exceptions centrally and returns structured error responses.

### StudentNotFoundException
Custom exception generated when a requested student ID does not exist.

### CorrelationIdFilter
Generates or accepts an `X-Correlation-ID` for each request and adds it to the response and logging context.

### SLF4J and Logback
Used to record application activity and provide useful information for debugging.

## Example Test

Request:

`GET /api/students/999`

Header:

`X-Correlation-ID: TEST-12345`

If student ID 999 does not exist, the API returns a `404 Not Found` response containing the error message and correlation ID.

## Project Structure
- `student-api` – Spring Boot backend
- `student-frontend` – React frontend and API monitoring interface

## Result
Global exception handling and structured logging were successfully implemented. The application can return consistent error responses and trace requests using correlation IDs, improving debugging and observability.

## Learning Outcomes
1. Learned how to implement global exception handling using `@ControllerAdvice`.
2. Understood how custom exceptions are created and handled.
3. Learned how SLF4J and Logback are used for backend logging.
4. Implemented correlation IDs for tracing API requests.
5. Improved understanding of backend debugging and observability.