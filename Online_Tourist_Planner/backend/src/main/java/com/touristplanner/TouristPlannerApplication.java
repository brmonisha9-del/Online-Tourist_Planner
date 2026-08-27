package com.touristplanner;

import com.touristplanner.entity.Booking;
import com.touristplanner.entity.TourPackage;
import com.touristplanner.entity.User;
import com.touristplanner.entity.Vehicle;
import com.touristplanner.repository.BookingRepository;
import com.touristplanner.repository.PackageRepository;
import com.touristplanner.repository.UserRepository;
import com.touristplanner.repository.VehicleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
public class TouristPlannerApplication {

    public static void main(String[] args) {
        SpringApplication.run(TouristPlannerApplication.class, args);
    }

    @Bean
    public CommandLineRunner initData(
            UserRepository userRepository,
            PackageRepository packageRepository,
            VehicleRepository vehicleRepository,
            BookingRepository bookingRepository) {
        return args -> {
            // 1. Initialize Users if empty
            if (userRepository.count() == 0) {
                User admin = new User(null, "Elena Rostova", "admin@tourist.com", "admin123", "ROLE_ADMIN", "+1 (555) 888-9999", "Switzerland", "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80");
                User traveler = new User(null, "Alex Morgan", "traveler@tourist.com", "traveler123", "ROLE_USER", "+1 (555) 234-5678", "United States", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80");
                userRepository.save(admin);
                userRepository.save(traveler);
            }

            // 2. Initialize Packages if empty
            if (packageRepository.count() == 0) {
                TourPackage p1 = new TourPackage();
                p1.setTitle("Swiss Alps Majestic Expedition");
                p1.setDestination("Interlaken & Zermatt, Switzerland");
                p1.setCategory("Mountain");
                p1.setDurationDays(7);
                p1.setDurationNights(6);
                p1.setPrice(1850.0);
                p1.setRating(4.9);
                p1.setReviewCount(128);
                p1.setFeatured(true);
                p1.setImageUrl("https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80");
                p1.setDescription("Experience the crown jewel of Europe with panoramic alpine train rides, cable cars across glacial peaks, luxury chalet stays, and guided scenic hikes across the Matterhorn.");
                p1.setHighlightsJson("[\"Jungfraujoch Glacier Train Included\", \"5-Star Alpine Chalet Accommodation\", \"Daily Gourmet Swiss Breakfast & Dinners\", \"Matterhorn View Balcony Suite\"]");
                p1.setIncludedJson("[\"All Airport & Inter-city Transfers\", \"5-Star Boutique Hotels with Mountain Views\", \"VIP Mountain Passes & Cable Car Access\", \"Professional Mountain Guide\"]");
                p1.setExcludedJson("[\"International Flights\", \"Personal Travel Insurance\", \"Alcoholic Beverages outside tastings\"]");
                packageRepository.save(p1);

                TourPackage p2 = new TourPackage();
                p2.setTitle("Bali Tropical Paradise & Culture Oasis");
                p2.setDestination("Ubud & Nusa Penida, Indonesia");
                p2.setCategory("Beach");
                p2.setDurationDays(6);
                p2.setDurationNights(5);
                p2.setPrice(890.0);
                p2.setRating(4.8);
                p2.setReviewCount(94);
                p2.setFeatured(true);
                p2.setImageUrl("https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80");
                p2.setDescription("Immerse in emerald rice terraces, sacred water temples, world-class yoga retreats, and private catamaran cruises to turquoise Nusa Penida cliffs.");
                p2.setHighlightsJson("[\"Private Luxury Jungle Pool Villa\", \"Nusa Penida Manta Ray Snorkeling\", \"Mount Batur Sunrise Experience\"]");
                p2.setIncludedJson("[\"Private Air-Conditioned SUV throughout\", \"Private Pool Villa Stay\", \"All Ferry & Island Entry Tickets\"]");
                p2.setExcludedJson("[\"Flight Tickets\", \"Optional Water Sports\"]");
                packageRepository.save(p2);

                TourPackage p3 = new TourPackage();
                p3.setTitle("Kyoto & Tokyo Blossom Wonderland");
                p3.setDestination("Kyoto, Mt. Fuji & Tokyo, Japan");
                p3.setCategory("Cultural");
                p3.setDurationDays(8);
                p3.setDurationNights(7);
                p3.setPrice(2150.0);
                p3.setRating(4.95);
                p3.setReviewCount(160);
                p3.setFeatured(true);
                p3.setImageUrl("https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80");
                p3.setDescription("Blend ancient imperial shrines and tranquil bamboo groves with Shinkansen bullet trains, neon Tokyo skyline, and private onsen ryokan overlooking Mount Fuji.");
                p3.setHighlightsJson("[\"7-Day Unlimited Japan Rail Pass included\", \"Traditional Ryokan with Private Onsen\", \"Tea Ceremony & Kimono Experience\"]");
                p3.setIncludedJson("[\"7-Day High-Speed Shinkansen Pass\", \"4-Star Hotels & 1 Night Onsen Ryokan\", \"English Speaking Certified Master Guide\"]");
                p3.setExcludedJson("[\"International Airfare\", \"Personal expenses\"]");
                packageRepository.save(p3);
            }

            // 3. Initialize Vehicles if empty
            if (vehicleRepository.count() == 0) {
                Vehicle v1 = new Vehicle();
                v1.setName("Range Rover Velar Luxury Edition");
                v1.setType("SUV");
                v1.setCapacity(5);
                v1.setPricePerDay(140.0);
                v1.setTransmission("Automatic");
                v1.setFuelType("Mild Hybrid Petrol");
                v1.setImageUrl("https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80");
                v1.setFeaturesJson("[\"Panoramic Glass Roof\", \"All-Terrain 4WD\", \"Meridian Surround Sound\", \"Integrated GPS\"]");
                v1.setStatus("AVAILABLE");
                v1.setRating(4.9);
                vehicleRepository.save(v1);

                Vehicle v2 = new Vehicle();
                v2.setName("Mercedes-Benz V-Class VIP Van");
                v2.setType("Van");
                v2.setCapacity(7);
                v2.setPricePerDay(180.0);
                v2.setTransmission("Automatic");
                v2.setFuelType("Diesel Eco");
                v2.setImageUrl("https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80");
                v2.setFeaturesJson("[\"Captain Reclining Seats\", \"Conference Table\", \"High-Speed Wi-Fi\", \"Large Luggage Space\"]");
                v2.setStatus("AVAILABLE");
                v2.setRating(4.8);
                vehicleRepository.save(v2);
            }

            // 4. Initialize Bookings if empty
            if (bookingRepository.count() == 0) {
                Booking b1 = new Booking();
                b1.setBookingReference("WL-2026-89421");
                b1.setUserId(2L);
                b1.setUserName("Alex Morgan");
                b1.setUserEmail("traveler@tourist.com");
                b1.setUserPhone("+1 (555) 234-5678");
                b1.setPackageId(1L);
                b1.setVehicleId(1L);
                b1.setStartDate(LocalDate.of(2026, 9, 15));
                b1.setEndDate(LocalDate.of(2026, 9, 22));
                b1.setTravelersCount(2);
                b1.setPackagePrice(3700.0);
                b1.setVehiclePrice(980.0);
                b1.setTotalAmount(4680.0);
                b1.setPaymentMethod("Credit Card (Visa)");
                b1.setPaymentStatus("PAID");
                b1.setBookingStatus("CONFIRMED");
                b1.setSpecialRequests("Vegetarian meals preferred on alpine train.");
                bookingRepository.save(b1);
            }
        };
    }
}
