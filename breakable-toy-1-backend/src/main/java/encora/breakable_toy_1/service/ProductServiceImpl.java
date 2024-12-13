package encora.breakable_toy_1.service;

import encora.breakable_toy_1.model.Product;
import encora.breakable_toy_1.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product saveProduct(Product product) {
        productRepository.create(product.category(), product.name(), product.price(), product.date(), product.stock());
        return product;
    }

    @Override
    public Product deleteProduct(Product product) {
        productRepository.create(product.category(), product.name(), product.price(), product.date(), product.stock());
        return product;
    }
}
