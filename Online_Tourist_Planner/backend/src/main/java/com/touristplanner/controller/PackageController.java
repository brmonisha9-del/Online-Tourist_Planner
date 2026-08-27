package com.touristplanner.controller;

import com.touristplanner.entity.TourPackage;
import com.touristplanner.service.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/packages")
@CrossOrigin(origins = "*")
public class PackageController {

    private final PackageService packageService;

    @Autowired
    public PackageController(PackageService packageService) {
        this.packageService = packageService;
    }

    @GetMapping
    public ResponseEntity<List<TourPackage>> getAllPackages(
            @RequestParam(required = false) String destination,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Boolean featured) {

        if (Boolean.TRUE.equals(featured)) {
            return ResponseEntity.ok(packageService.getFeaturedPackages());
        }

        if (destination != null || category != null || maxPrice != null) {
            return ResponseEntity.ok(packageService.searchPackages(destination, category, maxPrice));
        }

        return ResponseEntity.ok(packageService.getAllPackages());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPackageById(@PathVariable Long id) {
        return packageService.getPackageById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TourPackage> createPackage(@RequestBody TourPackage tourPackage) {
        TourPackage created = packageService.createPackage(tourPackage);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePackage(@PathVariable Long id, @RequestBody TourPackage tourPackage) {
        try {
            TourPackage updated = packageService.updatePackage(id, tourPackage);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePackage(@PathVariable Long id) {
        packageService.deletePackage(id);
        return ResponseEntity.ok().build();
    }
}
