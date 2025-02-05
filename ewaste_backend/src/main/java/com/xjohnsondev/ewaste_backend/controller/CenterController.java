package com.xjohnsondev.ewaste_backend.controller;

import com.xjohnsondev.ewaste_backend.model.Center;
import com.xjohnsondev.ewaste_backend.repository.CenterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class CenterController {

    @Autowired
    private CenterRepo centerRepo;

    @GetMapping("/getCenters")
    public List<Center> getAllCenters() {
        List<Center> centers = centerRepo.findAll();
        if (centers.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NO_CONTENT, "No centers found");
        }
        return centers;
    }

    @PostMapping("/addCenter")
    public Center newCenter(@RequestBody Center newCenter) {
        if (newCenter.getName() == null || newCenter.getAddress() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Name and Address are required");
        }
        return centerRepo.save(newCenter);
    }


    @PutMapping("/editCenter/{id}")
    public Center updateCenter(@RequestBody Center newCenter, @PathVariable Long id) {
        return centerRepo.findById(id)
                .map(center -> {
                    center.setName(newCenter.getName());
                    center.setAddress(newCenter.getAddress());
                    center.setPhone(newCenter.getPhone());
                    center.setLatitude(newCenter.getLatitude());
                    center.setLongitude(newCenter.getLongitude());
                    center.setDescription(newCenter.getDescription());
                    return centerRepo.save(center);
                })
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Center with ID " + id + " not found"));
    }

    @DeleteMapping("/deleteCenter/{id}")
    public String deleteCenter(@PathVariable Long id) {
        if (!centerRepo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Center with id " + id + " not found");
        }
        centerRepo.deleteById(id);
        return "Center with id " + id + " has been deleted";
    }


}
