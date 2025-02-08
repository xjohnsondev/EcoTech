package com.xjohnsondev.ewaste_backend.controller;

import com.xjohnsondev.ewaste_backend.model.Admin;
import com.xjohnsondev.ewaste_backend.repository.AdminRepo;
import com.xjohnsondev.ewaste_backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/login")
    public String login(@RequestBody Admin admin) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(admin.getUsername(), admin.getPassword()));

        final UserDetails userDetails = userDetailsService.loadUserByUsername(admin.getUsername());
        final String token = jwtUtil.generateToken(userDetails.getUsername());

        return "Bearer " + token;
    }

    @PostMapping("/create-admin")
    public ResponseEntity<String> createAdmin(@RequestBody Admin admin) {
        try {
            // Hash the password before saving it
            String hashedPassword = new BCryptPasswordEncoder().encode(admin.getPassword());
            admin.setPassword(hashedPassword);
            adminRepo.save(admin);
            return ResponseEntity.status(HttpStatus.CREATED).body("Admin created successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating admin: " + e.getMessage());
        }
    }

    @GetMapping("/get-admin-users")
    public List<Admin> getAllUsers() {
        List<Admin> admins = adminRepo.findAll();
        if (admins.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NO_CONTENT, "No admin users found.");
        }
        return admins;
    }
}