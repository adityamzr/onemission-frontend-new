<template>
  <div class="min-h-screen overflow-hidden bg-gradient-silver">
    <!-- Noise Layer -->
    <div class="noise-layer"></div>
    <Header />
    <main class="overflow-hidden">
      <slot />
    </main>
    <!-- <Footer /> -->
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue'
// import Footer from '~/components/Footer.vue'

const x = ref(50)
const y = ref(50)

const handleMouseMove = (e) => {
  x.value = (e.clientX / window.innerWidth) * 100
  y.value = (e.clientY / window.innerHeight) * 100

  document.documentElement.style.setProperty('--x', `${x.value}%`)
  document.documentElement.style.setProperty('--y', `${y.value}%`)
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})
</script>

<style>
/* Gradient silver putih hitam */
.bg-gradient-silver {
  background: 
    radial-gradient(
      circle at var(--x, 50%) var(--y, 50%),
      rgba(255,255,255,0.25),
      transparent 20%
    ),
    radial-gradient(
      circle at 0% 90%,
      rgba(255,255,255,0.9),
      rgba(200,200,200,0.4) 50%,
      rgba(120,120,120,0.2) 100%,
      rgba(0,0,0,0.9) 100%
    ),
    linear-gradient(
      135deg,
      #2b7fff,
      #345991,
      #353535
    );
    
    transition: background 0.2s ease;
}

/* Noise layer */
.noise-layer {
  position: fixed;
  inset: 0;
  background-image: url('../public/images/rice-paper-3.png'); /* pakai texture noise */
  opacity: 90%;
  mix-blend-mode: overlay;
  pointer-events: none;
  z-index: 1;
}
</style>