package org.example.financetracker.AuthorizationAndSecurity;

import org.example.financetracker.service.AuthService;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class SensitiveInformationTest {
    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private AuthService authService;

    @Test
    void shouldNeverReturnPasswordWhenRegisteringUser() throws Exception {
//        Arrange
        String password = "TestPassword123";

        String requestBody = """
                {
                "firstName": "TestFirstName",
                "lastName": "TestLastName",
                "email": "test@example.com",
                "password": "%s" 
                }
                """.formatted(password);

//        Act + Assert

        mockMvc.perform(post("/auth/register")
                    .contentType(APPLICATION_JSON)
                    .content(requestBody))
                .andExpect(status().isOk())
                .andExpect(content().string(
                        Matchers.not(
                                Matchers.containsString(password)
                        )
                ))
                .andExpect(content().string(
                        Matchers.not(
                                Matchers.containsString("password")
                        )
                ));


    }

}
