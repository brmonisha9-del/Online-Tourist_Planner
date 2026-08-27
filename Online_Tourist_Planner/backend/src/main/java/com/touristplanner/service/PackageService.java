package com.touristplanner.service;

import com.touristplanner.entity.TourPackage;
import java.util.List;
import java.util.Optional;

public interface PackageService {
    List<TourPackage> getAllPackages();
    List<TourPackage> getFeaturedPackages();
    Optional<TourPackage> getPackageById(Long id);
    List<TourPackage> getPackagesByCategory(String category);
    List<TourPackage> searchPackages(String destination, String category, Double maxPrice);
    TourPackage createPackage(TourPackage tourPackage);
    TourPackage updatePackage(Long id, TourPackage tourPackage);
    void deletePackage(Long id);
}
