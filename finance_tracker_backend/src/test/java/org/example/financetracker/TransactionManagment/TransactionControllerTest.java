package org.example.financetracker.TransactionManagment;

import org.example.financetracker.service.impl.TransactionServiceImpl;
import org.example.financetracker.service.interfaces.ExportDataService;
import org.example.financetracker.util.TestJwtUtil;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.mockito.Mockito.verifyNoInteractions;

@SpringBootTest
@AutoConfigureMockMvc
public class TransactionControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private TransactionServiceImpl transactionService;

    @MockitoBean
    private ExportDataService exportDataService;

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Test
    void shouldRejectUnsupportedTransactionType() throws Exception {
        String requestBody = """
                {
                    "title": "Test transaction",
                    "description": "Testing invalid type",
                    "amount": 10.25,
                    "type": "TRANSFER",
                    "transactionDate": "2026-10-29",
                    "categoryId": 1
                }
                """;

        mockMvc.perform(post("/transactions")
                        .header("Authorization",
                                "Bearer " + TestJwtUtil.createToken(
                                        jwtSecret,
                                        1L,
                                        "test@example.com"
                                ))
                        .contentType(APPLICATION_JSON)
                        .content(requestBody))
                .andExpect(status().isBadRequest()
        );
        verifyNoInteractions(transactionService);
    }
}
