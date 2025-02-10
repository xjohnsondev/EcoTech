package com.xjohnsondev.ewaste_backend.controller;

import com.xjohnsondev.ewaste_backend.model.Center;
import com.xjohnsondev.ewaste_backend.repository.CenterRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class CenterController {

    private final CenterRepo centerRepo;

    public CenterController(CenterRepo centerRepo) {
        this.centerRepo = centerRepo;
    }

    // Get all centers from the database
//    @GetMapping("/get-centers")
//    public ResponseEntity<List<Center>> getCenters(@RequestParam(required = false) String status) {
//        List<Center> centers;
//
//        if (status == null || status.isEmpty()) {
//            centers = centerRepo.findAllByOrderByIdAsc();
//        } else {
//            centers = centerRepo.findByStatusOrderByIdAsc(status);
//        }
//
//        // Return queried centers (or an empty list with HTTP 200 if no centers)
//        return ResponseEntity.ok(centers);
//    }

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
    public Center updateCenter(@RequestBody Center newCenter, @PathVariable Long id) {
        // Find the center by ID, if it exists
        return centerRepo.findById(id)
                .map(center -> {
                    // Update the center details with the new data
                    center.setName(newCenter.getName());
                    center.setAddress(newCenter.getAddress());
                    center.setPhone(newCenter.getPhone());
                    center.setLatitude(newCenter.getLatitude());
                    center.setLongitude(newCenter.getLongitude());
                    center.setDescription(newCenter.getDescription());
                    center.setStatus(newCenter.getStatus());
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

    // Get all centers with the status "APPROVED"
    @GetMapping("/approved-centers")
    public List<Center> getApprovedCenters() {
        // Retrieve and return centers that have the status "APPROVED" sorted by ID in ASC order
        return centerRepo.findByStatusOrderByIdAsc("APPROVED");
    }

}
