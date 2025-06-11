import defaultTheme from 'tailwindcss/defaultTheme';
import scrollbar from 'tailwind-scrollbar';

export default {
	darkMode: ['class', '.dark-mode'],
	content: [
		"./index.html",
		"./src/**/*.{js,jsx}",
	],
	theme: {
		extend: {
		fontFamily: {
			'inter': ['Inter', ...defaultTheme.fontFamily.sans]
		}
		},
	},
	plugins: [
		scrollbar()
	],
}

