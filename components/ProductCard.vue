<template>
  <div>
    <!-- SINGLE IMAGE MODE -->
    <NuxtLink v-if="!isDetail" :to="`/product/${product.variant?.slug}`" class="w-full flex justify-center items-center snap-center">
      <img
        :src="product.variant?.images?.[0]"
        class="w-[90%] object-contain transition-all duration-300 ease-out cursor-pointer hover:scale-110"
        :style="style"
        @mouseenter="setBgColor(product.variant?.colorCode)"
        @mouseleave="setBgColor('#2b7fff')"
      />
    </NuxtLink>

    <!-- GALLERY MODE -->
    <div v-else class="flex flex-col gap-4">
      <img
        v-for="(img, i) in product.variant?.images"
        :key="i"
        :src="img"
        class="w-full object-contain transition-all duration-300"
        @mouseenter="setBgColor(product.variant?.colorCode)"
      />
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'

defineProps({
  product: Object,
  style: Object,
  isDetail: {
    type: Boolean,
    default: false
  }
})

let hoverTimeout

const setBgColor = inject('setBgColor', () => {})

const handleHover = () => {
  clearTimeout(hoverTimeout)

  hoverTimeout = setTimeout(() => {
    if (product?.variant?.colorCode && setBgColor) {
      setBgColor(product.variant.colorCode)
    }
  }, 50)
}
</script>