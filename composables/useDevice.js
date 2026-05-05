// composables/useDevice.js
export const useDevice = () => {
  const isMobile = ref(false);

  const check = () => {
    isMobile.value = window.innerWidth < 768;
  };

  onMounted(() => {
    check();
    window.addEventListener("resize", check);
  });

  return { isMobile };
};
