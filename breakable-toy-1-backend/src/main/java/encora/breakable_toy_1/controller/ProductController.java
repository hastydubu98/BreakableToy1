package encora.breakable_toy_1.controller;

import encora.breakable_toy_1.model.Product;
import encora.breakable_toy_1.model.Statistics;
import encora.breakable_toy_1.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.function.Predicate;

@RestController
public class ProductController {

    @Autowired
    private final ProductService productService;

    private final PagedResourcesAssembler<Product> pagedResourcesAssembler;

    public ProductController(ProductService productService, PagedResourcesAssembler<Product> pagedResourcesAssembler) {
        this.productService = productService;
        this.pagedResourcesAssembler = pagedResourcesAssembler;
    }

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

        try {

            if (product.getName().length() > 120) {
                throw new ProductCreationException("Product name must have less than 120 characters");
            }

            if (Objects.equals(product.getCategory(), "")) {
                throw new ProductCreationException("Product name must be provided");
            }

            if ( Objects.equals(product.getName(), "")) {
                throw new ProductCreationException("Product category must be provided");
            }

            return productService.createProduct(
                    product.getCategory(),
                    product.getName(),
                    product.getPrice(),
                    product.getExpirationDate(),
                    product.getStock()
            );
        } catch (Exception e) {
            throw new ProductCreationException("Error creating product: " + e.getMessage());
        }
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

    @GetMapping("/pagination")
    public PagedModel<EntityModel<Product>> pagination(@RequestParam int page,
                                                       @RequestParam( required = false ) String sortBy,
                                                       @RequestParam( required = false ) String direction,
                                                       @RequestParam( required = false ) String name,
                                                       @RequestParam( required = false ) List<String> categories,
                                                       @RequestParam( required = false ) String availability) {

        Pageable pageable = PageRequest.of(page, 10);
        List<Product> products = filter(name, categories, availability);

        products = new ArrayList<>(products);

        Comparator<Product> comparator;

        switch (sortBy) {
            case "category":
                comparator = Comparator.comparing(Product::getCategory);
                break;
            case "name":
                comparator = Comparator.comparing(Product::getName);
                break;
            case "price":
                comparator = Comparator.comparing(Product::getPrice);
                break;
            case "expirationDate":
                comparator = Comparator.comparing(Product::getExpirationDate, Comparator.nullsFirst(Comparator.naturalOrder()));
                break;
            case "stock":
                comparator = Comparator.comparing(Product::getStock);
                break;
            default:
                comparator = Comparator.comparing(Product::getId);
                break;
        }

        if ("desc".equalsIgnoreCase(direction)) {
            comparator = comparator.reversed();
        }

        products.sort(comparator);

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), products.size());
        List<Product> subList = products.subList(start, end);

        Page<Product> pageProducts = new PageImpl<>(subList, pageable, products.size());

        return pagedResourcesAssembler.toModel(pageProducts);
    }

    @GetMapping("/filter")
    public List<Product> filter(@RequestParam (required = false) String name,
                                @RequestParam (required = false) List<String> categories,
                                @RequestParam (required = false) String availability) {

        List<String> availableCategories =  categories();

        boolean notAvailableCategory =  availableCategories.containsAll(categories);

        List<Product> products = getAllProducts();

        Predicate<Product> combinedPredicate = product -> true;

        if (name != null && !name.isEmpty()) {
            Predicate<Product> filter = product -> product.getName().equalsIgnoreCase(name);
            combinedPredicate = combinedPredicate.and(filter);
        }

        if (categories != null && !categories.isEmpty()) {
            Predicate<Product> filter = product -> categories.contains(product.getCategory());
            combinedPredicate = combinedPredicate.and(filter);
        }

        if (availability != null) {
            if (availability.equalsIgnoreCase("In stock")) {
                Predicate<Product> filter = product -> product.getStock() != 0;
                combinedPredicate = combinedPredicate.and(filter);
            } else if (availability.equalsIgnoreCase("Out of stock")) {
                Predicate<Product> filter = product -> product.getStock() == 0;
                combinedPredicate = combinedPredicate.and(filter);
            }
        }

        products = products.stream().filter(combinedPredicate).toList();

        return products;
    }

    @GetMapping("/categories")
    public List<String> categories() {

        List<String> categories = new ArrayList<>();

        List<Product> products = getAllProducts();

        for (Product product : products) {
            categories.add(product.getCategory());
        }

        return categories;
    }


    @ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "Invalid product data")
    public static class ProductCreationException extends RuntimeException {
        public ProductCreationException(String message) {
            super(message);
        }
    }

}