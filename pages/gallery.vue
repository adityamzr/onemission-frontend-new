<template>
  <div class="min-h-screen inset-0">
    <div v-for="gallery in galleries" :key="gallery.id">
      <img class="w-full h-auto object-cover" :src="gallery.image_path" :alt="gallery.name" />
    </div>
  </div>
</template>

<script setup>
import { useGalleryStore } from '@/stores/galleryStore';

const galleryStore = useGalleryStore();
const galleries = computed(() => galleryStore.galleries);

onMounted(() => {
  galleryStore.fetchGalleries();
})

</script>