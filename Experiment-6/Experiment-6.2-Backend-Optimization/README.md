# Experiment 6.2 – Backend Performance Optimization

## Aim
To analyze and optimize the performance of a Spring Boot backend by identifying inefficient database access patterns and improving API efficiency.

## Objectives
- Understand common backend performance problems.
- Analyze inefficient database queries.
- Study the N+1 query problem.
- Improve database access efficiency.
- Compare normal and optimized API behavior.
- Improve the scalability of the application.

## Technologies Used
- Java JDK 17+
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven
- MySQL
- React.js
- Vite
- Postman
- VS Code

## Features Implemented
- Backend performance analysis
- N+1 query demonstration
- Optimized database retrieval
- REST API testing
- Comparison of inefficient and optimized approaches
- React frontend integration
- Improved backend efficiency

## Example Endpoint

An endpoint was used to demonstrate the N+1 query behavior:

`GET /api/students/nplusone`

This endpoint helps observe how inefficient database access can generate multiple unnecessary queries.

## N+1 Query Problem

The N+1 query problem occurs when one query retrieves a list of records and then additional queries are executed separately for related data.

This may cause:
- Increased database load
- Slower response time
- More database queries
- Poor performance with larger datasets

## Optimization

The application was improved by reducing unnecessary database queries and using more efficient data access techniques.

## Project Structure

- `src` – Spring Boot backend source code
- `optimization-frontend` – React frontend
- `pom.xml` – Maven configuration

## Result
Backend performance was successfully analyzed and optimized. The experiment demonstrated the effect of inefficient database queries and showed how improved data access techniques can increase application performance.

## Learning Outcomes
1. Learned how database queries affect backend performance.
2. Understood the N+1 query problem.
3. Learned how to analyze inefficient API behavior.
4. Improved understanding of Spring Data JPA and Hibernate.
5. Learned the importance of backend optimization for scalable applications.