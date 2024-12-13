package encora.breakable_toy_1.service;

import encora.breakable_toy_1.model.Product;

public interface ProductService {

    Product saveProduct(Product product);

    Product deleteProduct(Product product);

}
