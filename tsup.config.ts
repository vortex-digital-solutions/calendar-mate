import { defineConfig } from 'tsup';

export default defineConfig({
  // Two independent entry points -> two subpath exports.
  // Importing `calendar-mate` never pulls in the React binding.
  entry: {
    index: 'src/index.ts',
    react: 'src/react/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  treeshake: true,
  minify: true,
  sourcemap: true,
  clean: true,
  // React is a peer dependency — never bundle it.
  external: ['react'],
});
