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

    @PostMapping("/products")
    public Product createProduct(@RequestParam String category, @RequestParam String name,
                              @RequestParam double price, @RequestParam LocalDate expirationDate, @RequestParam long stock) {
        return productRepository.create(category, name, price, expirationDate, stock);
    }

    @DeleteMapping("/delete")
    public boolean deleteProduct(@RequestParam long id) {
        return productRepository.delete(id);
    }

    @PutMapping("/products/{id}")
    public Product updateProduct(@PathVariable long id, @RequestBody Product product) {
        return productRepository.update(id, product);
    }

    @PostMapping("/products/{id}/outofstock")
    public Product  outOfStockProduct(@PathVariable long id) {
        return productRepository.outOfStock(id);
    }

    @PutMapping("/products/{id}/instock")
    public Product inStockProduct(@PathVariable long id) {
        return productRepository.inStock(id);
    }
}
