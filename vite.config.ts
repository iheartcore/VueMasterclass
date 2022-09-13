import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import stylelint from 'vite-plugin-stylelint'
import eslint from 'vite-plugin-eslint'


// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      vue(),
      eslint(),
      stylelint()],
    build: {
      rollupOptions: {
        output: {
          // Split up assets based on file type
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: ({name}) => {
            // Images
            if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
              return 'assets/images/[name]-[hash][extname]'
            }

            // Css files
            if (/\.css$/.test(name ?? '')) {
              return 'assets/css/[name]-[hash][extname]'
            }

            // Font files
            if (/\.(woff2?|ttf|eot)$/.test(name ?? '')) {
              return 'assets/fonts/[name]-[hash][extname]'
            }

            if (/\.html$/.test(name ?? '')) {
              console.log(name)
            }

            // default value
            // ref: https://rollupjs.org/guide/en/#outputassetfilenames
            return 'assets/[name]-[hash][extname]';
          },
          // Configure manual chunks to split up global css
          manualChunks: function (id) {
            if (id.includes('src/styles/app')) {
              return 'main';
            }
            if (id.includes('src/styles/icons')) {
              return 'icons';
            }
            if (id.includes('src/styles/bootstrap')) {
              return 'bootstrap';
            }
          }
        }
      }
    },
  }
})
