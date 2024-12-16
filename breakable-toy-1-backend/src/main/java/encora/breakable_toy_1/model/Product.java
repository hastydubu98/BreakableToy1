package encora.breakable_toy_1.model;

import org.springframework.cglib.core.Local;

import java.time.LocalDate;

public record Product(long id,String category, String name,
                      double price, LocalDate expirationDate, LocalDate creationDate, LocalDate updateDate, long stock) {

    //Builder
    public static class Builder {

        long id;
        String category;
        String name;
        double price;
        LocalDate expirationDate;
        LocalDate creationDate;
        LocalDate updateDate;
        long stock;

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

    public long getId() {
        return this.id;
    }

    public String getCategory() {
        return this.category;
    }

    public String getName() {
        return this.name;
    }

    public double getPrice() {
        return this.price;
    }


    public LocalDate getExpirationDate() {
        return this.expirationDate;
    }

    public long getStock() {
        return this.stock;
    }

    public LocalDate getCreationDate() {
        return this.creationDate;
    }

    public Product withUpdateDate(long id, LocalDate creationDate, LocalDate updateDate) {
        return new Product(id, category, name, price, expirationDate, creationDate, updateDate, stock);
    }

    public Product outOfStock(long id) {
        return new Product(id, category, name, price, expirationDate, creationDate, updateDate, 0);
    }

    public Product inStock(long id) {
        return new Product(id, category, name, price, expirationDate, creationDate, updateDate, 10);
    }

}
