package com.parkease.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {

    private SecurityUtil() {
        // utility class
    }

    public static String getCurrentUserIdentifier() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Unauthenticated request");
        }

        // This returns the email (username from JWT)
        return authentication.getName();
    }
}
