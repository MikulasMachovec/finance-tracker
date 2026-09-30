package org.example.financetracker.dto.cateogry;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class CategoryResponse {

    private Long categoryId;
    private String name;
    private String color;
    private BigDecimal budget;
    private BigDecimal spent;
    private Long transactions;


}
