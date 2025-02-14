package com.xjohnsondev.ewaste_backend.controller;

import com.xjohnsondev.ewaste_backend.model.Center;
import com.xjohnsondev.ewaste_backend.repository.CenterRepo;
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

    public CenterController(CenterRepo centerRepo) {
        this.centerRepo = centerRepo;
    }

    @GetMapping("/get-centers")
    public ResponseEntity<List<Center>> getAllCenters() {
        // Retrieve all centers from the database
        List<Center> centers = centerRepo.findAllByOrderByIdAsc();

        // If no centers are found, return HTTP status 204 No Content
        if (centers.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NO_CONTENT, "No centers found");
        }

        // Return queried centers (or an empty list with HTTP 200 if no centers)
        return ResponseEntity.ok(centers);
    }

    // Add a list of new centers to the database
    @PostMapping("/add-centers")
    public List<Center> newCenters(@RequestBody List<Center> newCenters) {
        // If the provided list is empty, return a bad request response
        if (newCenters.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "List cannot be empty");
        }

        // Validate that each center has a name and address
        for (Center center : newCenters) {
            if (center.getName() == null || center.getAddress() == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Each center must have a Name and Address");
            }
        }

        // Save all centers and return the saved list
        return centerRepo.saveAll(newCenters);
    }

    // Update an existing center by its ID
    @PutMapping("/edit-center/{id}")
    public Center updateCenter(@RequestBody Map<String, Object> updates, @PathVariable Long id) {
        // Find the center by ID, if it exists
        return centerRepo.findById(id)
                .map(center -> {
                    // Update fields if they are present in the request
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
                    // Save and return the updated center
                    return centerRepo.save(center);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Center with ID " + id + " not found"));
    }

    // Delete a center by its ID
    @DeleteMapping("/delete-center/{id}")
    public String deleteCenter(@PathVariable Long id) {
        // If the center does not exist, return a not found error
        if (!centerRepo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Center with id " + id + " not found");
        }

        // Delete the center from the database
        centerRepo.deleteById(id);

        // Return a success message indicating that the center was deleted
        return "Center with id " + id + " has been deleted";
    }
}
