package com.xjohnsondev.ewaste_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/protected")
public class ProtectedController {

    @GetMapping
    public ResponseEntity<String> getProtectedData() {
        return ResponseEntity.ok("This is a protected route. You're authenticated!");
    }
}