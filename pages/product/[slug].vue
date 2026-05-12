<template>
  <div class="min-h-screen relative overflow-hidden">

    <!-- 🧊 PRODUCT IMAGE CENTER -->
    <!-- <div class="absolute inset-0 flex items-center justify-center z-10">
      <Transition name="fade" mode="out-in">
        <img
          :key="activeImage"
          :src="activeImage"
          class="w-[40%] max-w-125 object-contain"
        />
      </Transition>
    </div> -->

    <div 
      ref="container"
      class="h-screen overflow-y-scroll snap-y snap-mandatory scroll-pt-[21.5vh] scroll-pb-[21.5vh]"
      @scroll="onScroll"
    >
      <div
        v-for="(item, i) in loopedItems"
        :key="`${item.id}-${i}`"
        ref="items"
        class="h-[57%] flex items-center justify-center snap-center"
      >
      <img
        :key="`${item}-${i}`"
        :src="item"
        :style="styles[i]"
        class="w-[40%] max-w-125 object-contain"
      />
      </div>
    </div>

    <!-- 📦 RIGHT PANEL -->
    <div class="absolute right-6 bottom-6 mx-auto md:mx-6 z-20 w-[320px]">
      <div class="glassmorphism p-5 rounded-xl text-white">
        <h2 v-if="product && product.variant" class="text-lg md:text-xl font-bold mb-2">
          {{ product.name || product.variant.slug || 'No Name' }}
        </h2>

        <p v-if="product && product.description" class="text-xs opacity-70 mb-4">
          {{ product.description || 'No description available' }}
        </p>

        <hr class="border border-white/40">

        <!-- COLOR -->
        <div class="my-4">
          <p class="text-sm font opacity-60 mb-2">COLOR <span v-if="product?.variant?.color !== null">[ {{ product?.variant?.color }} ]</span></p>
          <div class="flex gap-2">
            <div
              v-if="product?.variant?.colorCode"
              class="w-5 h-5 rounded-full border cursor-pointer border-white/90"
              :style="{ background: product.variant.colorCode }"
            />
            <NuxtLink :to="`/product/${item.slug}`"
              class="flex items-center justify-center"
              v-for="(item) in product?.otherVariants || []"
              :key="item.slug">
                <div
                  class="w-5 h-5 rounded-full cursor-pointer"
                  :style="{ backgroundColor: item.colorCode }"
                ></div>
            </NuxtLink>
          </div>
        </div>

        <!-- SIZE -->
        <div class="mt-4 mb-2" v-if="product?.variant?.sizes.length !== 0">
          <p class="text-sm opacity-60 mb-2">SIZE <span v-if="selectedSize?.size">[ {{ selectedSize?.size }} ]</span></p>
          <div class="flex gap-2">
            <div 
              v-for="(size, index) in product?.variant?.sizes"
              :key="index"
              class="relative w-fit rounded-md border border-white/30 py-1 px-3 flex gap-2 transition cursor-pointer"
              :class="{
                'bg-white/90 text-black/50': selectedSize === size,
                'hover:border-white/90': size.stock > 0 && selectedSize !== size
              }"
              @click="handleSize(size)"
              >
                <div
                  v-if="size.stock === 0"
                  :class="
                    selectedSize === size
                      ? 'bg-black/40'
                      : 'bg-white/40'
                  "
                  class="absolute w-[105%] h-px inset-0 -rotate-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                ></div>
                <span class="text-[10px] font-semibold flex items-center justify-center">
                  {{ size.size }}
                </span>
            </div>
          </div>
          <hr class="border border-white/40 mt-4 mb-2">
          <div class="flex items-center justify-end">
            <div class="w-fit cursor-pointer hover:underline flex items-center" @click="showSizeGuide = true">
              <span class="text-xs text-white/60">Size Guide</span>
              <ArrowTopRightOnSquareIcon class="w-3 h-3 inline-block ml-1 opacity-60"/>
            </div>
          </div>
        </div>

      </div>
      <!-- BUTTON -->
     <button
        :disabled="btnAddDisabled"
        class="w-full mt-4 flex px-3 py-2.5 rounded-lg font-semibold transition
              bg-white/40 text-black/50
              hover:bg-white/90
              cursor-pointer
              disabled:cursor-not-allowed
              disabled:bg-white/20
              disabled:text-black/30"
        :class="btnAddDisabled ? 'justify-center' : 'justify-between'"
        @click="addToCart()"
      >
        <span>
          {{ btnLabel }}
        </span>

        <span v-if="!btnAddDisabled">
          {{ formatCurrency(product?.price) }}
        </span>
      </button>
    </div>

    <!-- 🖼️ THUMBNAIL -->
    <!-- MOBILE -->
    <!-- DEKSTOP -->
    <div class="absolute bottom-6 left-6 z-20 hidden md:block">
      <div class="flex gap-3 glassmorphism px-4 py-2 rounded-xl">
        <img
          v-if="product && product.variant && product.variant.images"
          v-for="(img, i) in product.variant.images"
          :key="i"
          :src="img"
          class="w-12 h-12 object-contain cursor-pointer opacity-60 hover:opacity-100"
          :class="{ 'opacity-100! scale-110 border border-white': activeIndex === i }"
          @click="setActive(i)"
        />
      </div>
    </div>


    <!-- SIZE GUIDE MODAL -->
     <Transition name="fade">
       <SizeGuide v-if="showSizeGuide" :category="product?.category" @close="showSizeGuide = false" />
    </Transition>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cartStore'
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import SizeGuide from '~/components/SizeGuide.vue'
import {
  ref,
  computed,
  onMounted,
  nextTick,
  inject
} from 'vue'

