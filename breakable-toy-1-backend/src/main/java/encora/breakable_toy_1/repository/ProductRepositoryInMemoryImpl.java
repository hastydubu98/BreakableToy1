package encora.breakable_toy_1.repository;

import encora.breakable_toy_1.model.Product;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class ProductRepositoryInMemoryImpl implements ProductRepository{

    private ArrayList<Product> products;
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

        List<LocalDate> PRODUCT_DATES = Arrays.asList(
                LocalDate.of(2023, 5, 15),  // Mobile Accessories
                LocalDate.of(2022, 11, 1),  // Mobile Accessories
                LocalDate.of(2023, 7, 20),  // Mobile Accessories
                LocalDate.of(2023, 3, 10),  // Mobile Accessories
                LocalDate.of(2021, 12, 5),  // Home Appliances
                LocalDate.of(2023, 6, 30),  // Home Appliances
                LocalDate.of(2020, 8, 25),  // Home Appliances
                LocalDate.of(2023, 9, 14),  // Home Appliances
                LocalDate.of(2022, 4, 22),  // Computer Peripherals
                LocalDate.of(2021, 5, 16),  // Computer Peripherals
                LocalDate.of(2023, 8, 10),  // Computer Peripherals
                LocalDate.of(2023, 1, 1),   // Computer Peripherals
                LocalDate.of(2022, 7, 5),   // Office Furniture
                LocalDate.of(2023, 5, 25),  // Office Furniture
                LocalDate.of(2023, 3, 15),  // Office Furniture
                null,                       // Office Furniture
                LocalDate.of(2023, 10, 1),  // Kitchen Essentials
                LocalDate.of(2022, 2, 18),  // Kitchen Essentials
                LocalDate.of(2021, 9, 12),  // Kitchen Essentials
                LocalDate.of(2020, 5, 25),  // Kitchen Essentials
                LocalDate.of(2022, 12, 15), // Health and Beauty
                LocalDate.of(2023, 4, 22),  // Health and Beauty
                LocalDate.of(2021, 6, 18),  // Health and Beauty
                null,                       // Health and Beauty
                LocalDate.of(2023, 8, 1),   // Electronics Gadgets
                LocalDate.of(2023, 6, 15),  // Electronics Gadgets
                null,                       // Electronics Gadgets
                LocalDate.of(2022, 3, 10),  // Electronics Gadgets
                LocalDate.of(2021, 10, 5),  // Automotive Parts
                null,                       // Automotive Parts
                LocalDate.of(2023, 7, 25),  // Automotive Parts
                LocalDate.of(2022, 12, 30), // Automotive Parts
                LocalDate.of(2022, 5, 19),  // Pet Supplies
                null,                       // Pet Supplies
                LocalDate.of(2023, 8, 15),  // Pet Supplies
                LocalDate.of(2021, 11, 8),  // Pet Supplies
                LocalDate.of(2023, 2, 22),  // Outdoor Gear
                LocalDate.of(2023, 9, 12),  // Outdoor Gear
                LocalDate.of(2021, 12, 1),  // Outdoor Gear
                null,                       // Outdoor Gear
                LocalDate.of(2022, 6, 10),  // Fashion Apparel
                LocalDate.of(2023, 5, 20),  // Fashion Apparel
                LocalDate.of(2021, 7, 12),  // Fashion Apparel
                null,                       // Fashion Apparel
                LocalDate.of(2023, 4, 14),  // Sports Equipment
                null,                       // Sports Equipment
                LocalDate.of(2022, 3, 25),  // Sports Equipment
                LocalDate.of(2023, 1, 1),   // Sports Equipment
                LocalDate.of(2021, 6, 8),   // Baby Products
                LocalDate.of(2023, 9, 1),   // Baby Products
                LocalDate.of(2022, 4, 5),   // Baby Products
                null,                       // Baby Products
                LocalDate.of(2023, 6, 7),   // Grocery Items
                LocalDate.of(2021, 10, 19), // Grocery Items
                LocalDate.of(2022, 12, 15), // Grocery Items
                LocalDate.of(2023, 3, 10),  // Grocery Items
                null,                       // Books and Stationery
                LocalDate.of(2022, 1, 15),  // Books and Stationery
                LocalDate.of(2023, 8, 25),  // Books and Stationery
                LocalDate.of(2023, 4, 10),  // Books and Stationery
                LocalDate.of(2023, 7, 1),   // Fitness Equipment
                LocalDate.of(2021, 9, 18),  // Fitness Equipment
                LocalDate.of(2022, 11, 11), // Fitness Equipment
                LocalDate.of(2023, 5, 5),   // Fitness Equipment
                LocalDate.of(2022, 8, 20),  // Gaming Consoles
                null,                       // Gaming Consoles
                LocalDate.of(2023, 7, 10),  // Gaming Consoles
                LocalDate.of(2021, 10, 30), // Gaming Consoles
                LocalDate.of(2023, 6, 5),   // Musical Instruments
                LocalDate.of(2022, 11, 8),  // Musical Instruments
                null,                       // Musical Instruments
                LocalDate.of(2021, 12, 25), // Musical Instruments
                LocalDate.of(2023, 9, 12),  // Personal Care Products
                null,                       // Personal Care Products
                LocalDate.of(2021, 10, 7),  // Personal Care Products
                LocalDate.of(2022, 1, 10),  // Personal Care Products
                LocalDate.of(2023, 3, 25)   // Smart Home Devices
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

        for (int i = 0; i < 20; i++) {
            create(CATEGORIES.get(i), PRODUCTS.get(i), PRICES.get(i), PRODUCT_DATES.get(i), PRODUCT_STOCKS.get(i));
        }

    }

}
