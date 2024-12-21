package encora.breakable_toy_1.repository;

import encora.breakable_toy_1.model.Product;
import encora.breakable_toy_1.model.Statistics;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface ProductRepository {

     Product getProduct(long id);

     List<Product> getAllProducts();

     Product create(String category, String name, double price, LocalDate expirationDate, long stock);

     boolean delete(long id);

     Product update(long id, Product product);

     void dummyData();

}
