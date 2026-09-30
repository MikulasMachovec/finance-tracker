package org.example.financetracker.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.example.financetracker.entity.UserEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey ;

    @Value("${jwt.duration}")
    private long duration;


    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(
                Base64.getDecoder().decode(secretKey)
        );
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith((SecretKey) getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Generate JWT token
     * @param userEntity
     * @return token
     */
    public String generateToken(UserEntity userEntity) {
        return Jwts.builder()
                .subject(userEntity.getEmail())
                .claim("userId", userEntity.getUserId() )
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + duration))
                .signWith(getSigningKey())
                .compact();
    }

    /**
     * Extract email address from token
     * @param token
     * @return email
     */
    public String extractEmail(String token) {
        return getClaims(token).getSubject();
    }

    public Long extractUserId(String token) {
        return getClaims(token).get("userId", Long.class);
    }

    public Date extractExpiration(String token) {
        return getClaims(token).getExpiration();
    }

    public boolean isTokenValid(String token, UserEntity userEntity) {
        return extractEmail(token).equals(userEntity.getEmail())
            && !isTokenExpired(token);
    }
}
