package encora.breakable_toy_1.repository;

import encora.breakable_toy_1.model.Product;

import java.util.List;

public interface ProductRepository {

     Product getProduct(long id);

     List<Product> getAllProducts();

     void create();

     void delete();

     Product update();

}
