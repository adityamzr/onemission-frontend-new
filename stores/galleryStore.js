import { defineStore } from "pinia";
import { galleryService } from "@/services/galleryService";

export const useGalleryStore = defineStore("gallery", () => {
  const galleries = ref([]);
  const loading = ref(false);

  const fetchGalleries = async () => {
    loading.value = true;

    try {
      const data = await galleryService.getGalleries();
      // console.log("Fetched galleries:", data);
      galleries.value = data;
    } catch (e) {
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  return {
    galleries,
    loading,
    fetchGalleries,
  };
});
