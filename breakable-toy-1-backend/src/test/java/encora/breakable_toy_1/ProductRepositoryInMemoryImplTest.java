package encora.breakable_toy_1;

import encora.breakable_toy_1.model.Product;
import encora.breakable_toy_1.repository.ProductRepositoryInMemoryImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
public class ProductRepositoryInMemoryImplTest {

    ProductRepositoryInMemoryImpl repo;

    @BeforeEach
    public void setUp() {
        repo = new ProductRepositoryInMemoryImpl();
    }

    @Test
    public void create() {
        // Given
        repo.create("category", "name", 500.00, LocalDate.now(), 15);

        // When
        List<Product> products = repo.getAllProducts();
        Product lastProduct = products.get(products.size() - 1);

        // Then
        assertEquals("category", lastProduct.getCategory());
        assertEquals("name", lastProduct.getName());
        assertEquals(500.00, lastProduct.getPrice());
        assertEquals(LocalDate.now(), lastProduct.getExpirationDate());
        assertEquals(15, lastProduct.getStock());
    }

    @Test
    public void getProductNotFound() {
        // Given
        long nonExistentId = 999L;

        // When & Then
        assertThrows(RuntimeException.class, () -> repo.getProduct(nonExistentId));
    }

    @Test
    public void deleteProduct() {
        // Given
        Product product = repo.create("category", "name", 500.00, LocalDate.now(), 15);

        // When
        boolean result = repo.delete(product.getId());

        // Then
        assertEquals(true, result);
        assertThrows(RuntimeException.class, () -> repo.getProduct(product.getId()));
    }

    @Test
    public void updateProduct() {
        // Given
        Product product = repo.create("category", "name", 500.00, LocalDate.now(), 15);
        Product updatedProduct = new Product(product.getId(), "newCategory", "newName", 600.00, LocalDate.now(), LocalDate.now(), LocalDate.now(), 20);

        // When
        Product result = repo.update(product.getId(), updatedProduct);

        // Then
        assertEquals("newCategory", result.getCategory());
        assertEquals("newName", result.getName());
        assertEquals(600.00, result.getPrice());
        assertEquals(20, result.getStock());
    }
}
