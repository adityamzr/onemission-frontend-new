<template>
  <img
    :src="product.image"
    class="w-[90%] object-contain transition-all duration-300 ease-out cursor-pointer hover:scale-110"
    :style="style"
  />
</template>

<script setup>
defineProps({
  product: Object,
  style: Object
})
</script>