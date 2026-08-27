package com.touristplanner.controller;

import com.touristplanner.entity.Vehicle;
import com.touristplanner.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin(origins = "*")
public class VehicleController {

    private final VehicleRepository vehicleRepository;

    @Autowired
    public VehicleController(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    @GetMapping
    public ResponseEntity<List<Vehicle>> getAllVehicles(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String type) {
        if (status != null && !status.isEmpty()) {
            return ResponseEntity.ok(vehicleRepository.findByStatus(status.toUpperCase()));
        }
        if (type != null && !type.isEmpty()) {
            return ResponseEntity.ok(vehicleRepository.findByType(type));
        }
        return ResponseEntity.ok(vehicleRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getVehicleById(@PathVariable Long id) {
        return vehicleRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Vehicle> createVehicle(@RequestBody Vehicle vehicle) {
        Vehicle saved = vehicleRepository.save(vehicle);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateVehicle(@PathVariable Long id, @RequestBody Vehicle updated) {
        return vehicleRepository.findById(id).map(veh -> {
            veh.setName(updated.getName());
            veh.setType(updated.getType());
            veh.setCapacity(updated.getCapacity());
            veh.setPricePerDay(updated.getPricePerDay());
            veh.setTransmission(updated.getTransmission());
            veh.setFuelType(updated.getFuelType());
            veh.setImageUrl(updated.getImageUrl());
            veh.setFeaturesJson(updated.getFeaturesJson());
            veh.setStatus(updated.getStatus());
            veh.setRating(updated.getRating());
            return ResponseEntity.ok(vehicleRepository.save(veh));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVehicle(@PathVariable Long id) {
        if (!vehicleRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        vehicleRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
