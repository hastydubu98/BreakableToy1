package encora.breakable_toy_1.service;

import encora.breakable_toy_1.model.Product;
import encora.breakable_toy_1.model.Statistics;
import encora.breakable_toy_1.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    public void setProductRepository(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

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
        Product product = getProduct(id);

        product.setStock(0);
        product.setUpdateDate(LocalDate.now());
        return product;
    }

    @Override
    public Product inStock(long id) {
        Product product = getProduct(id);

        product.setStock(10);
        product.setUpdateDate(LocalDate.now());
        return product;
    }

    @Override
    public Map<String, Statistics> total() {

        final List<Product> products = getAllProducts();

        final Map<String, Statistics> total = new HashMap<>();

        Statistics sum = new Statistics(0,0,0);

        total.put("Total", sum);

        for(Product product : products)  {

            double totalValue = Math.round((product.getStock() * product.getPrice()) * 100.0) / 100.0;
            double average = Math.round((totalValue / product.getStock()) * 100.0) / 100.0;

            if (total.containsKey(product.getCategory())) {

                double totalStock =  total.get(product.getCategory()).getTotalStocks();
                double oldTotalValue = total.get(product.getCategory()).getTotalValue();
                double newAverage  = (oldTotalValue + totalValue) / (totalStock + product.getStock());

                total.get(product.getCategory()).setTotalStocks(totalStock + product.getStock());
                total.get(product.getCategory()).setTotalValue(oldTotalValue + totalValue);
                total.get(product.getCategory()).setAverage(newAverage);

            } else {

                final Statistics statistics = new Statistics((double) product.getStock(), totalValue, average);

                total.put(product.getCategory(), statistics);

            }

            double oldOverallStocks = total.get("Total").getTotalStocks();
            double oldOverallValue = total.get("Total").getTotalValue();
            double newOverallStocks = oldOverallStocks + product.getStock();
            double newOverallValue = Math.round((oldOverallValue + totalValue) * 100.0) / 100.0;

            total.get("Total").setTotalStocks(newOverallStocks);
            total.get("Total").setTotalValue(newOverallValue);

            double newOverallAverage = Math.round((newOverallValue / newOverallStocks) * 100.0) / 100.0;

            total.get("Total").setAverage(newOverallAverage);

        }

        return total;
    }

}
