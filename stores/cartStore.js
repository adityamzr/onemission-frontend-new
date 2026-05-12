import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    isOpen: false,
  }),

  getters: {
    cartCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },

    cartSubtotal: (state) => {
      return state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },

    checkoutPayload: (state) => {
      return state.items.map((item) => ({
        product_id: item.id,
        variant_id: item.variantId,
        size: item.size,
        quantity: item.quantity,
      }));
    },
  },

  actions: {
    toggleCart() {
      this.isOpen = !this.isOpen;
    },

    openCart() {
      this.isOpen = true;
    },

    closeCart() {
      this.isOpen = false;
    },

    addToCart(product) {
      const existing = this.items.find(
        (item) =>
          item.variantId === product.variantId && item.size === product.size,
      );

      if (existing) {
        existing.quantity++;
      } else {
        this.items.push({
          id: product.id,
          variantId: product.variantId,
          name: product.name,
          slug: product.slug,
          image: product.image,
          size: product.size,
          quantity: 1,
          price: product.price,
        });
      }

      this.openCart();

      this.saveCart();
    },

    increaseQuantity(index) {
      this.items[index].quantity++;

      this.saveCart();
    },

    decreaseQuantity(index) {
      if (this.items[index].quantity <= 1) {
        this.removeItem(index);
        return;
      }

      this.items[index].quantity--;

      this.saveCart();
    },

    removeItem(index) {
      this.items.splice(index, 1);

      this.saveCart();
    },

    clearCart() {
      this.items = [];

      this.saveCart();
    },

    saveCart() {
      localStorage.setItem("onemission-cart", JSON.stringify(this.items));
    },

    loadCart() {
      const cart = localStorage.getItem("onemission-cart");

      if (cart) {
        this.items = JSON.parse(cart);
      }
    },
  },
});
