package com.parkease.controller.auth;

import com.parkease.service.auth.AuthService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public String signup(@RequestBody Map<String, String> request) {

        authService.signup(
                request.get("name"),
                request.get("email"),
                request.get("phoneNumber"),
                request.get("password"),
                request.get("vehicleType"),
                request.get("vehicleNumber")
        );

        return "Signup successful";
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> request) {

        String token = authService.login(
                request.get("email"),
                request.get("password")
        );

        return Map.of(
                "token", token,
                "type", "Bearer"
        );
    }

    @PostMapping("/admin/signup")
    public String adminSignup(@RequestBody Map<String, String> request) {

        authService.registerAdmin(
                request.get("name"),
                request.get("email"),
                request.get("phoneNumber"),
                request.get("password")
        );


        return "Admin registered successfully";
    }

}
