package com.example.student_api.service;

import com.example.student_api.exception.StudentNotFoundException;
import com.example.student_api.model.Student;
import com.example.student_api.repository.StudentRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }
    public Page<Student> getStudents(Pageable pageable) {
    return repository.findAll(pageable);
}

    // Get all students
    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    // Get student by ID
    public Student getStudentById(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new StudentNotFoundException(
                                "Student with ID " + id + " not found"
                        )
                );
    }

    // Create student
    public Student createStudent(Student student) {
        return repository.save(student);
    }

    // Update student
    public Student updateStudent(Long id, Student student) {

        Student existingStudent = repository.findById(id)
                .orElseThrow(() ->
                        new StudentNotFoundException(
                                "Student with ID " + id + " not found"
                        )
                );

        existingStudent.setName(student.getName());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setAge(student.getAge());

        return repository.save(existingStudent);
    }

    // Delete student
    public boolean deleteStudent(Long id) {

        if (!repository.existsById(id)) {
            throw new StudentNotFoundException(
                    "Student with ID " + id + " not found"
            );
        }

        repository.deleteById(id);
        return true;
    }
}