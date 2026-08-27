package com.touristplanner.controller;

import com.touristplanner.entity.Booking;
import com.touristplanner.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    private final BookingRepository bookingRepository;

    @Autowired
    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @GetMapping
    public ResponseEntity<List<Booking>> getAllBookings(@RequestParam(required = false) String email) {
        if (email != null && !email.trim().isEmpty()) {
            return ResponseEntity.ok(bookingRepository.findByUserEmailOrderByCreatedAtDesc(email.trim()));
        }
        return ResponseEntity.ok(bookingRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBookingById(@PathVariable Long id) {
        return bookingRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/ref/{ref}")
    public ResponseEntity<?> getBookingByRef(@PathVariable String ref) {
        return bookingRepository.findByBookingReference(ref)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        if (booking.getBookingReference() == null || booking.getBookingReference().isEmpty()) {
            int randomNum = 10000 + new Random().nextInt(90000);
            booking.setBookingReference("WL-2026-" + randomNum);
        }
        if (booking.getBookingStatus() == null) {
            booking.setBookingStatus("CONFIRMED");
        }
        if (booking.getPaymentStatus() == null) {
            booking.setPaymentStatus("PAID");
        }
        Booking saved = bookingRepository.save(booking);
        return ResponseEntity.ok(saved);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> statusUpdate) {
        String newStatus = statusUpdate.get("status");
        return bookingRepository.findById(id).map(booking -> {
            booking.setBookingStatus(newStatus);
            return ResponseEntity.ok(bookingRepository.save(booking));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id) {
        return bookingRepository.findById(id).map(booking -> {
            booking.setBookingStatus("CANCELLED");
            booking.setPaymentStatus("REFUNDED");
            return ResponseEntity.ok(bookingRepository.save(booking));
        }).orElse(ResponseEntity.notFound().build());
    }
}
