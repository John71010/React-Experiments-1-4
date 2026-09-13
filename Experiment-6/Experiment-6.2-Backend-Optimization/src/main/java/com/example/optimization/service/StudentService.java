package com.example.optimization.service;

import com.example.optimization.model.Student;
import com.example.optimization.repository.StudentRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // BEFORE OPTIMIZATION
    @Transactional(readOnly = true)
    public List<Student> getStudentsNPlusOne() {

        System.out.println("========== N+1 QUERY TEST ==========");

        List<Student> students = studentRepository.findAll();

        for (Student student : students) {
            System.out.println(
                student.getName() + " -> " +
                student.getDepartment().getName()
            );
        }

        return students;
    }

    // AFTER OPTIMIZATION
    @Transactional(readOnly = true)
    public List<Student> getStudentsOptimized() {

        System.out.println("========== OPTIMIZED QUERY TEST ==========");

        List<Student> students =
                studentRepository.findAllWithDepartment();

        for (Student student : students) {
            System.out.println(
                student.getName() + " -> " +
                student.getDepartment().getName()
            );
        }

        return students;
    }

    @Cacheable("students")
@Transactional(readOnly = true)
public List<Student> getStudentsCached() {

    System.out.println("========== DATABASE HIT FOR CACHED API ==========");

    try {
        Thread.sleep(1200);
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }

    return studentRepository.findAllWithDepartment();
}

    @CacheEvict(value = "students", allEntries = true)
public void clearCache() {
    System.out.println("========== CACHE CLEARED ==========");
}
}