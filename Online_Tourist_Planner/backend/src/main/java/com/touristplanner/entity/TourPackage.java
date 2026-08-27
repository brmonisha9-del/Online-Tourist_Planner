package com.touristplanner.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tour_packages")
public class TourPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, length = 100)
    private String destination;

    @Column(nullable = false, length = 50)
    private String category; // Mountain, Beach, Cultural, Wildlife, Luxury, Adventure

    @Column(name = "duration_days", nullable = false)
    private Integer durationDays;

    @Column(name = "duration_nights", nullable = false)
    private Integer durationNights;

    @Column(nullable = false)
    private Double price;

    @Column(precision = 2, scale = 1)
    private Double rating = 4.8;

    @Column(name = "review_count")
    private Integer reviewCount = 0;

    private Boolean featured = false;

    @Column(name = "image_url", nullable = false, length = 500)
    private String imageUrl;

    @Column(name = "gallery_images", columnDefinition = "TEXT")
    private String galleryImages; // JSON array string

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(name = "itinerary_json", columnDefinition = "TEXT")
    private String itineraryJson; // JSON array of day itineraries

    @Column(name = "highlights_json", columnDefinition = "TEXT")
    private String highlightsJson; // JSON array of highlights

    @Column(name = "included_json", columnDefinition = "TEXT")
    private String includedJson; // JSON array of included items

    @Column(name = "excluded_json", columnDefinition = "TEXT")
    private String excludedJson; // JSON array of excluded items

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public TourPackage() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDestination() { return destination; }
    public void setDestination(String destination) { this.destination = destination; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Integer getDurationDays() { return durationDays; }
    public void setDurationDays(Integer durationDays) { this.durationDays = durationDays; }

    public Integer getDurationNights() { return durationNights; }
    public void setDurationNights(Integer durationNights) { this.durationNights = durationNights; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }

    public Boolean getFeatured() { return featured; }
    public void setFeatured(Boolean featured) { this.featured = featured; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getGalleryImages() { return galleryImages; }
    public void setGalleryImages(String galleryImages) { this.galleryImages = galleryImages; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getItineraryJson() { return itineraryJson; }
    public void setItineraryJson(String itineraryJson) { this.itineraryJson = itineraryJson; }

    public String getHighlightsJson() { return highlightsJson; }
    public void setHighlightsJson(String highlightsJson) { this.highlightsJson = highlightsJson; }

    public String getIncludedJson() { return includedJson; }
    public void setIncludedJson(String includedJson) { this.includedJson = includedJson; }

    public String getExcludedJson() { return excludedJson; }
    public void setExcludedJson(String excludedJson) { this.excludedJson = excludedJson; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
