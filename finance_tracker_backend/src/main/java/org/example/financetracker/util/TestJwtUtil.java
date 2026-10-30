package org.example.financetracker.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.crypto.keygen.KeyGenerators;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;

public class TestJwtUtil {

    private TestJwtUtil() {

    }

    public static String createToken(
            String jwtSecret,
            Long userId,
            String email
    ) {
        long now = System.currentTimeMillis();

        SecretKey signingKey = Keys.hmacShaKeyFor(
                Base64.getDecoder().decode(jwtSecret)
        );
        return Jwts.builder()
                .subject(email)
                .claim("userId", userId)
                .issuedAt(new Date(now - 1_000))
                .expiration(new Date(now + 300_000))
                .signWith(signingKey)
                .compact();
    }

}
