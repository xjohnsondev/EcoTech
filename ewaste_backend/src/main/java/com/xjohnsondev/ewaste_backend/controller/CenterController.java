package com.xjohnsondev.ewaste_backend.controller;

import com.xjohnsondev.ewaste_backend.model.Center;
import com.xjohnsondev.ewaste_backend.repository.CenterRepo;
import com.xjohnsondev.ewaste_backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
public class CenterController {

    private final CenterRepo centerRepo;
    private final JwtUtil jwtUtil;

    @Autowired
    public CenterController(CenterRepo centerRepo, JwtUtil jwtUtil) {
        this.centerRepo = centerRepo;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/public/get-centers")
    public ResponseEntity<List<Center>> getAllCenters() {
        List<Center> centers = centerRepo.findAllByOrderByIdAsc();

        if (centers.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NO_CONTENT, "No centers found");
        }

        return ResponseEntity.ok(centers);
    }

    @GetMapping("/admin/get-centers")
    public ResponseEntity<List<Center>> getAllCentersAdmin(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader != null) {
            System.out.println("Loading centers");
        } else {
            System.out.println("Empty header");
        }

        // Early return if Authorization header is missing
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Missing or invalid Authorization header");
        }

        try {
            // Extract and validate JWT token
            String token = authHeader.substring(7); // Remove "Bearer " prefix
            String username = jwtUtil.extractUsername(token);

            if (!jwtUtil.validateToken(token, username)) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
            }

            // Fetch centers from the repository
            List<Center> centers = centerRepo.findAllByOrderByIdAsc();
            if (centers.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }
            return ResponseEntity.ok(centers);
        } catch (ResponseStatusException e) {
            throw e; // Rethrow known exceptions
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "An error occurred while retrieving centers");
        }
    }

    @PostMapping("/add-centers")
    public List<Center> newCenters(@RequestBody List<Center> newCenters) {
        if (newCenters.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "List cannot be empty");
        }

        // Validate that each center has a name and address
        for (Center center : newCenters) {
            if (center.getName() == null || center.getAddress() == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Each center must have a Name and Address");
            }
        }

        return centerRepo.saveAll(newCenters);
    }

    @PutMapping("/edit-center/{id}")
    public Center updateCenter(@RequestBody Map<String, Object> updates, @PathVariable Long id) {
        return centerRepo.findById(id)
                .map(center -> {
                    if (updates.containsKey("status")) {
                        center.setStatus((String) updates.get("status"));
                    }
                    if (updates.containsKey("name")) {
                        center.setName((String) updates.get("name"));
                    }
                    if (updates.containsKey("address")) {
                        center.setAddress((String) updates.get("address"));
                    }
                    if (updates.containsKey("phone")) {
                        center.setPhone((String) updates.get("phone"));
                    }
                    if (updates.containsKey("latitude")) {
                        center.setLatitude((Double) updates.get("latitude"));
                    }
                    if (updates.containsKey("longitude")) {
                        center.setLongitude((Double) updates.get("longitude"));
                    }
                    if (updates.containsKey("description")) {
                        center.setDescription((String) updates.get("description"));
                    }
                    return centerRepo.save(center);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Center with ID " + id + " not found"));
    }

    @DeleteMapping("/delete-center/{id}")
    public String deleteCenter(@PathVariable Long id) {
        if (!centerRepo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Center with id " + id + " not found");
        }

        centerRepo.deleteById(id);
        return "Center with id " + id + " has been deleted";
    }
}