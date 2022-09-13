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
    base: '/',
  }
})
