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
				// Fixed neo-brutalist block colors for high-contrast accents.
				"nb-yellow": "#ffd84d",
				"nb-blue": "#2563eb",
				"nb-red": "#ff5a4d",
				"nb-lime": "#a3e635",
			},
			fontFamily: {
				sans: ['"Space Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
				mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
			},
			backdropBlur: {
				sm: "4px",
			},
		},
		// Global overrides give the whole UI a brutalist shape language
		// without editing every component: sharp corners, hard offset
		// shadows, and thick borders.
		borderRadius: {
			none: "0px",
			sm: "0px",
			DEFAULT: "0px",
			md: "0px",
			lg: "0px",
			xl: "2px",
			"2xl": "3px",
			"3xl": "4px",
			full: "9999px",
		},
		borderWidth: {
			DEFAULT: "2px",
			0: "0px",
			2: "2px",
			3: "3px",
			4: "4px",
			8: "8px",
		},
		boxShadow: {
			none: "none",
			sm: "2px 2px 0 0 rgb(var(--c-shadow))",
			DEFAULT: "3px 3px 0 0 rgb(var(--c-shadow))",
			md: "4px 4px 0 0 rgb(var(--c-shadow))",
			lg: "6px 6px 0 0 rgb(var(--c-shadow))",
			xl: "8px 8px 0 0 rgb(var(--c-shadow))",
			"2xl": "10px 10px 0 0 rgb(var(--c-shadow))",
			inner: "inset 3px 3px 0 0 rgb(var(--c-shadow))",
		},
	},
	plugins: [],
}
