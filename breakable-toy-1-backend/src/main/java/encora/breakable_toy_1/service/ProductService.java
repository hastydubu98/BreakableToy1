package encora.breakable_toy_1.service;

import encora.breakable_toy_1.model.Product;
import encora.breakable_toy_1.model.Statistics;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface ProductService {

    Product getProduct(long id);

    List<Product> getAllProducts();

    Product createProduct(String category, String name, double price, LocalDate expirationDate, long stock);

    boolean deleteProduct(long id);

    Product updateProduct(long id, Product product);

    Product outOfStock(long id);

    Product inStock(long id);

    Map<String, Statistics> total();
}
