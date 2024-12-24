package encora.breakable_toy_1.controller;

import encora.breakable_toy_1.model.Product;
import encora.breakable_toy_1.model.Statistics;
import encora.breakable_toy_1.repository.ProductRepository;
import encora.breakable_toy_1.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/getproduct")
    public Product getProduct(@RequestParam long id) {
        return productService.getProduct(id);
    }

    @PostMapping("/products")
    public Product createProduct(@RequestBody Product product) {
        return productService.createProduct(
                product.getCategory(),
                product.getName(),
                product.getPrice(),
                product.getExpirationDate(),
                product.getStock());
    }

    @DeleteMapping("/delete")
    public boolean deleteProduct(@RequestParam long id) {
        return productService.deleteProduct(id);
    }

    @PutMapping("/products/{id}")
    public Product updateProduct(@PathVariable long id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    @PostMapping("/products/{id}/outofstock")
    public Product outOfStockProduct(@PathVariable long id) {
        return productService.outOfStock(id);
    }

    @PutMapping("/products/{id}/instock")
    public Product inStockProduct(@PathVariable long id) {
        return productService.inStock(id);
    }

    @GetMapping("/total")
    public Map<String, Statistics> getTotal() {
        return productService.total();
    }
}
