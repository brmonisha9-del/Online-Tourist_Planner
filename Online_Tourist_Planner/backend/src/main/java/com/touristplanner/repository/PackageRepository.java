package com.touristplanner.repository;

import com.touristplanner.entity.TourPackage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PackageRepository extends JpaRepository<TourPackage, Long> {
    List<TourPackage> findByFeaturedTrue();
    List<TourPackage> findByCategoryIgnoreCase(String category);
    List<TourPackage> findByDestinationContainingIgnoreCase(String destination);
    
    @Query("SELECT p FROM TourPackage p WHERE " +
           "(:destination IS NULL OR LOWER(p.destination) LIKE LOWER(CONCAT('%', :destination, '%')) OR LOWER(p.title) LIKE LOWER(CONCAT('%', :destination, '%'))) AND " +
           "(:category IS NULL OR LOWER(p.category) = LOWER(:category)) AND " +
           "(:maxPrice IS NULL OR p.price <= :maxPrice)")
    List<TourPackage> searchPackages(
        @Param("destination") String destination,
        @Param("category") String category,
        @Param("maxPrice") Double maxPrice
    );
}
