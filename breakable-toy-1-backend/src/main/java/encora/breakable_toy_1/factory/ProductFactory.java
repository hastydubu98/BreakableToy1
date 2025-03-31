package encora.breakable_toy_1.factory;

import encora.breakable_toy_1.model.Product;

import java.time.LocalDate;

public class ProductFactory {

    // Factory method to create a Product with default values
    public static Product createDefaultProduct() {
        return new Product(
                0L, // Default ID
                "Default Category", // Default category
                "Default Name", // Default name
                0.0, // Default price
                null, // No expiration date
                LocalDate.now(), // Creation date is now
                null, // No update date
                0L // Default stock
        );
    }

    // Factory method to create a Product with custom values
    public static Product createProductWithValues(long id, String category, String name, double price,
                                                  LocalDate expirationDate, long stock) {
        return new Product(
                id,
                category,
                name,
                price,
                expirationDate,
                LocalDate.now(), // Automatically set creation date
                null, // No update date
                stock
        );
    }

    // Factory method to create an expired Product
    public static Product createExpiredProduct(long id, String category, String name, double price, long stock) {
        return new Product(
                id,
                category,
                name,
                price,
                LocalDate.now().minusDays(1), // Expired yesterday
                LocalDate.now(), // Creation date is now
                null, // No update date
                stock
        );
    }
}