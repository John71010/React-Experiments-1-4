package com.example.optimization.controller;

import com.example.optimization.model.Student;
import com.example.optimization.service.StudentService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5174")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    // BEFORE optimization - demonstrates N+1 queries
    @GetMapping("/nplusone")
    public List<Student> getStudentsNPlusOne() {
        return studentService.getStudentsNPlusOne();
    }

    // AFTER optimization - uses JOIN FETCH
    @GetMapping("/optimized")
    public List<Student> getStudentsOptimized() {
        return studentService.getStudentsOptimized();
    }

    @GetMapping("/cached")
public List<Student> getStudentsCached() {
    return studentService.getStudentsCached();
}
@DeleteMapping("/cache")
public String clearCache() {
    studentService.clearCache();
    return "Cache cleared successfully";
}
}