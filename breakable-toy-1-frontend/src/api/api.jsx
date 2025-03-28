const BASE_URL = "http://localhost:9090"; // Base URL for the API

/**
 * Fetches products from the backend with query parameters.
 * @param {string} queryParams - Query parameters for filtering and pagination.
 * @returns {Promise<Object>} - The fetched product data.
 */
export const fetchProducts = async (queryParams) => {
  const response = await fetch(`${BASE_URL}/pagination?${queryParams}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    const errorMessage = `Failed to fetch products: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage); // Throw an error with a meaningful message
  }
  return response.json();
};

/**
 * Creates a new product in the backend.
 * @param {Object} productData - The data of the product to create.
 * @returns {Promise<Object>} - The created product.
 */
export const createProduct = async (productData) => {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
  if (!response.ok) throw new Error("Failed to create product");
  return response.json();
};

/**
 * Deletes a product by ID.
 * @param {string} id - The ID of the product to delete.
 * @returns {Promise<Object>} - The response from the backend.
 */
export const deleteProduct = async (id) => {
  const response = await fetch(`${BASE_URL}/delete?id=${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to delete product");
  return response.json();
};

/**
 * Updates a product with the given data.
 * @param {string} id - The ID of the product to update.
 * @param {Object} productData - The updated product data.
 * @returns {Promise<Object>} - The updated product.
 */
export const updateProduct = async (id, productData) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error('Failed to update product');
  }

  return response.json();
};

/**
 * Fetches inventory metrics from the backend.
 * @returns {Promise<Object>} - The inventory metrics.
 */
export const fetchInventoryMetrics = async () => {
  const response = await fetch(`${BASE_URL}/total`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    const errorMessage = `Failed to fetch inventory metrics: ${response.status} ${response.statusText}`;
    throw new Error(errorMessage); // Throw an error with a meaningful message
  }
  return response.json();
};

/**
 * Fetches product categories from the backend.
 * @returns {Promise<Object>} - The fetched categories.
 */
export const fetchCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
};

/**
 * Marks a product as out of stock.
 * @param {string} id - The ID of the product to mark as out of stock.
 * @returns {Promise<Object>} - The response from the backend.
 */
export const markProductOutOfStock = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}/outofstock`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Failed to mark product ${id} as out of stock`);
  }

  return response.json();
};

/**
 * Marks a product as in stock.
 * @param {string} id - The ID of the product to mark as in stock.
 * @returns {Promise<Object>} - The response from the backend.
 */
export const markProductInStock = async (id) => {
  const response = await fetch(`${BASE_URL}/products/${id}/instock`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`Failed to mark product ${id} as in stock`);
  }

  return response.json();
};