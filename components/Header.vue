<template>
  <header class="fixed top-0 left-0 w-full bg-transparent z-50">
    <div class="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 md:h-28 h-20 md:mt-0 mt-4 flex items-center justify-between">
      <div class="flex items-center space-x-1">
        <!-- Logo -->
        <NuxtLink to="/" class="
        sm:px-6 px-4 py-0.5 rounded-full glassmorphism text-white 
        sm:text-4xl text-3xl font-chakra-bold 
        sm:space-x-1.5 space-x-1">
          <span>O</span>
          <span>N</span>
          <span>E</span>
          <span>M</span>
          <span>I</span>
          <span>S</span>
          <span>S</span>
          <span>I</span>
          <span>O</span>
          <span>N</span>
        </NuxtLink>

        <!-- Desktop Menu -->
        <div class="relative">
          <!-- DESKTOP -->
          <div
            v-if="!isMobile"
            :class="[
              'relative flex items-center rounded-full glassmorphism overflow-hidden',
              'transition-[width,padding] duration-500 ease-in-out',
              isOpen ? 'w-[320px] px-12 py-2' : 'w-20 h-12 px-4'
            ]"
          >
            <!-- COUNTER -->
            <span
              class="absolute cursor-pointer left-3.5 text-md font-semibold rounded-full h-6 w-6 flex items-center justify-center bg-white/90 text-black/90 z-10"
              @click="cartStore.toggleCart()"
            >
              {{ cartStore.cartCount }}
            </span>

            <!-- MENU -->
            <div class="flex-1 flex justify-center">
              <div
                class="flex items-center gap-4 text-white text-lg font-bold tracking-wider transition-all duration-300"
                :class="isOpen 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-4 pointer-events-none'"
              >
                <NuxtLink to="/" @click="toggleMenu()" class="cursor-pointer hover:opacity-60">Shop</NuxtLink>
                <NuxtLink to="/gallery" @click="toggleMenu()" class="cursor-pointer hover:opacity-60">Gallery</NuxtLink>
                <NuxtLink to="/policies" @click="toggleMenu()" class="cursor-pointer hover:opacity-60">Policies</NuxtLink>
              </div>
            </div>

            <!-- ICON -->
            <div
              class="absolute right-3.5 w-6 h-6 cursor-pointer"
              @click.stop="isOpen = !isOpen"
            >
              <PlusIcon
                class="absolute w-6 h-6 text-white transition-all duration-300"
                :class="isOpen ? 'rotate-45 opacity-0' : 'rotate-0 opacity-100'"
              />
              <XMarkIcon
                class="absolute w-6 h-6 text-white transition-all duration-300"
                :class="isOpen ? 'rotate-0 opacity-100' : '-rotate-45 opacity-0'"
              />
            </div>
          </div>

          <!-- MOBILE -->
          <div
            v-else
            class="relative flex items-center justify-center w-20 sm:h-12 h-10 py-5 px-4 rounded-full glassmorphism"
          >
            <span
              class="absolute cursor-pointer left-3.5 text-md font-semibold rounded-full h-6 w-6 flex items-center justify-center bg-white/90 text-black/90"
              @click="cartStore.toggleCart()"
            >
              {{ cartStore.cartCount }}
            </span>

            <div
              class="absolute right-3.5 w-6 h-6 cursor-pointer"
              @click="toggleMenu()"
            >
              <PlusIcon
                class="absolute w-6 h-6 text-white transition-all duration-300"
                :class="isModalOpen ? 'rotate-45 opacity-0' : 'rotate-0 opacity-100'"
              />
              <XMarkIcon
                class="absolute w-6 h-6 text-white transition-all duration-300"
                :class="isModalOpen ? 'rotate-0 opacity-100' : '-rotate-45 opacity-0'"
              />
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Mobile Menu -->
      <Transition name="fade">
        <div v-if="isModalOpen" class="md:hidden z-50 w-full px-4">
          <div class="px-4 py-4 space-y-2 glassmorphism rounded-xl text-white text-lg font-bold tracking-wider">
            <NuxtLink to="/" @click="toggleMenu()" class="flex justify-between cursor-pointer hover:opacity-60">
              <span>Shop</span>
              <ArrowLongRightIcon class="inline-block ml-2 w-5 h-5" />
            </NuxtLink>
            <NuxtLink to="/gallery" @click="toggleMenu()" class="flex justify-between cursor-pointer hover:opacity-60">
              <span>Gallery</span>
              <ArrowLongRightIcon class="inline-block ml-2 w-5 h-5" />
            </NuxtLink>
            <NuxtLink to="/policies" @click="toggleMenu()" class="flex justify-between cursor-pointer hover:opacity-60">
              <span>Policies</span>
              <ArrowLongRightIcon class="inline-block ml-2 w-5 h-5" />
            </NuxtLink>
          </div>
        </div>
      </Transition>
  </header>
</template>

<script setup>  
import { PlusIcon, XMarkIcon, ArrowLongRightIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '~/stores/cartStore' 

const isOpen = ref(false)
const isModalOpen = ref(false)
const { isMobile } = useDevice()

const cartStore = useCartStore()

const toggleMenu = () => {
  if (isMobile.value) {
    isModalOpen.value = !isModalOpen.value
  } else {
    isOpen.value = !isOpen.value
  }
}
</script>