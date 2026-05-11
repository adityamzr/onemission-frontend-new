export const productService = {
  async getProducts() {
    try {
      // nanti ganti ke API real
      // return await $fetch('/api/products')

      return [
        // {
        //   id: 1,
        //   name: "Space O Singlet",
        //   description: "Space O Singlet adalah kaos tanpa lengan yang terbuat dari bahan campuran katun organik dan serat auralite, memberikan kenyamanan maksimal dengan sentuhan futuristik.",
        //   price: 250000,
        //   category: "Singlet",
        //   otherVariants: [],
        //   isActive: true,
        //   variant: {
        //     id: 1,
        //     slug: "space-o-singlet-falcon-outfit",
        //     inStock: true,
        //     color: null,
        //     colorCode: null,
        //     sizes: [],
        //     images: [
        //       "https://ik.imagekit.io/fkoy34ckk/onemission-dev/space-o-singlet-falcon-outfit-1-removebg-preview.png",
        //     ],
        //   },
        // },
        {
          id: 2,
          name: "Softcell Hoodie",
          description:
            "Softcell Hoodie adalah jaket dengan hood yang terbuat dari bahan berkualitas tinggi, memberikan kenyamanan dan gaya yang unik.",
          price: 350000,
          category: "Hoodie",
          otherVariants: [],
          isActive: true,
          variant: {
            id: 2,
            slug: "softcell-hoodie-aged-black",
            inStock: true,
            color: null,
            colorCode: "#373938",
            sizes: [],
            images: [
              "https://ik.imagekit.io/fkoy34ckk/onemission-dev/softcell-hoodie-aged-black-1-removebg-preview.png",
            ],
          },
        },
        {
          id: 3,
          name: "Justice Cordura",
          description:
            "Justice Cordura adalah jaket yang terbuat dari bahan Cordura yang tahan lama, memberikan perlindungan maksimal dengan desain yang stylish.",
          price: 400000,
          category: "shirts",
          otherVariants: [],
          isActive: true,
          variant: {
            id: 3,
            slug: "justice-cordura-off-white",
            inStock: true,
            color: null,
            colorCode: "#F3F4EF",
            sizes: [],
            images: [
              "https://ik.imagekit.io/fkoy34ckk/onemission-dev/justice-cordura-off-white-1-removebg-preview.png",
            ],
          },
        },
        {
          id: 4,
          name: "Re-Possessed Auralite",
          description:
            "Re-Possessed Auralite adalah jaket yang terbuat dari bahan auralite yang unik, memberikan kesan futuristik dengan desain yang menarik.",
          price: 450000,
          category: "socks",
          otherVariants: [
            {
              variantId: "0198e0ab-0396-70e5-9475-8e5a7b1c920f",
              colorCode: "#808000",
              slug: "peaceshell-cap-quicksilver",
              images: [
                "https://ik.imagekit.io/fkoy34ckk/onemission-dev/repossessed-auralite-olive-detail-1.webp",
                "https://ik.imagekit.io/fkoy34ckk/onemission-dev/repossessed-auralite-olive-detail-2.webp",
                "https://ik.imagekit.io/fkoy34ckk/onemission-dev/repossessed-auralite-olive-detail-3.webp",
              ],
            },
          ],
          isActive: true,
          variant: {
            id: 4,
            slug: "re-possessed-auralite-dusk",
            inStock: true,
            color: null,
            colorCode: "#A78BB3",
            sizes: [
              {
                id: 28,
                size: "S",
                stock: 10,
              },
              {
                id: 29,
                size: "M",
                stock: 85,
              },
              {
                id: 30,
                size: "L",
                stock: 0,
              },
            ],
            images: [
              "https://ik.imagekit.io/fkoy34ckk/onemission-dev/re-possessed-auralite-dusk-1-removebg-preview.png",
              "https://ik.imagekit.io/fkoy34ckk/onemission-dev/repossessed-auralite-dusk-detail-1.webp",
              "https://ik.imagekit.io/fkoy34ckk/onemission-dev/repossessed-auralite-dusk-detail-2.webp",
              "https://ik.imagekit.io/fkoy34ckk/onemission-dev/repossessed-auralite-dusk-detail-3.webp",
            ],
          },
        },
        {
          id: 5,
          name: "Peaceshell Cap",
          description:
            "Peaceshell Cap adalah topi yang terbuat dari bahan berkualitas tinggi, memberikan kenyamanan dan gaya yang unik.",
          price: 150000,
          category: "Aksesori",
          otherVariants: [],
          isActive: true,
          variant: {
            id: 5,
            slug: "peaceshell-cap-quicksilver",
            inStock: true,
            color: null,
            colorCode: "#8E7C78",
            sizes: [],
            images: [
              "https://ik.imagekit.io/fkoy34ckk/onemission-dev/peaceshell-cap-quicksilver-1-removebg-preview.png",
            ],
          },
        },
        // {
        //   id: 6,
        //   name: "Auralite Shirt",
        //   description:
        //     "Auralite Shirt adalah kaos yang terbuat dari bahan auralite yang unik, memberikan kesan futuristik dengan desain yang menarik.",
        //   price: 300000,
        //   category: "Shirt",
        //   otherVariants: [],
        //   isActive: true,
        //   variant: {
        //     id: 6,
        //     slug: null,
        //     inStock: true,
        //     color: null,
        //     colorCode: null,
        //     sizes: [],
        //     images: [
        //       "https://ik.imagekit.io/fkoy34ckk/onemission-dev/auralite-shirt-pigment-burgundy-outfit-2-removebg-preview.png",
        //     ],
        //   },
        // },
        {
          id: 7,
          name: "Techsilk Short",
          description:
            "Techsilk Short adalah celana pendek yang terbuat dari bahan techsilk yang lembut dan menyerap keringat, memberikan kenyamanan maksimal.",
          price: 250000,
          category: "Short",
          otherVariants: [],
          isActive: true,
          variant: {
            id: 7,
            slug: "techsilk-short-black-silk",
            inStock: true,
            color: null,
            colorCode: "#2A282B",
            sizes: [],
            images: [
              "https://ik.imagekit.io/fkoy34ckk/onemission-dev/techsilk-short-black-silk-1-removebg-preview.png",
            ],
          },
        },
        {
          id: 8,
          name: "Merino Nylon Tube Socks",
          description:
            "Merino Nylon Tube Socks adalah kaos kaki yang terbuat dari bahan merino nylon yang lembut dan menyerap keringat, memberikan kenyamanan maksimal.",
          price: 100000,
          category: "Aksesori",
          otherVariants: [],
          isActive: true,
          variant: {
            id: 8,
            slug: "merino-nylon-tube-socks-black",
            inStock: true,
            color: null,
            colorCode: "#22252A",
            sizes: [],
            images: [
              "https://ik.imagekit.io/fkoy34ckk/onemission-dev/merino-nylon-tube-socks-black-1-removebg-preview.png",
            ],
          },
        },
        {
          id: 9,
          name: "Space O' Singlet",
          description:
            "Space O' Singlet adalah kemeja yang terbuat dari bahan khusus, memberikan kenyamanan dan gaya yang unik.",
          price: 200000,
          category: "Shirt",
          otherVariants: [],
          isActive: true,
          variant: {
            id: 9,
            slug: "space-o-singlet-deep-mahogany",
            inStock: true,
            color: null,
            colorCode: "#2A201E",
            sizes: [],
            images: [
              "https://ik.imagekit.io/fkoy34ckk/onemission-dev/space-o-singlet-deep-mahogany-1-removebg-preview.png",
            ],
          },
        },
        {
          id: 10,
          name: "Re-Possessed Auralite",
          description:
            "Re-Possessed Auralite adalah kaos yang terbuat dari bahan campuran katun organik dan serat auralite, memberikan kenyamanan maksimal dengan sentuhan futur",
          price: 300000,
          category: "Short",
          otherVariants: [],
          isActive: true,
          variant: {
            id: 10,
            slug: "re-possessed-auralite-nightfall",
            inStock: true,
            color: "Nightfall",
            colorCode: "#252733",
            sizes: [],
            images: [
              "https://ik.imagekit.io/fkoy34ckk/onemission-dev/WhatsApp_Image_2025-07-30_at_15.54.32_c620383e-removebg-preview.png",
            ],
          },
        },
      ];
    } catch (error) {
      console.error("API Error:", error);
      return [];
    }
  },
};
