package encora.breakable_toy_1;

import encora.breakable_toy_1.model.Product;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ProductTest {

    @Test
    public void testProductBuilder() {
        // Given
        LocalDate now = LocalDate.now();
        Product product = new Product.Builder(1L, "category", "name", 10.0, now, now, now, 5L).build();

        // Then
        assertEquals(1L, product.getId());
        assertEquals("category", product.getCategory());
        assertEquals("name", product.getName());
        assertEquals(10.0, product.getPrice());
        assertEquals(now, product.getExpirationDate());
        assertEquals(now, product.getCreationDate());
        assertEquals(now, product.getUpdateDate());
        assertEquals(5L, product.getStock());
    }

    @Test
    public void testProductSetters() {
        // Given
        LocalDate now = LocalDate.now();
        Product product = new Product(1L, "category", "name", 10.0, now, now, now, 5L);

        // When
        product.setCategory("newCategory");
        product.setName("newName");
        product.setPrice(20.0);
        product.setExpirationDate(now.plusDays(1));
        product.setCreationDate(now.plusDays(1));
        product.setUpdateDate(now.plusDays(1));
        product.setStock(10L);

        // Then
        assertEquals("newCategory", product.getCategory());
        assertEquals("newName", product.getName());
        assertEquals(20.0, product.getPrice());
        assertEquals(now.plusDays(1), product.getExpirationDate());
        assertEquals(now.plusDays(1), product.getCreationDate());
        assertEquals(now.plusDays(1), product.getUpdateDate());
        assertEquals(10L, product.getStock());
    }
}