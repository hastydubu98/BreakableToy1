package encora.breakable_toy_1.controller;

import encora.breakable_toy_1.model.Product;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.concurrent.atomic.AtomicLong;

@RestController
public class ProductController {

    private static final String category = "Food";
    private static final String name = "Watermelon";
    private static final double price = 1.50;
    private static final LocalDate date = LocalDate.now();
    private static final long stock = 50;

    private final AtomicLong counter = new AtomicLong();

    @GetMapping()
    public Product getProduct() {
        return new Product(counter.incrementAndGet(), category, name, price, date, stock);
    }
}
