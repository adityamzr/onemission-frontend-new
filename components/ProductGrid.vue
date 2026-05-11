<template>
  <!-- MOBILE -->
  <div
    v-if="isMobile"
    ref="container"
    class="h-screen overflow-y-scroll snap-y snap-mandatory snap-container"
    @scroll="onScroll"
  >
    <div
      v-for="(item, i) in loopedProducts"
      :key="`${item.id}-${i}`"
      ref="items"
      class="h-[57%] flex items-center justify-center snap-center"
    >
      <ProductCard :product="item" :style="styles[i]" />
    </div>
  </div>

  <!-- DESKTOP -->
  <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 md:gap-32 p-6 md:pt-44">
    <div
      v-for="item in products"
      :key="item.id"
      class="relative flex items-center justify-center h-75">
      <ProductCard :product="item" :style="getRandomStyle(item.id)" />
    </div>
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'

const props = defineProps({
  products: Array
})

const isMobile = ref(false)
const container = ref(null)
const items = ref([])

const styles = ref([])
const itemHeight = ref(0)

let isJumping = false

// 🔁 Loop 3x (infinite illusion)
const loopedProducts = computed(() => [
  ...props.products,
  ...props.products,
  ...props.products
])

// 📱 Detect mobile
function check() {
  isMobile.value = window.innerWidth < 768
}

// 📏 Get REAL item height (karena pakai 57%)
function calculateHeight() {
  nextTick(() => {
    const el = items.value?.[0]
    if (el) {
      itemHeight.value = el.offsetHeight
    }
  })
}

// 🎯 Core: dynamic blur + scale
function updateStyles() {
  const center = window.innerHeight / 2

  styles.value = items.value.map((el) => {
    if (!el) return {}

    const rect = el.getBoundingClientRect()
    const itemCenter = rect.top + rect.height / 2

    const distance = Math.abs(center - itemCenter)
    const max = window.innerHeight / 2

    const ratio = Math.min(distance / max, 1)

    const scale = 1 - ratio * 0.3
    const blur = ratio * 8
    const opacity = 1 - ratio * 0.5

    return {
      transform: `scale(${scale})`,
      filter: `blur(${blur}px)`,
      opacity
    }
  })
}

// 🔁 Infinite scroll logic
function onScroll() {
  if (isJumping) return

  const el = container.value
  if (!el || !itemHeight.value) return

  const total = props.products.length
  const blockHeight = total * itemHeight.value
  const scrollTop = el.scrollTop

  // 🔥 update animation realtime
  requestAnimationFrame(updateStyles)

  // ⬇️ loop ke bawah
  if (scrollTop >= blockHeight * 2) {
    isJumping = true

    el.style.scrollSnapType = 'none'
    el.scrollTop = scrollTop - blockHeight

    requestAnimationFrame(() => {
      el.style.scrollSnapType = 'y mandatory'
      isJumping = false
      updateStyles()
    })
  }

  // ⬆️ loop ke atas
  else if (scrollTop <= blockHeight * 0.5) {
    isJumping = true

    el.style.scrollSnapType = 'none'
    el.scrollTop = scrollTop + blockHeight

    requestAnimationFrame(() => {
      el.style.scrollSnapType = 'y mandatory'
      isJumping = false
      updateStyles()
    })
  }
}

// Random styles for desktop
const randomMap = new Map()

function getRandomStyle(id) {
  // supaya randomnya konsisten (tidak berubah tiap render)
  if (!randomMap.has(id)) {
    randomMap.set(id, {
      x: (Math.random() - 0.5) * 40,
      y: (Math.random() - 0.5) * 160,
      scale: 0.85 + Math.random() * 0.3 // 0.85 - 1.15
    })
  }

  const r = randomMap.get(id)

  return {
    transform: `translate(${r.x}px, ${r.y}px) scale(${r.scale})`
  }
}

onMounted(() => {
  check()
  window.addEventListener('resize', check)

  nextTick(() => {
    calculateHeight()

    const el = container.value
    if (!el) return

    // 🔥 start di tengah
    setTimeout(() => {
      el.scrollTop = props.products.length * itemHeight.value
      updateStyles()
    }, 50)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', check)
})
</script>

<style scoped>
/* 🎯 Biar tetap center walaupun 57% */
.snap-container {
  scroll-padding-top: 21.5vh;
  scroll-padding-bottom: 21.5vh;
}
</style>