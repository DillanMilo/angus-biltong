export async function fetchProducts() {
  try {
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error(`Failed to fetch products: ${res.statusText}`);
    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function fetchProductById(productId: number) {
  try {
    const res = await fetch(`/api/products/${productId}`);
    if (!res.ok) throw new Error(`Failed to fetch product: ${res.statusText}`);
    return res.json();
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error);
    throw error;
  }
}
  