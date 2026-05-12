<template>
  <Transition name="slide">
    <div
      v-if="cartStore.isOpen"
      class="fixed inset-0 z-40"
    >

      <!-- BACKDROP -->
      <div
        class="absolute inset-0 bg-black/40 backdrop-blur-xs"
      ></div>

      <!-- DRAWER -->
      <div
        class="absolute left-0 md:top-28
        w-[403px]
        max-w-full

        glassmorphism
        text-white
        rounded-lg

        mx-6
        px-6
        py-4

        flex flex-col"
        :class="cartStore.items.length ? 'h-130' : 'h-auto'"
      >

        <!-- HEADER -->
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">
            Cart
          </h2>

          <button
            @click="cartStore.closeCart()"
            class="text-white/70 hover:text-white transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        <!-- EMPTY STATE -->
        <div
          v-if="!cartStore.items.length"
          class="flex-1 flex items-center justify-center my-5"
        >
          <p class="text-white/60">
            Cart is empty
          </p>
        </div>

        <!-- CONTENT -->
        <template v-else>

          <!-- ITEMS -->
          <div
            class="flex-1 mt-6 overflow-y-auto space-y-5 pr-1"
          >
            <CartItem
              v-for="(item, index) in cartStore.items"
              :key="index"
              :item="item"
              @increase="
                cartStore.increaseQuantity(index)
              "
              @decrease="
                cartStore.decreaseQuantity(index)
              "
              @remove="
                cartStore.removeItem(index)
              "
            />
          </div>

          <!-- BOTTOM -->
          <div
            class="pt-5 mt-5 border-t border-white/40"
          >

            <!-- SUMMARY -->
            <div
              class="flex items-center justify-between"
            >
              <span class="text-white/70">
                Subtotal
              </span>

              <span class="font-semibold">
                {{
                  formatCurrency(
                    cartStore.cartSubtotal
                  )
                }}
              </span>
            </div>

            <!-- CHECKOUT BUTTON -->
            <NuxtLink
              to="/checkout"
              class="mt-4 block"
            >
              <button
                class="w-full
                bg-white
                text-black
                py-3 cursor-pointer
                rounded-xl
                font-semibold
                transition
                hover:bg-white/90"
              >
                CHECKOUT
              </button>
            </NuxtLink>

            <!-- LOGO -->
            <div
              class="flex justify-center items-center mt-4"
            >
              <img
                src="/images/om-logo.png"
                class="w-8 h-8 opacity-60"
              />
            </div>

          </div>

        </template>

      </div>

    </div>
  </Transition>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()


</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>