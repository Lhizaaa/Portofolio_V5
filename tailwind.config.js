/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				// Semantic tokens — values come from CSS variables in index.css
				// and switch automatically between light / dark via the `.dark` class.
				base: "rgb(var(--c-base) / <alpha-value>)",
				surface: "rgb(var(--c-surface) / <alpha-value>)",
				"surface-2": "rgb(var(--c-surface-2) / <alpha-value>)",
				line: "rgb(var(--c-line) / <alpha-value>)",
				fg: "rgb(var(--c-fg) / <alpha-value>)",
				muted: "rgb(var(--c-muted) / <alpha-value>)",
				accent: "rgb(var(--c-accent) / <alpha-value>)",
				"accent-strong": "rgb(var(--c-accent-strong) / <alpha-value>)",
				"accent-fg": "rgb(var(--c-accent-fg) / <alpha-value>)",
			},
			backdropBlur: {
				sm: "4px",
			},
		},
	},
	plugins: [],
}
