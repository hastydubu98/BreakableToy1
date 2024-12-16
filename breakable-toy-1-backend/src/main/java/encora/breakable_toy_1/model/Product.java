package encora.breakable_toy_1.model;

import org.springframework.cglib.core.Local;

import java.time.LocalDate;

public class Product {

    private long id;
    private String category;
    private String name;
    private double price;
    private LocalDate expirationDate;
    private LocalDate creationDate;
    private LocalDate updateDate;
    private long stock;

    public Product(long id, String category, String name, double price,
                   LocalDate expirationDate, LocalDate creationDate, LocalDate updateDate, long stock) {
        this.id = id;
        this.category = category;
        this.name = name;
        this.price = price;
        this.expirationDate = expirationDate;
        this.creationDate = creationDate;
        this.updateDate = updateDate;
        this.stock = stock;
    }

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

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public LocalDate getUpdateDate() {
        return updateDate;
    }

    public long getStock() {
        return stock;
    }

    // Setters
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

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public void setUpdateDate(LocalDate updateDate) {
        this.updateDate = updateDate;
    }

    public void setStock(long stock) {
        this.stock = stock;
    }
    
    // Builder class
    public static class Builder {
        private long id;
        private String category;
        private String name;
        private double price;
        private LocalDate expirationDate;
        private LocalDate creationDate;
        private LocalDate updateDate;
        private long stock;

        public Builder(long id, String category, String name, double price,
                       LocalDate expirationDate, LocalDate creationDate, LocalDate updateDate, long stock) {
            this.id = id;
            this.category = category;
            this.name = name;
            this.price = price;
            this.expirationDate = expirationDate;
            this.creationDate = creationDate;
            this.updateDate = updateDate;
            this.stock = stock;
        }

        public Product build() {
            return new Product(id, category, name, price, expirationDate, creationDate, updateDate, stock);
        }
    }
}
