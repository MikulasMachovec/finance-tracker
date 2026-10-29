package org.example.financetracker.AuthorizationAndSecurity;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.example.financetracker.service.interfaces.ExportDataService;
import org.example.financetracker.service.interfaces.TransactionService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import javax.crypto.SecretKey;

import java.util.Base64;
import java.util.Date;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class SecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private TransactionService transactionService;

    @MockitoBean
    private ExportDataService exportDataService;



    @Value("${jwt.secret}")
    private String jwtSecret;

    @Test
    void shouldRejectRequestJwtIsMissing() throws Exception {
        mockMvc.perform(get("/transactions"))
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldRejectRequestJwtIsMalformed() throws Exception {
        mockMvc.perform(get("/transactions")
                        .header(
                                "Authorization",
                                "Bearer this-is-not-a-valid-jwt"
                        ))
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldRejectRequestJwtIsExpired() throws Exception {
//        Arrange: create a valid singed JWT that has expired.
        long now = System.currentTimeMillis();

        SecretKey signingKey = Keys.hmacShaKeyFor(
                Base64.getDecoder().decode(jwtSecret)
        );

        String expiredToken = Jwts.builder()
                .subject("test@test.com")
                .issuedAt(new Date(now - 120_000))
                .expiration(new Date(now - 60_000))
                .signWith(signingKey)
                .compact();
//        Act: send expired token.
        mockMvc.perform(get("/transactions")
                        .header("Authorization","Bearer " +  expiredToken))
//                Assert: access must be rejected.
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldAcceptRequestJwtIsValid() throws Exception {
//        Arrange: create a valid singed JWT
        long now = System.currentTimeMillis();

        SecretKey signingKey = Keys.hmacShaKeyFor(
                Base64.getDecoder().decode(jwtSecret)
        );

        String validToken = Jwts.builder()
                .subject("test@test.com")
                .claim("userId", 1L)
                .issuedAt(new Date(now - 60_000))
                .expiration(new Date(now + 300_000))
                .signWith(signingKey)
                .compact();
//        Act: send valid token
        mockMvc.perform(get("/transactions")
                        .header("Authorization","Bearer " +  validToken))
//                Assert: access should be allowed.
                .andExpect(status().isOk());
    }

}
