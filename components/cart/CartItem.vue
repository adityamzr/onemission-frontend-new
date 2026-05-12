<template>
  <div class="flex gap-4">

    <!-- IMAGE -->
    <img
      :src="item.image"
      class="w-24 h-24 object-cover rounded-lg"
    />

    <!-- CONTENT -->
    <div class="flex-1">

      <h3 class="font-semibold">
        {{ item.name }}
      </h3>

      <p class="text-sm opacity-60">
        Size: {{ item.size }}
      </p>

      <span>
        {{
          formatCurrency(
            item.price * item.quantity
          )
        }}
      </span>

      <div
        class="mt-2 flex items-center justify-between"
      >

        <!-- COUNTER -->
        <div
          class="flex items-center gap-3"
        >
          <button @click="$emit('decrease')" class="cursor-pointer">
            -
          </button>

          <span>
            {{ item.quantity }}
          </span>

          <button @click="$emit('increase')" class="cursor-pointer">
            +
          </button>
        </div>

        <!-- REMOVE -->
        <button
          @click="$emit('remove')"
          class="text-red-300 hover:text-red-400 text-sm cursor-pointer"
        >
          <TrashIcon class="w-5 h-5" />
        </button>

      </div>

    </div>

  </div>
</template>

<script setup>
import { TrashIcon } from '@heroicons/vue/24/outline';

defineProps({
  item: Object
})
</script>
