import { defineConfig } from 'vite'

// Plugin
import path from 'node:path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import eslint from 'vite-plugin-eslint'

import { resolve } from 'path'

export const relativeAlias: Record<string, string> = {
	Components: './src/Components',
	Contexts: './src/Contexts',
	Utils: './src/Utils',
	Hooks: './src/Hooks',
	Constants: './src/Constants',
	Api: './src/Api',
}

export const resolveAlias = Object.entries(relativeAlias).reduce(
	(prev: Record<string, string>, [key, path]) => {
		// eslint-disable-next-line security/detect-object-injection
		prev[key] = resolve(__dirname, path)

		return prev
	},
	{}
)

export default defineConfig({
	plugins: [
		react(),
		dts({
			insertTypesEntry: true,
			outputDir: 'dist',
			exclude: ['sites'],
			entryRoot: 'src',
		}),
		eslint(),
	],
	resolve: {
		alias: resolveAlias,
	},
	build: {
		sourcemap: true,
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: 'SpinningPrizeWheel',
			formats: ['es', 'umd'],
			fileName: format => `spinning-prize-wheel.${format}.js`,
		},
		rollupOptions: {
			external: ['react', 'react-dom', 'styled-components'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
					'styled-components': 'styled',
				},
			},
		},
	},
})
