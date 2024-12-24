package encora.breakable_toy_1.repository;

import encora.breakable_toy_1.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProductRepository{

     Product getProduct(long id);

     List<Product> getAllProducts();

     Product create(String category, String name, double price, LocalDate expirationDate, long stock);

     boolean delete(long id);

     Product update(long id, Product product);

     void dummyData();

}
