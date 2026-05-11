export const galleryService = {
  async getGalleries() {
    try {
      // nanti ganti ke API real
      // return await $fetch('/api/galleries')
      return [
        {
          id: 1,
          name: "Space O Singlet",
          image_path:
            "https://ik.imagekit.io/fkoy34ckk/onemission-dev/WhatsApp%20Image%202026-05-09%20at%2017.54.55.jpeg",
        },
        {
          id: 2,
          name: "Softcell Hoodie",
          image_path:
            "https://ik.imagekit.io/fkoy34ckk/onemission-dev/WhatsApp%20Image%202026-05-09%20at%2017.54.55%20(2).jpeg",
        },
        {
          id: 3,
          name: "Justice Cordura",
          image_path:
            "https://ik.imagekit.io/fkoy34ckk/onemission-dev/WhatsApp%20Image%202026-05-09%20at%2017.54.55%20(1).jpeg",
        },
      ];
    } catch (error) {
      console.error("API Error:", error);
      return [];
    }
  },
};
