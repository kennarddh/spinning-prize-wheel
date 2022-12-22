import { defineConfig, loadEnv } from 'vite'

// Plugin
import eslintPlugin from 'vite-plugin-eslint'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'

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

// https://vitejs.dev/config/
export default defineConfig(() => {
	return {
		plugins: [react(), eslintPlugin(), svgr()],
		resolve: {
			alias: resolveAlias,
		},
		build: {
			lib: {
				entry: resolve(__dirname, 'src/index.ts'),
				name: 'spinningPrizeWheel',
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
	}
})
