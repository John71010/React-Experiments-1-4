package com.example.student_api.controller;

import com.example.student_api.dto.ApiResponse;
import com.example.student_api.model.Student;
import com.example.student_api.service.StudentService;

import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    private static final Logger logger =
            LoggerFactory.getLogger(StudentController.class);

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    // GET all students
    @GetMapping
        public Page<Student> getAllStudents(Pageable pageable) {
                logger.info("Fetching all students");
                return service.getStudents(pageable);
    }

    // GET student by ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Student>> getStudentById(
            @PathVariable Long id) {

        logger.info("Fetching student with id={}", id);

        Student student = service.getStudentById(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Student found successfully",
                        student
                )
        );
    }

    // CREATE student
    @PostMapping
    public ResponseEntity<ApiResponse<Student>> createStudent(
            @Valid @RequestBody Student student) {

        logger.info(
                "Creating student with email={}",
                student.getEmail()
        );

        Student createdStudent =
                service.createStudent(student);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Student created successfully",
                        createdStudent
                )
        );
    }

    // UPDATE student
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Student>> updateStudent(
            @PathVariable Long id,
            @Valid @RequestBody Student student) {

        logger.info("Updating student with id={}", id);

        Student updatedStudent =
                service.updateStudent(id, student);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Student updated successfully",
                        updatedStudent
                )
        );
    }

    // DELETE student
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteStudent(
            @PathVariable Long id) {

        logger.info("Deleting student with id={}", id);

        service.deleteStudent(id);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        true,
                        "Student deleted successfully",
                        null
                )
        );
    }
}