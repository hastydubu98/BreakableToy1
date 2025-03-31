package encora.breakable_toy_1.factory;

import encora.breakable_toy_1.model.Product;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class ProductFactoryTest {

    @Test
    public void testCreateDefaultProduct() {
        // When
        Product product = ProductFactory.createDefaultProduct();

        // Then
        assertEquals(0L, product.getId());
        assertEquals("Default Category", product.getCategory());
        assertEquals("Default Name", product.getName());
        assertEquals(0.0, product.getPrice());
        assertNull(product.getExpirationDate());
        assertEquals(LocalDate.now(), product.getCreationDate());
        assertNull(product.getUpdateDate());
        assertEquals(0L, product.getStock());
    }

    @Test
    public void testCreateProductWithValues() {
        // When
        Product product = ProductFactory.createProductWithValues(
                1L, "Electronics", "Smartphone", 699.99, LocalDate.of(2025, 12, 31), 50L
        );

        // Then
        assertEquals(1L, product.getId());
        assertEquals("Electronics", product.getCategory());
        assertEquals("Smartphone", product.getName());
        assertEquals(699.99, product.getPrice());
        assertEquals(LocalDate.of(2025, 12, 31), product.getExpirationDate());
        assertEquals(LocalDate.now(), product.getCreationDate());
        assertNull(product.getUpdateDate());
        assertEquals(50L, product.getStock());
    }

    @Test
    public void testCreateExpiredProduct() {
        // When
        Product product = ProductFactory.createExpiredProduct(
                2L, "Food", "Milk", 2.99, 10L
        );

        // Then
        assertEquals(2L, product.getId());
        assertEquals("Food", product.getCategory());
        assertEquals("Milk", product.getName());
        assertEquals(2.99, product.getPrice());
        assertEquals(LocalDate.now().minusDays(1), product.getExpirationDate());
        assertEquals(LocalDate.now(), product.getCreationDate());
        assertNull(product.getUpdateDate());
        assertEquals(10L, product.getStock());
    }
}