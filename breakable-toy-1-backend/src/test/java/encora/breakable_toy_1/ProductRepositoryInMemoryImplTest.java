package encora.breakable_toy_1;

import encora.breakable_toy_1.model.Product;
import encora.breakable_toy_1.repository.ProductRepositoryInMemoryImpl;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class ProductRepositoryInMemoryImplTest {

    ProductRepositoryInMemoryImpl repo = new ProductRepositoryInMemoryImpl();

    @Test
    public void create() {
        // Given
        repo.create("category", "name", 500.00, LocalDate.now(), 15);

        // When
        List<Product> products = repo.getAllProducts();
        Product lastProduct = products.getLast();

        // Then
        assertEquals("category", lastProduct.getCategory());
        assertEquals("name", lastProduct.getName());
        assertEquals(500.00, lastProduct.getPrice());
        assertEquals(LocalDate.now(), lastProduct.getExpirationDate());
        assertEquals(15, lastProduct.getStock());
    }

}
