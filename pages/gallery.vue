<template>
  <div class="inset-0">
    <div v-for="gallery in galleries" :key="gallery.id">
      <img class="w-full h-auto" :src="gallery.image_path" :alt="gallery.name" />
    </div>
  </div>
</template>

<script setup>
import { useGalleryStore } from '@/stores/galleryStore';

const galleryStore = useGalleryStore();
const galleries = computed(() => galleryStore.galleries);

onMounted(() => {
  galleryStore.fetchGalleries();
  console.log(galleryStore.galleries);
})

</script>