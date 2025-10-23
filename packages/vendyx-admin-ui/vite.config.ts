import path from 'path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    plugins: [
      react(),
      tailwindcss(),
      !isDev &&
        dts({
          tsconfigPath: './tsconfig.app.json',
          outDir: 'dist',
          include: ['src/**/*'],
          exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'tests/**/*'],
          rollupTypes: false,
          staticImport: true,
          insertTypesEntry: true,
          entryRoot: 'src'
        })
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    optimizeDeps: {
      exclude: ['@graphql-typed-document-node/core']
    },
    build: isDev
      ? {}
      : {
          lib: {
            entry: path.resolve('src', 'index.ts'),
            name: 'VendyxAdminUI',
            formats: ['es'],
            fileName: format => `index.${format}.js`
          },
          rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            output: {
              preserveModules: true,
              preserveModulesRoot: 'src',
              entryFileNames: '[name].js'
            }
          },
          copyPublicDir: false
        }
  };
});
