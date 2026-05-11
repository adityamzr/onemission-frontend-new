<template>
  <div ref="bgEl" class="min-h-screen relative bg-gradient-silver">
    <!-- Noise Layer -->
    <div class="noise-layer"></div>
    <!-- CONTENT -->
    <Header />
    <main class="relative">
      <slot />
    </main>
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue'
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
  document.documentElement.style.setProperty('--primary-color', '#2b7fff')
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
      rgba(211, 211, 211, 0.9),
      rgba(159, 159, 159, 0.4) 50%,
      rgba(96, 96, 96, 0.2) 100%,
      rgba(0,0,0,0.9) 100%
    ),
    linear-gradient(
      135deg,
      color-mix(in srgb, var(--primary-color) 80%, white),
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
      rgba(189, 189, 189, 0.774),
      rgba(200,200,200,0.4) 50%,
      rgba(120,120,120,0.2) 100%,
      rgba(0,0,0,0.9) 100%
    ),
    linear-gradient(
      135deg,
      color-mix(in srgb, var(--primary-color-next, var(--primary-color)) 80%, white),
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