const route = useRoute()
const store = useProductStore()
const emptySize = ref(false)
const selectedSize = ref(null)
const showSizeGuide = ref(false)

const product = ref(null)
const activeIndex = ref(0)

const container = ref(null)
const items = ref([])

const styles = ref([])
const itemHeight = ref(0)

const cartStore = useCartStore()

let isJumping = false
let animationFrame = null

// 🎨 Background color
const setBgColor = inject('setBgColor', () => {})

// 📦 Total original images
const totalImages = computed(() => {
  return product.value?.variant?.images?.length || 0
})

// 🔁 Infinite loop items
const loopedItems = computed(() => {
  const images = product.value?.variant?.images || []

  return [
    ...images,
    ...images,
    ...images
  ]
})

const isOutOfStock = computed(() => {
  return !product.value?.variant?.inStock
})

const btnAddDisabled = computed(() => {
  if (!selectedSize.value) {
    return true
  }
  return isOutOfStock.value || emptySize.value
})

const btnLabel = computed(() => {
  if (isOutOfStock.value || emptySize.value) {
    return 'OUT OF STOCK'
  }

  if (!selectedSize.value) {
    return 'CHOOSE YOUR SIZE'
  }

  return 'ADD TO CART'
})

// Add to cart
function addToCart() {
  cartStore.addToCart({
    id: product.value.id,
    variantId: product.value.variant.id,
    name: product.value.name,
    slug: product.value.variant.slug,
    image:
      product.value.variant.images[0],
    size: selectedSize.value.size,
    price: product.value.price
  })
}

// 📏 Calculate real item height
function calculateHeight() {
  nextTick(() => {
    const el = items.value?.[0]

    if (el) {
      itemHeight.value = el.offsetHeight
    }
  })
}

// 🎯 Dynamic blur + scale effect
function updateStyles() {
  const center = window.innerHeight / 2

  styles.value = items.value.map((el) => {
    if (!el) return {}

    const rect = el.getBoundingClientRect()

    const itemCenter =
      rect.top + rect.height / 2

    const distance = Math.abs(
      center - itemCenter
    )

    const ratio = Math.min(
      distance / (window.innerHeight / 2),
      1
    )

    return {
      transform: `scale(${1 - ratio * 0.3})`,
      filter: `blur(${ratio * 8}px)`,
      opacity: 1 - ratio * 0.5,
      transition:
        'transform .2s linear, filter .2s linear, opacity .2s linear'
    }
  })
}

// 🔁 Infinite scroll logic
function onScroll() {
  if (isJumping) return

  const el = container.value
  const total = totalImages.value

  if (!el || !itemHeight.value || !total) return

  const scrollTop = el.scrollTop
  const blockHeight = total * itemHeight.value

  // 🎯 Active index sync
  activeIndex.value =
    Math.round(scrollTop / itemHeight.value) %
    total

  // 🎨 Realtime animation update
  cancelAnimationFrame(animationFrame)

  animationFrame = requestAnimationFrame(() => {
    updateStyles()
  })

  // ⬇️ Infinite bottom
  if (scrollTop >= blockHeight * 2) {
    isJumping = true

    el.style.scrollSnapType = 'none'

    el.scrollTop =
      scrollTop - blockHeight

    requestAnimationFrame(() => {
      el.style.scrollSnapType =
        'y mandatory'

      isJumping = false

      updateStyles()
    })
  }

  // ⬆️ Infinite top
  else if (scrollTop <= blockHeight * 0.5) {
    isJumping = true

    el.style.scrollSnapType = 'none'

    el.scrollTop =
      scrollTop + blockHeight

    requestAnimationFrame(() => {
      el.style.scrollSnapType =
        'y mandatory'

      isJumping = false

      updateStyles()
    })
  }
}

// 🖼️ Thumbnail click
function setActive(i) {
  const el = container.value
  const total = totalImages.value

  if (!el || !itemHeight.value || !total)
    return

  activeIndex.value = i

  // 🎯 Scroll to middle block
  const targetIndex = total + i

  el.scrollTo({
    top: targetIndex * itemHeight.value,
    behavior: 'smooth'
  })
}

function handleSize(size) {
  selectedSize.value = size
  if(size.stock === 0) {
    emptySize.value = true
  } else {
    emptySize.value = false
  }
}

// 🚀 Init
onMounted(async () => {
  // 📦 Fetch products
  if (!store.products.length) {
    await store.fetchProducts()
  }
  // 🔍 Find product
  product.value = store.products.find(
    (p) =>
      p.variant?.slug ===
      route.params.slug
  )

  console.log('Found product:', product.value)

  // 🎨 Set background color
  if (product.value?.variant?.colorCode) {
    setBgColor(
      product.value.variant.colorCode
    )
  }

  nextTick(() => {
    calculateHeight()

    const el = container.value
    const total = totalImages.value

    if (!el || !total) return

    // 🎯 Start from middle block at index 0
    setTimeout(() => {
      el.scrollTop =
        total * itemHeight.value

      updateStyles()
    }, 50)
  })
})
</script>