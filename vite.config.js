import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src/',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
<<<<<<< HEAD
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        product_listing: resolve(__dirname, "src/product_listing/index.html"),
      },
    },
  },
});
=======
        main: 'src/index.html'
      }
    }
  }
});
>>>>>>> 1dcf743aa9e31b2255f3273e430577c6bea3f1be
