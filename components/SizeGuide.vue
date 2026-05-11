<template>
  <div class="fixed inset-0 z-40 flex items-center justify-center">
    <!-- 🔥 BACKDROP -->
    <div class="absolute inset-0 bg-black/20 backdrop-blur-xs"></div>

    <div class="relative z-10 glassmorphism rounded-lg p-6 w-100 mx-5 md:mx-0 max-w-full text-white">
      <XMarkIcon @click="$emit('close')" class="w-5 h-5 cursor-pointer absolute top-3 right-3 opacity-60"></XMarkIcon>
      <h2 class="text-xl font-bold mb-4">Size Guide</h2>
      <p class="text-sm mb-4">Please refer to the size chart below to find your perfect fit.</p>
      <table class="w-full text-center border-collapse mb-3">
        <thead>
          <tr>
            <th
              v-for="header in guide.headers"
              :key="header"
              class="border-b py-2"
            >
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in guide.rows"
            :key="index"
          >
            <td
              v-for="(cell, i) in row"
              :key="i"
              class="border-b py-2"
            >
              {{ cell }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
  category: {
    type: String,
    default: 'default'
  }
})

const sizeGuides = {
  shirts: {
    headers: ['Size', 'Chest', 'Waist', 'Hip'],
    rows: [
      ['S', '34-36', '28-30', '34-36'],
      ['M', '38-40', '32-34', '38-40'],
      ['L', '42-44', '36-38', '42-44'],
    ]
  },

  caps: {
    headers: ['Size', 'Head Circumference'],
    rows: [
      ['S/M', '54-56 cm'],
      ['L/XL', '57-60 cm'],
    ]
  },

  socks: {
    headers: ['Size', 'EU', 'US'],
    rows: [
      ['S', '36-39', '5-7'],
      ['M', '40-43', '8-10'],
    ]
  }
}

const guide = computed(() => {
  return sizeGuides[props.category] || sizeGuides.shirts
})
</script>