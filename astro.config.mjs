import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'middleware' }),
  build: {
    assets: 'assets'
  },
  server: {
    port: 4321,
    host: true
  },
  vite: {
    server: {
      host: true,
      hmr: {
        clientPort: 4321
      },
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true
        }
      }
    }
  }
});
