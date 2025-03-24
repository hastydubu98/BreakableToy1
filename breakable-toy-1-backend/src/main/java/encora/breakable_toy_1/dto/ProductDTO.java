package encora.breakable_toy_1.dto;

import javax.validation.constraints.*;
import java.time.LocalDate;

public class ProductDTO {

    private long id;

    @NotBlank(message = "Category must be provided")
    private String category;

    @NotBlank(message = "Name must be provided")
    @Size(max = 120, message = "Product name must have less than 120 characters")
    private String name;

    @Positive(message = "Price must be positive")
    private double price;

    private LocalDate expirationDate;

    @PositiveOrZero(message = "Stock must be zero or positive")
    private long stock;

    // Getters
    public long getId() {
        return id;
    }

    public String getCategory() {
        return category;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public long getStock() {
        return stock;
    }

    // Setters
    public void setId(long id) {
        this.id = id;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }

    public void setStock(long stock) {
        this.stock = stock;
    }
}
