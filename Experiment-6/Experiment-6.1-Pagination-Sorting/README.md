# Experiment 6.1 – Pagination and Sorting

## Aim
To implement pagination and sorting in a Spring Boot application using Spring Data JPA and provide an interactive frontend interface for viewing student records.

## Objectives
- Understand the need for pagination in large datasets.
- Implement pagination using Spring Data `Pageable`.
- Implement sorting of student records.
- Allow users to select page number and page size.
- Integrate the Spring Boot backend with a React frontend.

## Technologies Used
- Java JDK 17+
- Spring Boot
- Spring Data JPA
- Maven
- MySQL
- React.js
- Vite
- VS Code
- Postman

## Features Implemented
- Paginated student records
- Sorting of student data
- Page number selection
- Page size selection
- Student list displaying UID and student details
- Previous and Next page navigation
- REST API integration with React
- Dynamic retrieval of student records

## Pagination API

Example request:

`GET /api/students?page=0&size=5&sort=id,asc`

The parameters specify:

- `page` – page number
- `size` – number of records per page
- `sort` – field and sorting direction

## Project Structure
- `student-api` – Spring Boot backend
- `student-frontend` – React frontend

## Result
Pagination and sorting were successfully implemented using Spring Data Pageable. Student records can be retrieved in smaller pages and sorted dynamically. The React interface provides an easy way to navigate and display the paginated student data.

## Learning Outcomes
1. Learned how pagination improves the performance of applications handling large datasets.
2. Understood the use of `Pageable` and `Page` in Spring Data JPA.
3. Learned how to implement dynamic sorting in REST APIs.
4. Integrated pagination and sorting APIs with a React frontend.
5. Learned how to build a more scalable and user-friendly student management system.