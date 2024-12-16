package encora.breakable_toy_1.repository;

import encora.breakable_toy_1.model.Product;
import org.slf4j.spi.LocationAwareLogger;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class ProductRepositoryInMemoryImpl implements ProductRepository{

    private final ArrayList<Product> products;
    private final AtomicLong counter = new AtomicLong();

    public ProductRepositoryInMemoryImpl() {
        this.products = new ArrayList<>();
        dummyData();
    }

    @Override
    public Product getProduct(long id) {
        for(Product product : products)  {
            if (product.getId() == id) {
                return product;
            }
        }
        throw new RuntimeException("Object with id " + id + " not found.");
    }

    @Override
    public List<Product> getAllProducts() {
        return products;
    }

    @Override
    public Product create(String category, String name, double price, LocalDate expirationDate, long stock) {

        LocalDate creationDate =  LocalDate.now();

        Product product = new Product(counter.incrementAndGet(), category, name, price, expirationDate,
                creationDate, null, stock);

        products.add(product);

        return product;
    }

    @Override
    public boolean delete(long id) {
        return products.removeIf(product -> product.getId() == id);
    }

    @Override
    public Product update(long id, Product product) {
        Product oldProduct = getProduct(id);
        product = product.withUpdateDate(id, oldProduct.getCreationDate(), LocalDate.now());
        int index = products.indexOf(oldProduct);
        products.set(index, product);
        return product;
    }

    @Override
    public Product outOfStock(long id) {
        Product oldProduct = getProduct(id);
        Product product = oldProduct;
        product = product.outOfStock(id);
        int index = products.indexOf(oldProduct);
        products.set(index, product);
        return product;
    }

    @Override
    public Product inStock(long id) {
        Product oldProduct = getProduct(id);
        Product product = oldProduct;
        product = product.inStock(id);
        int index = products.indexOf(oldProduct);
        products.set(index, product);
        return product;
    }

    public void dummyData () {
        List<String> CATEGORIES = Arrays.asList(
                "Mobile Accessories",
                "Home Appliances",
                "Computer Peripherals",
                "Office Furniture",
                "Kitchen Essentials",
                "Health and Beauty",
                "Electronics Gadgets",
                "Automotive Parts",
                "Pet Supplies",
                "Outdoor Gear",
                "Fashion Apparel",
                "Sports Equipment",
                "Baby Products",
                "Grocery Items",
                "Books and Stationery",
                "Fitness Equipment",
                "Gaming Consoles",
                "Musical Instruments",
                "Personal Care Products",
                "Smart Home Devices"
        );

        List<String> PRODUCTS = Arrays.asList(
                "Phone Cases", "Chargers", "Screen Protectors", "Wireless Headphones",
                "Refrigerators", "Washing Machines", "Microwaves", "Air Conditioners",
                "Keyboards", "Mice", "Monitors", "External Hard Drives",
                "Desks", "Chairs", "File Cabinets", "Office Storage",
                "Blenders", "Coffee Makers", "Toasters", "Cutting Boards",
                "Skin Care Creams", "Hair Dryers", "Toothbrushes", "Perfumes",
                "Smart Watches", "Bluetooth Speakers", "VR Headsets", "Drones",
                "Car Batteries", "Tires", "Brake Pads", "Oil Filters",
                "Pet Food", "Beds", "Leashes", "Toys",
                "Tents", "Sleeping Bags", "Backpacks", "Hiking Boots",
                "T-Shirts", "Jeans", "Jackets", "Sneakers",
                "Basketballs", "Tennis Rackets", "Dumbbells", "Soccer Balls",
                "Diapers", "Strollers", "Baby Monitors", "Cribs",
                "Rice", "Flour", "Canned Goods", "Snacks",
                "Notebooks", "Pens", "Fiction Books", "Art Supplies",
                "Yoga Mats", "Dumbbells", "Resistance Bands", "Treadmills",
                "PlayStation", "Xbox", "Nintendo Switch", "Gaming PCs",
                "Guitars", "Drums", "Keyboards", "Violins",
                "Shampoo", "Toothpaste", "Lotion", "Deodorants",
                "Smart Lights", "Thermostats", "Security Cameras", "Smart Plugs"
        );

        List<Double> PRICES = Arrays.asList(
                19.99, 15.49, 8.99, 49.99, // Mobile Accessories
                499.99, 349.99, 99.99, 299.99, // Home Appliances
                29.99, 19.99, 129.99, 89.99, // Computer Peripherals
                199.99, 89.99, 149.99, 79.99, // Office Furniture
                39.99, 79.99, 25.99, 15.99, // Kitchen Essentials
                12.99, 49.99, 7.99, 29.99, // Health and Beauty
                199.99, 79.99, 299.99, 499.99, // Electronics Gadgets
                120.00, 60.00, 45.99, 25.99, // Automotive Parts
                25.99, 39.99, 12.99, 8.99, // Pet Supplies
                89.99, 49.99, 59.99, 99.99, // Outdoor Gear
                19.99, 49.99, 79.99, 59.99, // Fashion Apparel
                15.99, 59.99, 99.99, 29.99, // Sports Equipment
                40.00, 299.99, 129.99, 199.99, // Baby Products
                3.99, 1.49, 2.89, 4.99, // Grocery Items
                5.99, 3.49, 12.99, 15.99, // Books and Stationery
                19.99, 39.99, 15.99, 299.99, // Fitness Equipment
                499.99, 399.99, 349.99, 999.99, // Gaming Consoles
                199.99, 499.99, 249.99, 999.99, // Musical Instruments
                9.99, 3.49, 12.99, 6.99, // Personal Care Products
                29.99, 129.99, 199.99, 15.99  // Smart Home Devices
        );

        List<Long> PRODUCT_STOCKS = Arrays.asList(
                150L, 300L, 450L, 120L,  // Mobile Accessories
                25L, 40L, 15L, 30L,      // Home Appliances
                100L, 200L, 50L, 80L,    // Computer Peripherals
                10L, 30L, 5L, 70L,       // Office Furniture
                200L, 150L, 180L, 60L,   // Kitchen Essentials
                500L, 350L, 400L, 300L,  // Health and Beauty
                50L, 75L, 60L, 100L,     // Electronics Gadgets
                120L, 200L, 80L, 180L,   // Automotive Parts
                150L, 220L, 130L, 60L,   // Pet Supplies
                90L, 110L, 50L, 200L,    // Outdoor Gear
                500L, 300L, 250L, 600L,  // Fashion Apparel
                80L, 120L, 100L, 40L,    // Sports Equipment
                300L, 400L, 150L, 100L,  // Baby Products
                1000L, 2500L, 1500L, 2000L, // Grocery Items
                500L, 450L, 350L, 200L,  // Books and Stationery
                100L, 75L, 120L, 30L,    // Fitness Equipment
                80L, 200L, 50L, 120L,    // Gaming Consoles
                25L, 60L, 15L, 10L,      // Musical Instruments
                300L, 500L, 200L, 100L,  // Personal Care Products
                80L, 100L, 250L, 90L     // Smart Home Devices
        );

        List<LocalDate> EXPIRATION_DATES = Arrays.asList(
                LocalDate.of(2025, 5, 15),    // Expiration date set
                LocalDate.of(2024, 12, 1),    // Expiration date set
                null,                         // No expiration date
                LocalDate.of(2026, 3, 30),    // Expiration date set
                null,                         // No expiration date
                LocalDate.of(2024, 6, 15),    // Expiration date set
                LocalDate.of(2027, 8, 10),    // Expiration date set
                null,                         // No expiration date
                LocalDate.of(2024, 11, 30),   // Expiration date set
                LocalDate.of(2023, 9, 1),     // Expiration date set
                null,                         // No expiration date
                LocalDate.of(2025, 10, 22),   // Expiration date set
                null,                         // No expiration date
                LocalDate.of(2024, 7, 5),     // Expiration date set
                LocalDate.of(2026, 2, 18),    // Expiration date set
                null,                         // No expiration date
                LocalDate.of(2023, 12, 25),   // Expiration date set
                LocalDate.of(2027, 4, 12),    // Expiration date set
                LocalDate.of(2024, 1, 1),     // Expiration date set
                null                          // No expiration date
        );

        for (int i = 0; i < 20; i++) {
            create(CATEGORIES.get(i), PRODUCTS.get(i), PRICES.get(i), EXPIRATION_DATES.get(i), PRODUCT_STOCKS.get(i));
        }

    }

}
