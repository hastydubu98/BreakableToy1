const BASE_URL = "http://localhost:9090";

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

export const createProduct = async (productData) => {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
  if (!response.ok) throw new Error("Failed to create product");
  return response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${BASE_URL}/delete?id=${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Failed to delete product");
  return response.json();
};

export const updateProduct = async (id, productData) => {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
  if (!response.ok) throw new Error("Failed to update product");
  return response.json();
};

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

export const fetchCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
};