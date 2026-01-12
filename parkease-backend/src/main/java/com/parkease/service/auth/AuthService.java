package com.parkease.service.auth;

import com.parkease.config.security.JwtUtil;
import com.parkease.model.User;
import com.parkease.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public void signup(String name,
                       String email,
                       String phoneNumber,
                       String password,
                       String vehicleType,
                       String vehicleNumber) {

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPhoneNumber(phoneNumber);
        user.setPassword(passwordEncoder.encode(password));
        user.setVehicleType(vehicleType);
        user.setVehicleNumber(vehicleNumber);
        user.setRole("USER");
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);
    }


    public String login(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return jwtUtil.generateToken(user.getEmail(), user.getRole());
    }

    public void registerAdmin(String name,
                              String email,
                              String phoneNumber,
                              String password) {

        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User admin = new User();
        admin.setName(name);
        admin.setEmail(email);
        admin.setPhoneNumber(phoneNumber);
        admin.setPassword(passwordEncoder.encode(password));
        admin.setRole("ROLE_ADMIN");


        // explicitly null for safety
        admin.setVehicleType(null);
        admin.setVehicleNumber(null);

        userRepository.save(admin);
    }

}
