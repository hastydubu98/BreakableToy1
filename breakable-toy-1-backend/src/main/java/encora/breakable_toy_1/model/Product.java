package encora.breakable_toy_1.model;

import org.springframework.cglib.core.Local;

import java.time.LocalDate;

public record Product(long id,String category, String name,
                      double price, LocalDate expirationDate, LocalDate creationDate, LocalDate updateDate, long stock) {

    //Builder
    public static final class Builder {

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

    public LocalDate getCreationDate() {
        return this.creationDate;
    }

    public Product withUpdateDate(long id, LocalDate creationDate, LocalDate updateDate) {
        return new Product(id, category, name, price, expirationDate, creationDate, updateDate, stock);
    }

}
