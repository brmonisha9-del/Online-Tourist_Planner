package com.touristplanner.service.impl;

import com.touristplanner.entity.TourPackage;
import com.touristplanner.repository.PackageRepository;
import com.touristplanner.service.PackageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PackageServiceImpl implements PackageService {

    private final PackageRepository packageRepository;

    @Autowired
    public PackageServiceImpl(PackageRepository packageRepository) {
        this.packageRepository = packageRepository;
    }

    @Override
    public List<TourPackage> getAllPackages() {
        return packageRepository.findAll();
    }

    @Override
    public List<TourPackage> getFeaturedPackages() {
        return packageRepository.findByFeaturedTrue();
    }

    @Override
    public Optional<TourPackage> getPackageById(Long id) {
        return packageRepository.findById(id);
    }

    @Override
    public List<TourPackage> getPackagesByCategory(String category) {
        return packageRepository.findByCategoryIgnoreCase(category);
    }

    @Override
    public List<TourPackage> searchPackages(String destination, String category, Double maxPrice) {
        if ((destination == null || destination.trim().isEmpty()) && 
            (category == null || category.trim().isEmpty() || category.equalsIgnoreCase("All")) && 
            maxPrice == null) {
            return packageRepository.findAll();
        }
        String destQuery = (destination != null && !destination.trim().isEmpty()) ? destination.trim() : null;
        String catQuery = (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("All")) ? category.trim() : null;
        return packageRepository.searchPackages(destQuery, catQuery, maxPrice);
    }

    @Override
    public TourPackage createPackage(TourPackage tourPackage) {
        return packageRepository.save(tourPackage);
    }

    @Override
    public TourPackage updatePackage(Long id, TourPackage updated) {
        return packageRepository.findById(id).map(pkg -> {
            pkg.setTitle(updated.getTitle());
            pkg.setDestination(updated.getDestination());
            pkg.setCategory(updated.getCategory());
            pkg.setDurationDays(updated.getDurationDays());
            pkg.setDurationNights(updated.getDurationNights());
            pkg.setPrice(updated.getPrice());
            pkg.setRating(updated.getRating());
            pkg.setFeatured(updated.getFeatured());
            pkg.setImageUrl(updated.getImageUrl());
            pkg.setGalleryImages(updated.getGalleryImages());
            pkg.setDescription(updated.getDescription());
            pkg.setItineraryJson(updated.getItineraryJson());
            pkg.setHighlightsJson(updated.getHighlightsJson());
            pkg.setIncludedJson(updated.getIncludedJson());
            pkg.setExcludedJson(updated.getExcludedJson());
            return packageRepository.save(pkg);
        }).orElseThrow(() -> new RuntimeException("Tour Package not found with id: " + id));
    }

    @Override
    public void deletePackage(Long id) {
        packageRepository.deleteById(id);
    }
}
