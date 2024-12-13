package encora.breakable_toy_1.repository;

import encora.breakable_toy_1.model.Product;

import java.time.LocalDate;
import java.util.List;

public interface ProductRepository {

     Product getProduct(long id);

     List<Product> getAllProducts();

     void create(String category, String name, double price, LocalDate date, long stock);

     void delete(long id);

     Product update(Product product);

}
