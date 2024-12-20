package encora.breakable_toy_1;

import encora.breakable_toy_1.model.Product;
import encora.breakable_toy_1.repository.ProductRepositoryInMemoryImpl;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

@SpringBootTest
class BreakableToy1ApplicationTests {

	@Test
	public void outOfStock() {
		// Given
		ProductRepositoryInMemoryImpl repo = new ProductRepositoryInMemoryImpl();
		repo.create("category", "name", 10.0, LocalDate.now(), 5L);

		// When
		Product result = repo.outOfStock(1L);

		// Then
		assertEquals(0L, result.getStock());
	}

}
