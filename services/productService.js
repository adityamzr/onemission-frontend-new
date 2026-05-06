export const productService = {
  async getProducts() {
    try {
      // nanti ganti ke API real
      // return await $fetch('/api/products')

      return [
        // {
        //   id: 1,
        //   image:
        //     "https://ik.imagekit.io/fkoy34ckk/onemission-dev/space-o-singlet-falcon-outfit-1-removebg-preview.png",
        // },
        {
          id: 2,
          image:
            "https://ik.imagekit.io/fkoy34ckk/onemission-dev/softcell-hoodie-aged-black-1-removebg-preview.png",
        },
        {
          id: 3,
          image:
            "https://ik.imagekit.io/fkoy34ckk/onemission-dev/justice-cordura-off-white-1-removebg-preview.png",
        },
        {
          id: 4,
          image:
            "https://ik.imagekit.io/fkoy34ckk/onemission-dev/re-possessed-auralite-dusk-1-removebg-preview.png",
        },
        {
          id: 5,
          image:
            "https://ik.imagekit.io/fkoy34ckk/onemission-dev/peaceshell-cap-quicksilver-1-removebg-preview.png",
        },
        // {
        //   id: 6,
        //   image:
        //     "https://ik.imagekit.io/fkoy34ckk/onemission-dev/auralite-shirt-pigment-burgundy-outfit-2-removebg-preview.png",
        // },
        {
          id: 7,
          image:
            "https://ik.imagekit.io/fkoy34ckk/onemission-dev/techsilk-short-black-silk-1-removebg-preview.png",
        },
        {
          id: 8,
          image:
            "https://ik.imagekit.io/fkoy34ckk/onemission-dev/merino-nylon-tube-socks-black-1-removebg-preview.png",
        },
        {
          id: 9,
          image:
            "https://ik.imagekit.io/fkoy34ckk/onemission-dev/space-o-singlet-deep-mahogany-1-removebg-preview.png",
        },
        {
          id: 10,
          image:
            "https://ik.imagekit.io/fkoy34ckk/onemission-dev/WhatsApp_Image_2025-07-30_at_15.54.32_c620383e-removebg-preview.png",
        },
      ];
    } catch (error) {
      console.error("API Error:", error);
      return [];
    }
  },
};
