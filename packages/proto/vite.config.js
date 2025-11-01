import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

console.log('Vite config loading!');
console.log('Products path:', resolve(__dirname, 'products.html'));

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                sub: resolve(__dirname, 'products.html'),
            },
        },
    },
})