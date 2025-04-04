export default class ExternalServices {
  constructor(baseURL = "/api") {
    this.baseURL = baseURL;
  }

  async getData(category) {
    try {
      const response = await fetch(`${this.baseURL}/products?category=${category}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  async getProductById(productId) {
    try {
      const response = await fetch(`${this.baseURL}/products/${productId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching product details:", error);
      throw error;
    }
  }
}
