package encora.breakable_toy_1.controller;

import encora.breakable_toy_1.model.Product;
import encora.breakable_toy_1.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("")
    public List<Product> getAllProducts() {
        return productRepository.getAllProducts();
    }

    @GetMapping("/getproduct")
    public Product getProduct(@RequestParam long id) {
        return productRepository.getProduct(id);
    }

    @PostMapping("/create")
    public void createProduct(@RequestParam String category, @RequestParam String name, @RequestParam double price, @RequestParam long stock) {
        productRepository.create(category, name, price, stock);
    }

    @DeleteMapping("/delete")
    public void deleteProduct(@RequestParam long id) {
        productRepository.delete(id);
    }

    @PostMapping("/update")
    public void updateProduct(@RequestBody Product product) {
        productRepository.update(product);
    }
}
