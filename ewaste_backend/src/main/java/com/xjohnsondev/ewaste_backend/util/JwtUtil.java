package com.xjohnsondev.ewaste_backend.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {
    private final byte[] SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256).getEncoded();

    // Generate token
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username) // Set the username as the subject of the token
                .setIssuedAt(new Date()) // Set the issue date to now
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // Set expiration to 1 hour
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY) // Sign with the secret key
                .compact(); // Build and return the token as a string
    }

    // Validate token
    public boolean validateToken(String token, String username) {
        return username.equals(extractUsername(token)) && !isTokenExpired(token);
    }

    // Extract username from token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject); // Extract the subject (username)
    }

    // Extract expiration date from token
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration); // Extract expiration date
    }

    // Generic method to extract claims from the token
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY) // Set the signing key
                .parseClaimsJws(token) // Parse the token
                .getBody(); // Get the body of the token
        return claimsResolver.apply(claims); // Apply the claims resolver (e.g., get username or expiration date)
    }

    // Check if the token is expired
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date()); // Compare expiration date with the current time
    }
}