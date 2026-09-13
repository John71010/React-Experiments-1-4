# Experiment 5.1 – RESTful API Development

## Aim
To design and implement RESTful APIs using Spring Boot with proper validation, standardized responses, and scalable architecture.

## Objectives
- Understand REST API design principles.
- Implement CRUD operations using Spring Boot.
- Create consistent request and response structures.
- Apply Bean Validation for input validation.
- Enable communication between the Spring Boot backend and React frontend using CORS.

## Technologies Used
- Java JDK 17+
- Spring Boot
- Spring Data JPA
- Maven
- MySQL
- Bean Validation
- React.js
- Vite
- Postman
- VS Code

## Features Implemented
- Create a student
- View all students
- View a student by ID
- Update student details
- Delete a student
- Input validation
- Standardized API responses
- CORS support
- React-based Student Management interface

## REST API Endpoints

| Method | Endpoint | Operation |
|---|---|---|
| GET | `/api/students` | Get all students |
| GET | `/api/students/{id}` | Get student by ID |
| POST | `/api/students` | Create a student |
| PUT | `/api/students/{id}` | Update a student |
| DELETE | `/api/students/{id}` | Delete a student |

## Project Structure

- `student-api` – Spring Boot backend
- `student-frontend` – React frontend

## Result
A functional RESTful Student Management API was successfully developed using Spring Boot. CRUD operations, validation, standardized responses, and frontend-backend communication were implemented and tested successfully.

## Learning Outcomes
1. Learned how to design RESTful APIs using Spring Boot.
2. Understood the implementation of CRUD operations.
3. Learned how to use Spring Data JPA for database operations.
4. Implemented validation and standardized API responses.
5. Learned how to connect a React frontend with a Spring Boot backend.