<template>
  <img
    :src="product.image"
    class="w-[90%] object-contain transition-all duration-300 ease-out cursor-pointer hover:scale-110"
    :style="style"
    @mouseenter="setBgColor(product.color)"
    @mouseleave="setBgColor('#2b7fff')"
  />
</template>

<script setup>
defineProps({
  product: Object,
  style: Object
})

const setBgColor = inject('setBgColor')

// const setColor = (color) => {
//   document.documentElement.style.setProperty('--primary-color', color)
// }

// const resetColor = () => {
//   document.documentElement.style.setProperty('--primary-color', '#2b7fff')
// }
</script>