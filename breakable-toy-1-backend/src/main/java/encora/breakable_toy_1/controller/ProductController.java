package encora.breakable_toy_1.controller;

import encora.breakable_toy_1.model.Product;
import encora.breakable_toy_1.repository.ProductRepository;
import encora.breakable_toy_1.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    @CrossOrigin(origins = "http://localhost:8080")
    @GetMapping("")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @CrossOrigin(origins = "http://localhost:8080")
    @GetMapping("/getproduct")
    public Product getProduct(@RequestParam long id) {
        return productService.getProduct(id);
    }

    @CrossOrigin(origins = "http://localhost:8080")
    @PostMapping("/products")
    public Product createProduct(@RequestBody Product product) {
        return productService.createProduct(
                product.getCategory(),
                product.getName(),
                product.getPrice(),
                product.getExpirationDate(),
                product.getStock());
    }

    @CrossOrigin(origins = "http://localhost:8080")
    @DeleteMapping("/delete")
    public boolean deleteProduct(@RequestParam long id) {
        return productService.deleteProduct(id);
    }

    @CrossOrigin(origins = "http://localhost:8080")
    @PutMapping("/products/{id}")
    public Product updateProduct(@PathVariable long id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    @CrossOrigin(origins = "http://localhost:8080")
    @PostMapping("/products/{id}/outofstock")
    public Product outOfStockProduct(@PathVariable long id) {
        return productService.outOfStock(id);
    }

    @CrossOrigin(origins = "http://localhost:8080")
    @PutMapping("/products/{id}/instock")
    public Product inStockProduct(@PathVariable long id) {
        return productService.inStock(id);
    }
}
