package encora.breakable_toy_1.repository;

import encora.breakable_toy_1.model.Product;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ProductRepositoryInMemoryImpl implements ProductRepository{

    private ArrayList<Product> products;

    @Override
    public Product getProduct(long id) {
        return null;
    }

    @Override
    public List<Product> getAllProducts() {
        return List.of();
    }

    @Override
    public void create() {

    }

    @Override
    public void delete() {

    }

    @Override
    public Product update() {
        return null;
    }
}
