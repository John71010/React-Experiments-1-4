package com.example.student_api.exception;

import jakarta.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger =
            LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(StudentNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleStudentNotFound(
            StudentNotFoundException ex,
            HttpServletRequest request) {

        String correlationId =
                (String) request.getAttribute("correlationId");

        logger.warn(
                "Student not found | correlationId={} | path={}",
                correlationId,
                request.getRequestURI()
        );

        Map<String, Object> response = new HashMap<>();

        response.put("success", false);
        response.put("status", 404);
        response.put("message", ex.getMessage());
        response.put("correlationId", correlationId);

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGeneralException(
            Exception ex,
            HttpServletRequest request) {

        String correlationId =
                (String) request.getAttribute("correlationId");

        logger.error(
                "Unexpected error | correlationId={} | path={}",
                correlationId,
                request.getRequestURI(),
                ex
        );

        Map<String, Object> response = new HashMap<>();

        response.put("success", false);
        response.put("status", 500);
        response.put("message", "Internal server error");
        response.put("correlationId", correlationId);

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(response);
    }
}