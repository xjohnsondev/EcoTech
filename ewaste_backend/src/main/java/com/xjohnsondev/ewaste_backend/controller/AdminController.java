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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
public class AdminController {

    private final AdminRepo adminRepo;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;

    public AdminController(AdminRepo adminRepo,
                           AuthenticationManager authenticationManager,
                           JwtUtil jwtUtil,
                           UserDetailsService userDetailsService,
                           PasswordEncoder passwordEncoder) {
        this.adminRepo = adminRepo;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Admin admin) {
        // Print received username and password
        System.out.println("Attempting login for: " + admin.getUsername());
        System.out.println("Password sent: " + admin.getPassword());

        try {
            // Authenticate the user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(admin.getUsername(), admin.getPassword()));

            System.out.println("Authentication successful!");

            // Load user details after authentication
            final UserDetails userDetails = userDetailsService.loadUserByUsername(admin.getUsername());

            System.out.println("User details gathered");

            // Generate JWT token
            final String token = jwtUtil.generateToken(userDetails.getUsername());
            System.out.println("Generated JWT token: " + token);

            // Return token in response
            Map<String, String> response = new HashMap<>();
            response.put("authToken", token);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            // Log the exception to get more insights
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok("Logged out successfully");
    }

    @PostMapping("/create-admin")
    public ResponseEntity<String> createAdmin(@RequestBody Admin admin) {
        try {
            // Hash the password using PasswordEncoder before saving
            String hashedPassword = passwordEncoder.encode(admin.getPassword());
            admin.setPassword(hashedPassword);

            // Save admin with hashed password
            adminRepo.save(admin);

            return ResponseEntity.status(HttpStatus.CREATED).body("Admin created successfully");
        } catch (Exception e) {
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