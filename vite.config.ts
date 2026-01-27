import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

// Custom plugin to serve collections folder as static files
function serveCollectionsPlugin() {
  return {
    name: 'serve-collections',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Check if this is a collections request
        if (req.url && req.url.startsWith('/collections/')) {
          const decodedUrl = decodeURIComponent(req.url);
          const filePath = path.join(process.cwd(), decodedUrl);

          // If file exists, serve it directly
          if (fs.existsSync(filePath)) {
            const stat = fs.statSync(filePath);
            if (stat.isFile()) {
              const ext = path.extname(filePath).toLowerCase();
              const mimeTypes: Record<string, string> = {
                '.html': 'text/html',
                '.css': 'text/css',
                '.js': 'application/javascript',
                '.mjs': 'application/javascript',
                '.json': 'application/json',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.gif': 'image/gif',
                '.svg': 'image/svg+xml',
                '.woff': 'font/woff',
                '.woff2': 'font/woff2',
                '.ttf': 'font/ttf',
              };
              res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
              fs.createReadStream(filePath).pipe(res);
              return;
            } else if (stat.isDirectory()) {
              // Try to serve index.html from the directory
              const indexPath = path.join(filePath, 'index.html');
              if (fs.existsSync(indexPath)) {
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(indexPath).pipe(res);
                return;
              }
            }
          }
        }
        next();
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: process.env.BASE_URL || (process.env.NODE_ENV === 'production' ? '/evolution-atlas/' : '/'),
  plugins: [serveCollectionsPlugin(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['three'],
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor-three';
            }
            if (id.includes('gsap') || id.includes('motion')) {
              return 'vendor-animation';
            }
            if (id.includes('monaco-editor')) {
              return 'vendor-monaco';
            }
            if (id.includes('@radix-ui') || id.includes('lucide-react')) {
              return 'vendor-ui';
            }
            return 'vendor'; // all other deps
          }
        },
      },
    },
  },
})


