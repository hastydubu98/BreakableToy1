package encora.breakable_toy_1;

import encora.breakable_toy_1.model.Product;
import encora.breakable_toy_1.model.Statistics;
import encora.breakable_toy_1.repository.ProductRepository;
import encora.breakable_toy_1.repository.ProductRepositoryInMemoryImpl;
import encora.breakable_toy_1.service.ProductServiceImpl;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.Map;

@SpringBootTest
class BreakableToy1ApplicationTests {

	@Test
	public void outOfStock() {
		// Given
		ProductRepositoryInMemoryImpl repo = new ProductRepositoryInMemoryImpl();
		ProductServiceImpl service = new ProductServiceImpl();
		service.setProductRepository(repo);

		repo.create("category", "name", 10.0, LocalDate.now(), 5L);

		// When
		Product result = service.outOfStock(1L);

		// Then
		assertEquals(0L, result.getStock());
	}

	@Test
	public void inStock() {
		// Given
		ProductRepositoryInMemoryImpl repo = new ProductRepositoryInMemoryImpl();
		ProductServiceImpl service = new ProductServiceImpl();
		service.setProductRepository(repo);

		repo.create("category", "name", 10.0, LocalDate.now(), 5L);

		// When
		Product result = service.inStock(1L);

		// Then
		assertEquals(10L, result.getStock());
	}

	@Test
	public void total()  {
		// Given
		ProductRepositoryInMemoryImpl repo = new ProductRepositoryInMemoryImpl();
		ProductServiceImpl service = new ProductServiceImpl();
		service.setProductRepository(repo);

		for (int i = 0; i < 5; i++) {
			repo.create("category1", "name", 500.00, LocalDate.now(), 15);

		}

		for (int i = 0; i < 4; i++) {
			repo.create("category2", "name", 100.00, LocalDate.now(), 10);
		}

		repo.create("category2", "name", 50, LocalDate.now(), 5);


		// When
		Map<String, Statistics> result = service.total();

		//Then
		assertEquals(37500,result.get("category1").getTotalValue());
		assertEquals(75,result.get("category1").getTotalStocks());
		assertEquals(500,result.get("category1").getAverage());

		assertEquals(4250,result.get("category2").getTotalValue());
		assertEquals(45,result.get("category2").getTotalStocks());
		assertEquals(94.44,result.get("category2").getAverage());
	}

}
