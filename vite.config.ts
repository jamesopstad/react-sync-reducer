/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		dts({ outputDir: 'dist/types', exclude: 'src/vite-env.d.ts' })
	],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'react-sync-reducer'
		},
		rollupOptions: {
			external: ['react'],
			output: {
				globals: {
					react: 'React'
				}
			}
		}
	},
	test: {
		environment: 'jsdom'
	}
});
