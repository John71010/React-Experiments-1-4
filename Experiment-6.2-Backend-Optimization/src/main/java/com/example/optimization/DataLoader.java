package com.example.optimization;

import com.example.optimization.model.Department;
import com.example.optimization.model.Student;
import com.example.optimization.repository.DepartmentRepository;
import com.example.optimization.repository.StudentRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final DepartmentRepository departmentRepository;
    private final StudentRepository studentRepository;

    public DataLoader(
            DepartmentRepository departmentRepository,
            StudentRepository studentRepository) {

        this.departmentRepository = departmentRepository;
        this.studentRepository = studentRepository;
    }

    @Override
    public void run(String... args) {

        if (studentRepository.count() == 0) {

            Department aiml = departmentRepository.save(
                    new Department("AIML"));

            Department cse = departmentRepository.save(
                    new Department("CSE"));

            Department ece = departmentRepository.save(
                    new Department("ECE"));

            studentRepository.save(
                    new Student("John", "john@gmail.com", aiml));

            studentRepository.save(
                    new Student("Alice", "alice@gmail.com", cse));

            studentRepository.save(
                    new Student("David", "david@gmail.com", aiml));

            studentRepository.save(
                    new Student("Sarah", "sarah@gmail.com", ece));

            studentRepository.save(
                    new Student("Michael", "michael@gmail.com", cse));

            System.out.println("========== SAMPLE DATA INSERTED ==========");
        }
    }
}