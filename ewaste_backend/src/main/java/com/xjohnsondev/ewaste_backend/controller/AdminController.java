package com.xjohnsondev.ewaste_backend.controller;

import com.xjohnsondev.ewaste_backend.model.Admin;
import com.xjohnsondev.ewaste_backend.repository.AdminRepo;
import com.xjohnsondev.ewaste_backend.util.JwtUtil;
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

    private final AdminRepo adminRepo;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    public AdminController(AdminRepo adminRepo,
                           AuthenticationManager authenticationManager,
                           JwtUtil jwtUtil,
                           UserDetailsService userDetailsService) {
        this.adminRepo = adminRepo;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

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
            // Hash the admin password using BCryptPasswordEncoder before saving it
            String hashedPassword = new BCryptPasswordEncoder().encode(admin.getPassword());
            admin.setPassword(hashedPassword); // Set the hashed password on the admin object

            // Save the admin object to the repository
            adminRepo.save(admin);

            // Return a response indicating that the admin was created successfully
            return ResponseEntity.status(HttpStatus.CREATED).body("Admin created successfully");
        } catch (Exception e) {
            // If an error occurs, return a response with HTTP status 500 (Internal Server Error) and the error message
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating admin: " + e.getMessage());
        }
    }

    @GetMapping("/get-admin-users")
    public List<Admin> getAllUsers() {
        // Fetches all admin users from the repository
        List<Admin> admins = adminRepo.findAll();

        // Checks if no admin users are found
        if (admins.isEmpty()) {
            // Throws an exception
            throw new ResponseStatusException(HttpStatus.NO_CONTENT, "No admin users found.");
        }
        // Returns the list of all admin users
        return admins;
    }
}