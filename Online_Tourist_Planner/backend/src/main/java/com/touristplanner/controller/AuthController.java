package com.touristplanner.controller;

import com.touristplanner.entity.User;
import com.touristplanner.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserRepository userRepository;

    @Autowired
    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        if (email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email is required."));
        }

        Optional<User> userOpt = userRepository.findByEmail(email.toLowerCase().trim());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Simple validation for demo
            Map<String, Object> response = new HashMap<>();
            response.put("token", "jwt-mock-token-" + user.getId());
            response.put("user", user);
            return ResponseEntity.ok(response);
        }

        // Demo fallback account auto-create or mock
        if ("admin@tourist.com".equalsIgnoreCase(email.trim())) {
            User admin = new User(1L, "Elena Rostova", "admin@tourist.com", "admin123", "ROLE_ADMIN", "+1 (555) 888-9999", "Switzerland", "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80");
            userRepository.save(admin);
            return ResponseEntity.ok(Map.of("token", "jwt-mock-token-admin", "user", admin));
        }

        User newUser = new User(null, email.split("@")[0], email.toLowerCase().trim(), password != null ? password : "password123", "ROLE_USER", "+1 (555) 019-2834", "Traveler", "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80");
        User saved = userRepository.save(newUser);
        return ResponseEntity.ok(Map.of("token", "jwt-mock-token-" + saved.getId(), "user", saved));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email is required"));
        }
        if (userRepository.existsByEmail(user.getEmail().toLowerCase().trim())) {
            return ResponseEntity.badRequest().body(Map.of("message", "User with this email already exists"));
        }

        user.setEmail(user.getEmail().toLowerCase().trim());
        if (user.getRole() == null) user.setRole("ROLE_USER");
        if (user.getAvatar() == null) user.setAvatar("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80");

        User saved = userRepository.save(user);
        return ResponseEntity.ok(Map.of("token", "jwt-mock-token-" + saved.getId(), "user", saved));
    }
}
