import { defineConfig } from "vite";

const index = process.argv.indexOf('--mode');

let mode = index && process.argv[index] || 'production';

export default defineConfig(({command, mode, ssrBuild}) => {
  return {};
});