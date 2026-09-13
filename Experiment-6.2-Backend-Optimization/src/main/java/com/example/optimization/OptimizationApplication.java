package com.example.optimization;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class OptimizationApplication {

    public static void main(String[] args) {
        SpringApplication.run(OptimizationApplication.class, args);
    }
}
