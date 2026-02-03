import { defineConfig, ExtractedKey } from 'i18next-cli';
import { glob } from 'glob';
import { readFile } from 'node:fs/promises';

export default defineConfig({
	locales: ['en'],

	extract: {
		input: 'src/**/*.{js,jsx,ts,tsx}',
		output: 'public/assets/i18n/{{language}}.json',
		keySeparator: '.',
		defaultNS: false,
	},

	plugins: [
		{
			name: 'angular-html-translate',
			async onEnd(keys: Map<string, ExtractedKey>) {
				const htmlFiles = await glob('src/**/*.html', {
					ignore: 'node_modules/**',
				});

				const translatePipeRegex = /['"`]([^'"`]+?)['"`]\s*\|\s*translate\b/g;

				const tFnRegex = /t\(\s*['"`]([^'"`]+?)['"`]\s*\)/g;

				for (const file of htmlFiles) {
					const content = await readFile(file, 'utf-8');

					let match: RegExpExecArray | null;

					for (const regex of [translatePipeRegex, tFnRegex]) {
						while ((match = regex.exec(content))) {
							const key = match[1];

							if (!keys.has(key)) {
								keys.set(key, {
									key,
									defaultValue: key,
									ns: false,
									nsIsImplicit: true,
								});
							}
						}
					}
				}
			},
		},
	],
});
