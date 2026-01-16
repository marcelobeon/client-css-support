import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  server: {
    // Altere a porta caso acesse multiplos clientes 
    port: 5174,
    cors: true,
    // Servir arquivos da pasta src publicamente
    fs: {
      strict: false,
      allow: ['..']
    }
  },
  
  build: {
    rollupOptions: {
      input: 'src/dev/chrome-extension/content.js',
      output: {
        entryFileNames: 'content.js',
        format: 'iife'
      }
    }
  },
  
  plugins: [
    {
      name: 'serve-css',
      configureServer(server) {
        server.middlewares.use('/css', (req, res, next) => {
          const cssPath = path.join(__dirname, 'src/dev/css/style.css');
          if (fs.existsSync(cssPath)) {
            res.setHeader('Content-Type', 'text/css');
            res.setHeader('Cache-Control', 'no-cache');
            fs.createReadStream(cssPath).pipe(res);
          } else {
            next();
          }
        });
      }
    }
  ]
});