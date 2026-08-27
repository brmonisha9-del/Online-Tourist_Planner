package com.touristplanner.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 50)
    private String type; // SUV, Sedan, Van, Luxury Coach, 4x4 Offroad

    @Column(nullable = false)
    private Integer capacity;

    @Column(name = "price_per_day", nullable = false)
    private Double pricePerDay;

    @Column(length = 30)
    private String transmission = "Automatic";

    @Column(name = "fuel_type", length = 30)
    private String fuelType = "Hybrid / Petrol";

    @Column(name = "image_url", nullable = false, length = 500)
    private String imageUrl;

    @Column(name = "features_json", columnDefinition = "TEXT")
    private String featuresJson;

    @Column(length = 30)
    private String status = "AVAILABLE"; // AVAILABLE, BOOKED, MAINTENANCE

    @Column(precision = 2, scale = 1)
    private Double rating = 4.9;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public Vehicle() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }

    public Double getPricePerDay() { return pricePerDay; }
    public void setPricePerDay(Double pricePerDay) { this.pricePerDay = pricePerDay; }

    public String getTransmission() { return transmission; }
    public void setTransmission(String transmission) { this.transmission = transmission; }

    public String getFuelType() { return fuelType; }
    public void setFuelType(String fuelType) { this.fuelType = fuelType; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getFeaturesJson() { return featuresJson; }
    public void setFeaturesJson(String featuresJson) { this.featuresJson = featuresJson; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
