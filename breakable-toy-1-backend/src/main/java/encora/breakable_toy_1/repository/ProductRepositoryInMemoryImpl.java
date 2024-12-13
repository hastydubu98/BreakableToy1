package encora.breakable_toy_1.repository;

import encora.breakable_toy_1.model.Product;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class ProductRepositoryInMemoryImpl implements ProductRepository{

    private ArrayList<Product> products;
    private final AtomicLong counter = new AtomicLong();

    public ProductRepositoryInMemoryImpl() {
        this.products = new ArrayList<>();
    }

    @Override
    public Product getProduct(long id) {
        for(Product product : products)  {
            if (product.getId() == id) {
                return product;
            }
        }
        return null;
    }

    @Override
    public List<Product> getAllProducts() {
        return products;
    }

    @Override
    public void create(String category, String name, double price, LocalDate date, long stock) {

        Product product = new Product(counter.incrementAndGet(), category, name, price, date, stock);

        products.add(product);
    }

    @Override
    public void delete(long id) {
        products.removeIf(product -> product.getId() == id);
    }

    @Override
    public Product update(Product product) {
        Product oldProduct = getProduct(product.getId());
        delete(oldProduct.getId());
        products.add(product);
        return product;
    }

}
