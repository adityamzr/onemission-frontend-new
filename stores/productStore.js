import { defineStore } from "pinia";
import { productService } from "@/services/productService";

export const useProductStore = defineStore("product", () => {
  const products = ref([]);
  const loading = ref(false);

  const fetchProducts = async () => {
    loading.value = true;

    try {
      const data = await productService.getProducts();
      products.value = data;
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  return {
    products,
    loading,
    fetchProducts,
  };
});
