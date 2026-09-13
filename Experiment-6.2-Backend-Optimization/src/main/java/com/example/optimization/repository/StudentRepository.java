package com.example.optimization.repository;

import com.example.optimization.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query("""
           SELECT s
           FROM Student s
           JOIN FETCH s.department
           """)
    List<Student> findAllWithDepartment();
}