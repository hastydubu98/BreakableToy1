package encora.breakable_toy_1.service;

import encora.breakable_toy_1.model.Product;
import encora.breakable_toy_1.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product getProduct(long id) {
        return productRepository.getProduct(id);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.getAllProducts();
    }

    @Override
    public Product createProduct(String category, String name, double price, LocalDate expirationDate, long stock) {
       return productRepository.create(category, name, price, expirationDate, stock);
    }

    @Override
    public boolean deleteProduct(long id) {
        return productRepository.delete(id);
    }

    @Override
    public Product updateProduct(long id, Product product) {
        return productRepository.update(id, product);
    }

    @Override
    public Product outOfStock(long id) {
        return productRepository.outOfStock(id);
    }

    @Override
    public Product inStock(long id) {
        return productRepository.inStock(id);
    }

    @Override
    public Map<String, Map<String, Double>> total() {
        return productRepository.total();
    }
}
