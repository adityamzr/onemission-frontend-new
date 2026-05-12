<template>
  <div ref="bgEl" class="min-h-screen relative bg-gradient-silver">
    <!-- Noise Layer -->
    <div class="noise-layer"></div>
    <!-- CONTENT -->
    <Header />
    <main class="relative">
      <slot />
    </main>
    <CartDrawer />
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue'
import CartDrawer from '~/components/cart/CartDrawer.vue'
// import Footer from '~/components/Footer.vue'

const x = ref(50)
const y = ref(50)
let ticking = false

// const handleMouseMove = (e) => {
//   if (!ticking) {
//     requestAnimationFrame(() => {
//       x.value = (e.clientX / window.innerWidth) * 100
//       y.value = (e.clientY / window.innerHeight) * 100

//       document.documentElement.style.setProperty('--x', `${x.value}%`)
//       document.documentElement.style.setProperty('--y', `${y.value}%`)

//       ticking = false
//     })
//     ticking = true
//   }
// }

const bgEl = ref(null)
const isReady = ref(false)
let timeoutId = null

const setColor = (color) => {
  // 🔥 HARD GUARD (ini yang belum kamu punya)
  if (!isReady.value || !bgEl.value) return

  if (timeoutId) clearTimeout(timeoutId)

  document.documentElement.style.setProperty('--primary-color-next', color)

  bgEl.value.classList.add('is-transitioning')

  timeoutId = setTimeout(() => {
    // 🔥 guard ulang (VERY IMPORTANT)
    if (!isReady.value || !bgEl.value) return

    document.documentElement.style.setProperty('--primary-color', color)
    bgEl.value.classList.remove('is-transitioning')
  }, 600)
}

provide('setBgColor', setColor)

onMounted(() => {
  // window.addEventListener('mousemove', handleMouseMove)
  document.documentElement.style.setProperty('--primary-color', '#2e4360')
  isReady.value = true
})

onUnmounted(() => {
  // window.removeEventListener('mousemove', handleMouseMove)
  isReady.value = false
  if (timeoutId) clearTimeout(timeoutId)
})
</script>

<style>
/* Gradient silver putih hitam */
.bg-gradient-silver {
  position: relative;
  overflow: hidden;
}

/* LAYER BASE (current color) */
.bg-gradient-silver::before,
.bg-gradient-silver::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
}

/* Layer aktif */
.bg-gradient-silver::before {
  background: 
    
    radial-gradient(
      circle at 0% 90%,
      rgba(234, 252, 254, 0.9),
      rgba(188,207,221,0.4) 50%,
      rgba(66,100,128,0.2) 100%,
      rgba(46,67,96,0.9) 100%
    ),
    linear-gradient(
      135deg,
      color-mix(in srgb, var(--primary-color) 90%, white),
      color-mix(in srgb, var(--primary-color) 100%, transparent),
      color-mix(in srgb, var(--primary-color) 0%, black)
    );

  opacity: 1;
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Layer transisi */
.bg-gradient-silver::after {
  background: 
    
    radial-gradient(
      circle at 0% 90%,
      rgba(234, 252, 254, 0.9),
      rgba(188,207,221,0.4) 50%,
      rgba(66,100,128,0.2) 100%,
      rgba(46,67,96,0.9) 100%
    ),
    linear-gradient(
      135deg,
      color-mix(in srgb, var(--primary-color-next, var(--primary-color)) 90%, white),
      color-mix(in srgb, var(--primary-color-next, var(--primary-color)) 100%, transparent),
      color-mix(in srgb, var(--primary-color-next, var(--primary-color)) 0%, black)
    );

  opacity: 0;
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Saat aktif fade */
.bg-gradient-silver.is-transitioning::after {
  opacity: 1;
}

/* Noise layer */
.noise-layer {
  position: absolute;
  inset: 0;
  background-image: url('/images/rice-paper-3.png');
  opacity: 90%;
  mix-blend-mode: overlay;
  pointer-events: none;
}
</style>