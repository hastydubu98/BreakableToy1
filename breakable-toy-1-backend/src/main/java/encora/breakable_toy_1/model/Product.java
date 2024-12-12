package encora.breakable_toy_1.model;

import org.springframework.cglib.core.Local;

import java.time.LocalDate;

public record Product(long id,String category, String name,
                      double price, LocalDate date, long stock) {
    //Builder
    public static final class Builder {

        long id;
        String category;
        String name;
        double price;
        LocalDate date;
        long stock;

        public Builder(long id, String category, String name, double price, LocalDate date, long stock) {
            this.id = id;
            this.category = category;
            this.name = name;
            this.price = price;
            this.date = date;
            this.stock = stock;
        }

        public Product build() {
            return new Product(id, category, name, price, date, stock);
        }
    }
}
