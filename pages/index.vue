<template>
   <div class="min-h-screen">
     <ProductGrid :products="store.products" />
   </div>
</template>

<script setup>
import ProductGrid from '@/components/ProductGrid.vue'
import { useProductStore } from '@/stores/productStore'

const store = useProductStore()

onMounted(() => {
  store.fetchProducts()
})

</script>